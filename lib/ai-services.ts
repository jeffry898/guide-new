import { GoogleGenAI } from "@google/genai";
import { supabaseAdmin } from "./supabase";
import { Resend } from 'resend';

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
    if (!key) return null;
    resendInstance = new Resend(key);
  }
  return resendInstance;
};

export async function generateGuide(professionSlug: string, userEmail: string) {
  const { data: profession } = await supabaseAdmin
    .from('professions')
    .select('*')
    .eq('slug', professionSlug)
    .single();
  
  if (!profession) throw new Error("Profession not found");

  const prompt = `Generate a comprehensive AI Survival Protocol for a ${profession.name}. 
  
  CONTEXT:
  - Short Title: ${profession.short_title}
  - Headline: ${profession.headline}
  - Subheadline: ${profession.subheadline}
  - Ticket Value: ${profession.ticket_value}
  - Core Systems to mention: ${JSON.stringify(profession.core_systems)}
  - ROI Insight: ${profession.roi_insight}
  - Pain Points: ${profession.pain_points.join(', ')}

  INSTRUCTIONS:
  Return a structured JSON object matching this schema:
  {
    "hero": { "title": "string", "subtitle": "string", "stat": "string", "stat_source": "string" },
    "reality_check": { "headline": "string", "insight": "string", "chart": { "title": "string", "labels": ["string"], "admin_time": [number, number], "core_work": [number, number], "revenue_growth": [number, number] } },
    "ai_systems": [{ "title": "string", "description": "string", "time_saved_weekly": number, "free_tool": "string", "free_tool_url": "string", "geniuzlab_upgrade": "string", "icon": "string" }],
    "roi": { "hours_saved_weekly": number, "annual_value": number, "insight": "string" },
    "roadmap": { "weeks": [{ "week": number, "theme": "string", "actions": ["string"] }] },
    "geniuzlab": { "headline": "string", "body": "string", "services": [{ "name": "string", "description": "string", "icon": "string" }], "cta": "string" },
    "closing": { "statement": "string", "share_text": "string" }
  }

  The content must be high-end, editorial, and specific to the ${profession.name} industry.
  Mention GeniuzLab service: ${profession.transformation_statement}.
  Return valid JSON only.`;

  const ai = getGenAI();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: { responseMimeType: "application/json" }
  });
  
  const text = response.text;
  if (!text) throw new Error("Empty response from AI");

  // Basic cleanup if model returns markdown code block
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  const guideData = jsonMatch ? JSON.parse(jsonMatch[0]) : { error: "Failed to parse guide" };

  return guideData;
}

export async function pSEO(professionSlug: string) {
  // Logic for programmatic SEO - e.g. updating a public sitemap or generation public landing pages
  console.log(`Triggering pSEO for ${professionSlug}`);
  // In a real app, this could insert into a public_pages table
}

export async function sendConfirmationEmail(userEmail: string, guideUrl: string) {
  try {
    const resend = getResend();
    if (!resend) throw new Error("Email service not configured");
    await resend.emails.send({
      from: 'GeniuzLab <onboarding@geniuzlab.com>',
      to: userEmail,
      subject: 'Your AI Survival Protocol is Ready',
      html: `
        <h1>Welcome to the Empire.</h1>
        <p>Your custom AI Survival Protocol has been generated and is ready for activation.</p>
        <a href="${guideUrl}" style="padding: 12px 24px; background: #C9A84C; color: #0A0F1E; text-decoration: none; font-weight: bold; border-radius: 4px;">
          Access Your Protocol
        </a>
        <p>Stay Synchronized,<br>The GeniuzLab Team</p>
      `
    });
  } catch (error) {
    console.error('Email Error:', error);
  }
}
