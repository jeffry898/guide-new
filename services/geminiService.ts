import { GoogleGenAI } from "@google/genai";
import crypto from "crypto";
import { getSupabaseAdmin } from "@/lib/supabase";
import { Resend } from "resend";

let genAIInstance: GoogleGenAI | null = null;
let resendInstance: Resend | null = null;

const getGenAI = () => {
  if (!genAIInstance) {
    const key = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
    if (!key) throw new Error("GEMINI_API_KEY is missing");
    genAIInstance = new GoogleGenAI({ apiKey: key });
  }
  return genAIInstance;
};

const getResend = () => {
  if (!resendInstance) {
    const key = process.env.RESEND_API_KEY;
    if (!key) {
       console.warn("RESEND_API_KEY is missing. Email features will fail.");
       return null;
    }
    resendInstance = new Resend(key);
  }
  return resendInstance;
};

export interface OnboardingData {
  challenge: string;
  team_size: string;
  target: string;
}

export interface ProfessionData {
  name: string;
  psychological_title: string;
  avg_revenue_client: number;
  industry_tools: string[];
  pain_points: string[];
  wef_automation_risk: number;
}

function buildMasterPrompt(profession: ProfessionData, onboarding: OnboardingData, triggerData?: any) {
  return `You are the world's leading AI business strategist 
  specializing in ${profession.name}s with 10,000+ 
  client case studies.

  THIS PERSON:
  - Challenge: ${onboarding.challenge}
  - Team size: ${onboarding.team_size}
  - Monthly target: ${onboarding.target}
  - Found via: ${triggerData?.keyword || 'direct'}

  PROFESSION DATA:
  - Avg revenue/client: ${profession.avg_revenue_client}
  - Industry tools: ${JSON.stringify(profession.industry_tools)}
  - Pain points: ${JSON.stringify(profession.pain_points)}
  - WEF automation risk: ${profession.wef_automation_risk}%

  Generate guide titled: '${profession.psychological_title}'

  RETURN VALID JSON ONLY. NO MARKDOWN. NO PREAMBLE:
  {
    "hero": {
      "title": string,
      "subtitle": string,
      "stat": string,
      "stat_source": string
    },
    "reality_check": {
      "headline": string,
      "insight": string,
      "chart": {
        "title": string,
        "labels": ["Current", "With AI Systems"],
        "admin_time": [number, number],
        "core_work": [number, number],
        "revenue_growth": [number, number]
      }
    },
    "ai_systems": [
      {
        "title": string,
        "description": string,
        "time_saved_weekly": number,
        "free_tool": string,
        "free_tool_url": string,
        "geniuzlab_upgrade": string,
        "icon": string
      }
    ],
    "roi": {
      "hours_saved_weekly": number,
      "annual_value": number,
      "insight": string
    },
    "roadmap": {
      "weeks": [
        {
          "week": number,
          "theme": string,
          "actions": [string, string, string]
        }
      ]
    },
    "geniuzlab": {
      "headline": string,
      "body": string,
      "services": [
        {
          "name": string,
          "description": string,
          "icon": string
        }
      ],
      "cta": string
    },
    "closing": {
      "statement": string,
      "share_text": string
    }
  }`;
}

function generateUrlToken() {
  return Math.random().toString(36).substring(2, 10);
}

export async function generateOrFetchGuide(
  professionSlug: string,
  onboardingAnswers: any,
  userEmail: string,
  stripeSessionId: string
) {
  const supabaseAdmin = getSupabaseAdmin();
  
  const contentHash = crypto
    .createHash('md5')
    .update(JSON.stringify(onboardingAnswers))
    .digest('hex');

  // Check cache for existing guide with same content hash
  const { data: cached } = await supabaseAdmin
    .from('guides')
    .select('*')
    .eq('profession_slug', professionSlug)
    .eq('onboarding_hash', contentHash)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (cached) {
    const urlToken = generateUrlToken();
    await supabaseAdmin.from('guides').insert({
      user_email: userEmail,
      profession_slug: professionSlug,
      onboarding_hash: urlToken,
      content: cached.content,
      stripe_session_id: stripeSessionId,
    });

    await supabaseAdmin
      .from('guides')
      .update({ served_count: (cached.served_count || 0) + 1 })
      .eq('id', cached.id);

    return urlToken;
  }

  // Not in cache, generate fresh
  const { data: profession } = await supabaseAdmin
    .from('professions')
    .select('*')
    .eq('slug', professionSlug)
    .single();

  if (!profession) throw new Error("Invalid profession slug");

  const content = await callGeminiWithRetry(profession, onboardingAnswers);
  const urlToken = generateUrlToken();

  await supabaseAdmin.from('guides').insert({
    user_email: userEmail,
    profession_slug: professionSlug,
    onboarding_hash: urlToken,
    content: content,
    stripe_session_id: stripeSessionId,
  });

  return urlToken;
}

async function callGeminiWithRetry(profession: any, onboarding: any) {
  const supabaseAdmin = getSupabaseAdmin();
  let attempts = 0;
  let lastError: any = null;

  while (attempts < 3) {
    attempts++;
    try {
      const prompt = buildMasterPrompt(profession, onboarding);
      const ai = getGenAI();
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
        config: { responseMimeType: "application/json" }
      });

      const text = response.text;
      if (!text) throw new Error("Empty response from AI");

      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("No JSON found in response");

      return JSON.parse(jsonMatch[0]);
    } catch (error: any) {
      lastError = error;
      console.error(`Attempt ${attempts} failed:`, error);
    }
  }

  // Log error to DB (non-blocking)
  try {
    await supabaseAdmin.from('errors').insert({
      service: 'gemini_generation',
      error_message: lastError?.message || "Unknown error",
      context: { profession: profession?.slug, onboarding }
    });
  } catch {}

  throw lastError || new Error("Failed to generate guide");
}

export async function generateGuide(
  profession: ProfessionData, 
  onboarding: OnboardingData, 
  professionSlug: string,
  triggerData?: any
) {
  return callGeminiWithRetry(profession, onboarding);
}
