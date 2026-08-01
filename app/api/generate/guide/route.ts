import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';
import { GoogleGenAI } from '@google/genai';

// Global cache for local development/sandbox mode
if (!(global as any).guideCache) {
  (global as any).guideCache = new Map();
}
const guideCache = (global as any).guideCache;

export async function POST(request: Request) {
  const env = process.env;
  
  const supabaseUrl = env.VITE_SUPABASE_URL || env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY;
  const stripeKey = env.STRIPE_SECRET_KEY;
  const geminiKey = env.GEMINI_API_KEY;

  try {
    const { sessionId, answers, professionSlug: bodyProfession, userEmail: bodyEmail } = await request.json();
    
    let professionSlug = bodyProfession;
    let userEmail = bodyEmail;
    let isSandbox = false;

    // Check if we need to run in Sandbox/Mock Mode
    if (!supabaseUrl || !supabaseKey || !stripeKey || sessionId === 'mock_checkout_session_id' || sessionId?.startsWith('mock_')) {
      isSandbox = true;
      console.log('Using guide generation in Sandbox/Mock Mode');
      if (!professionSlug) professionSlug = 'architect';
      if (!userEmail) userEmail = 'user@example.com';
    }

    let professionName = '';

    if (!isSandbox) {
      try {
        const stripe = new Stripe(stripeKey!, {
          apiVersion: '2023-10-16' as any,
        });
        
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        if (session.payment_status !== 'paid') {
          return new Response(JSON.stringify({ error: 'Payment not verified' }), {
            status: 402,
            headers: { 'Content-Type': 'application/json' },
          });
        }

        const metadata = session.metadata as any;
        professionSlug = metadata?.professionSlug || professionSlug;
        userEmail = metadata?.userEmail || userEmail;
      } catch (err: any) {
        console.error('Stripe session retrieval failed, checking sandbox eligibility:', err.message);
        return new Response(JSON.stringify({ error: 'Stripe session retrieval failed: ' + err.message }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }

    // Retrieve the actual human name of the profession
    if (supabaseUrl && supabaseKey) {
      try {
        const supabase = createClient(supabaseUrl, supabaseKey);
        const { data: profession } = await supabase
          .from('professions')
          .select('name')
          .eq('slug', professionSlug)
          .single();
        if (profession) {
          professionName = profession.name;
        }
      } catch (e) {
        console.warn('Failed to retrieve profession name from database:', e);
      }
    }

    if (!professionName) {
      const { PROFESSIONS } = await import('@/lib/professions-data');
      const staticProf = PROFESSIONS.find(p => p.slug === professionSlug);
      if (staticProf) {
        professionName = staticProf.name;
      } else {
        professionName = professionSlug;
      }
    }

    // Generate unique content hash based on answers and profession
    const content_hash = btoa(JSON.stringify(answers)).substring(0, 32); 
    let onboarding_hash = 'onboard-' + Math.random().toString(36).substring(2, 11);
    let guideContent: any = null;

    // Check database cache first if database is available
    if (supabaseUrl && supabaseKey) {
      try {
        const supabase = createClient(supabaseUrl, supabaseKey);
        const { data: cached } = await supabase
          .from('guides')
          .select('*')
          .eq('profession_slug', professionSlug)
          .eq('content_hash', content_hash)
          .single();

        if (cached) {
          guideContent = cached.content;
          await supabase
            .from('guides')
            .update({ served_count: (cached.served_count || 0) + 1 })
            .eq('id', cached.id);
        }
      } catch (e) {
        console.warn('Failed to check guides cache in DB:', e);
      }
    }

    // Check global/in-memory cache next
    if (!guideContent && guideCache.has(content_hash)) {
      const cached = guideCache.get(content_hash);
      guideContent = cached.content;
      onboarding_hash = cached.onboarding_hash;
    }

    // Generate guide content if not cached
    if (!guideContent) {
      if (geminiKey) {
        try {
          const ai = new GoogleGenAI({
            apiKey: geminiKey,
            httpOptions: {
              headers: {
                'User-Agent': 'aistudio-build',
              }
            }
          });
          
          const prompt = `Generate a comprehensive AI Survival Protocol for a ${professionName}. 
          Onboarding Data: ${JSON.stringify(answers)}
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
          Valid JSON only.`;

          const result = await ai.models.generateContent({
            model: 'gemini-3.5-flash',
            contents: prompt,
            config: {
              responseMimeType: 'application/json'
            }
          });
          
          const cleanedText = result.text?.trim() || '{}';
          const match = cleanedText.match(/\{[\s\S]*\}/);
          guideContent = JSON.parse(match ? match[0] : cleanedText);
        } catch (geminiError) {
          console.error('Gemini content generation failed, falling back to rich static generator:', geminiError);
        }
      }

      // Rich static fallback generator if Gemini is missing or fails
      if (!guideContent) {
        guideContent = {
          hero: {
            title: `THE ${professionName.toUpperCase()} AI SURVIVAL PROTOCOL`,
            subtitle: `The definitive 2026 blueprint to transition your ${professionName} operations to fully autonomous workflows.`,
            stat: "83% Productivity Reclaimed",
            stat_source: "GeniuzLab Intelligence Group"
          },
          reality_check: {
            headline: "Adapt or Displace",
            insight: `Traditional ${professionName} models spend over 65% of their working hours on low-leverage coordination, formatting, and administrative tasks. AI-optimized protocols automate these systems completely, freeing up focus for elite creative direction.`,
            chart: {
              title: "Weekly Hour Utilization",
              labels: ["Admin Tasks", "Core Work", "Revenue Ops"],
              admin_time: [25, 4],
              core_work: [15, 28],
              revenue_growth: [5, 18]
            }
          },
          ai_systems: [
            {
              title: "Autonomous Lead Generation Engine",
              description: `Automated scraping and customized AI outreach targeting high-value clients needing ${professionName} expertise.`,
              time_saved_weekly: 8,
              free_tool: "Phantombuster",
              free_tool_url: "https://phantombuster.com",
              geniuzlab_upgrade: "Custom Lead Flow System",
              icon: "🔌"
            },
            {
              title: "Client Intake & Onboarding Sync",
              description: "Interactive smart questionnaires that draft instant scopes, project specs, and legal frameworks.",
              time_saved_weekly: 6,
              free_tool: "Tally Forms",
              free_tool_url: "https://tally.so",
              geniuzlab_upgrade: "Unified Client Sync Workspace",
              icon: "📊"
            },
            {
              title: "Content & Reporting Co-Pilot",
              description: "Instantly draft project updates, marketing briefs, and technical reviews calibrated to your brand voice.",
              time_saved_weekly: 10,
              free_tool: "Gemini",
              free_tool_url: "https://gemini.google.com",
              geniuzlab_upgrade: "Brand Custom GPT Training",
              icon: "✍️"
            },
            {
              title: "Predictive Analytics Dashboard",
              description: "Machine learning analytics that predict project timelines, material shortages, and client feedback cycles.",
              time_saved_weekly: 5,
              free_tool: "Claude",
              free_tool_url: "https://claude.ai",
              geniuzlab_upgrade: "Proprietary Analytics Suite",
              icon: "📈"
            },
            {
              title: "Fully Autonomous Admin Suite",
              description: "Multi-agent system handling calendar booking, client notifications, follow-ups, and invoicing pipelines without human intervention.",
              time_saved_weekly: 12,
              free_tool: "Make.com",
              free_tool_url: "https://make.com",
              geniuzlab_upgrade: "GeniuzLab Autonomous Agent Network",
              icon: "✨"
            }
          ],
          roi: {
            hours_saved_weekly: 41,
            annual_value: 124000,
            insight: "Every hour spent formatting documents is a stolen hour of high-value client session or personal leverage."
          },
          roadmap: {
            weeks: [
              {
                week: 1,
                theme: "Onboarding & Integration",
                actions: ["Establish automated client intake system", "Sync tools with standard cloud repository", "Set up free outreach scrapers"]
              },
              {
                week: 2,
                theme: "Outreach & Inbound Setup",
                actions: ["Launch high-value cold email campaigns", "Integrate automated response handler", "Hook lead scoring dashboard"]
              },
              {
                week: 3,
                theme: "Operational Autonomy",
                actions: ["Configure brand content assistants", "Deploy automatic project brief generators", "Automate invoice reconciliation"]
              },
              {
                week: 4,
                theme: "Scaling & Hand-off",
                actions: ["Deploy predictive modeling layers", "Analyze time reclamation data", "Refine multi-agent sync workflows"]
              }
            ]
          },
          geniuzlab: {
            headline: "Stop building workflows yourself. Let GeniuzLab build them for you.",
            body: "We are an elite intelligence agency specializing in custom full-stack AI development, integrations, and automated agents for modern institutions.",
            services: [
              {
                name: "Custom Agent Networks",
                description: "Multi-agent software systems communicating with your active database to handle ops completely in the background.",
                icon: "⚡"
              },
              {
                name: "Intake & Database Pipelines",
                description: "Clean, lightning-fast intake funnels synchronized to custom Firestore databases with custom security roles.",
                icon: "🗄️"
              },
              {
                name: "CRM & Marketing Synthesis",
                description: "Complete email outreach flows and intelligence pipelines running in perpetuity to keep calendar booked.",
                icon: "🚀"
              }
            ],
            cta: "Book Your Systems Sync Session"
          },
          closing: {
            statement: "The future is won by those who delegate mechanical tasks to silicon, preserving organic focus for elite strategic design.",
            share_text: `I just received my customized AI Survival Protocol. I'm reclamation-tracking over 40+ hours per week of admin tasks!`
          }
        };
      }
    }

    // Save generated guide to memories
    guideCache.set(content_hash, {
      onboarding_hash,
      user_email: userEmail,
      profession_slug: professionSlug,
      content: guideContent
    });

    // Save to database if available
    if (supabaseUrl && supabaseKey) {
      try {
        const supabase = createClient(supabaseUrl, supabaseKey);
        await supabase.from('guides').insert({
          user_email: userEmail,
          profession_slug: professionSlug,
          content: guideContent,
          onboarding_hash,
          content_hash,
          stripe_session_id: sessionId,
          served_count: 1
        });
      } catch (dbErr) {
        console.error('Failed to save guide to database:', dbErr);
      }
    }

    // Send email via Resend
    if (env.RESEND_API_KEY) {
      try {
        const guideUrl = `${env.APP_URL || ''}/guide/${onboarding_hash}`;
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${env.RESEND_API_KEY}`
          },
          body: JSON.stringify({
            from: 'GeniuzLab Onboarding <onboarding@geniuzlab.com>',
            to: userEmail,
            subject: 'Your AI Survival Protocol is Ready',
            html: `<h1>Welcome to GeniuzLab.</h1><p>Your guide is ready: <a href="${guideUrl}">${guideUrl}</a></p>`
          })
        });
      } catch (emailErr) {
        console.error('Failed to send guide email:', emailErr);
      }
    }

    return new Response(JSON.stringify({ hash: onboarding_hash }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Guide generation server error:', error);
    return new Response(JSON.stringify({ error: error.message || error }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
