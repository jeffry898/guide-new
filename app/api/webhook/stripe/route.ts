export const runtime = 'edge';
export const dynamic = 'force-dynamic';

import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { GoogleGenAI } from '@google/genai';

export async function POST(request: Request) {
  const env = process.env;
  const supabaseUrl = env.VITE_SUPABASE_URL || env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY!;
  const stripeSecret = env.STRIPE_SECRET_KEY!;

  const stripe = new Stripe(stripeSecret, {
    apiVersion: '2023-10-16' as any,
  });
  
  const supabase = createClient(supabaseUrl!, supabaseKey!);

  const signature = request.headers.get('stripe-signature') || '';
  const body = await request.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as any;
    
    // Execute the async process without blocking the response
    (async () => {
      try {
        const stripe_session_id = session.id;
        const metadata = session.metadata as any;
        const { professionSlug, userEmail, onboardingAnswers } = metadata || {};
        const answers = JSON.parse(onboardingAnswers || '[]');
        
        // Use Web Crypto API or simple hash if crypto is not available in worker
        const content_hash = btoa(JSON.stringify(answers)).substring(0, 32); 

        // update status
        await supabase
          .from('purchases')
          .update({ status: 'completed' })
          .eq('stripe_session_id', stripe_session_id);

        // Check cache
        const { data: cached } = await supabase
          .from('guides')
          .select('*')
          .eq('profession_slug', professionSlug)
          .eq('content_hash', content_hash)
          .single();

        let onboarding_hash = Math.random().toString(36).substring(7);
        let guideContent;

        if (cached) {
          guideContent = cached.content;
          await supabase
            .from('guides')
            .update({ served_count: (cached.served_count || 0) + 1 })
            .eq('id', cached.id);
        } else {
          // Generate Guide using high-quality prompt
          const ai = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY! });
          
          const { data: profession } = await supabase
            .from('professions')
            .select('name')
            .eq('slug', professionSlug)
            .single();
          
          const prompt = `Generate a comprehensive AI Survival Protocol for a ${profession?.name}. 
          Onboarding Data: ${onboardingAnswers}
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
            model: 'gemini-2.5-flash',
            contents: prompt
          });
          guideContent = JSON.parse(result.text?.match(/\{[\s\S]*\}/)?.[0] || '{}');
        }

        // Save guide
        await supabase.from('guides').insert({
          user_email: userEmail,
          profession_slug: professionSlug,
          content: guideContent,
          onboarding_hash,
          content_hash,
          stripe_session_id: stripe_session_id,
          served_count: 1
        });

        // Send Email via Resend
        if (env.RESEND_API_KEY) {
          const guideUrl = `${env.APP_URL}/guide/${onboarding_hash}`;
          await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${env.RESEND_API_KEY}`
            },
            body: JSON.stringify({
              from: 'onboarding@geniuzlab.com',
              to: userEmail,
              subject: 'Your AI Survival Protocol is Ready',
              html: `<h1>Welcome to the Empire.</h1><p>Your guide: <a href="${guideUrl}">${guideUrl}</a></p>`
            })
          });
        }

      } catch (err) {
        console.error('Webhook processing error:', err);
      }
    })();
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
