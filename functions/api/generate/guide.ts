import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';
import { GoogleGenAI } from '@google/genai';

export async function onRequestPost(context) {
  const { request, env } = context;
  const supabase = createClient(
    env.VITE_SUPABASE_URL,
    env.SUPABASE_SERVICE_ROLE_KEY
  );
  
  const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16' as any,
  });

  try {
    const { sessionId, answers } = await request.json();
    
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== 'paid') {
      return new Response(JSON.stringify({ error: 'Payment not verified' }), {
        status: 402,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { professionSlug, userEmail } = session.metadata;
    
    // Fetch profession from DB
    const { data: profession } = await supabase
      .from('professions')
      .select('name')
      .eq('slug', professionSlug)
      .single();

    // Use Web Crypto API or simple hash if crypto is not available in worker
    const content_hash = btoa(JSON.stringify(answers)).substring(0, 32); 

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
      const genAI = new GoogleGenAI(env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const prompt = `Generate a comprehensive AI Survival Protocol for a ${profession?.name}. 
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

      const result = await model.generateContent(prompt);
      guideContent = JSON.parse(result.response.text().match(/\{[\s\S]*\}/)?.[0] || '{}');
    }

    await supabase.from('guides').insert({
      user_email: userEmail,
      profession_slug: professionSlug,
      content: guideContent,
      onboarding_hash,
      content_hash,
      stripe_session_id: sessionId,
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

    return new Response(JSON.stringify({ hash: onboarding_hash }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
