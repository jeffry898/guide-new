import { createClient } from '@supabase/supabase-js';

export async function onRequestPost(context) {
  const { request, env } = context;
  const supabaseUrl = env.VITE_SUPABASE_URL || env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY;
  
  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    const { email, profession_slug, answers, token } = await request.json();

    if (!email || !profession_slug || !token) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { data: profession } = await supabase
      .from('professions')
      .select('name')
      .eq('slug', profession_slug)
      .single();

    if (!profession) {
      return new Response(JSON.stringify({ error: 'Invalid profession' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 1. Save to Supabase
    const { error: dbError } = await supabase
      .from('report_leads')
      .insert([
        {
          email,
          profession_slug,
          answers,
          token,
          email_sequence_step: 1,
          created_at: new Date().toISOString(),
        }
      ]);

    if (dbError) {
      console.error('Supabase error:', dbError);
    }

    // 2. Trigger Resend Email (Day 1)
    if (env.RESEND_API_KEY) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${env.RESEND_API_KEY}`
          },
          body: JSON.stringify({
            from: 'GeniuzLab Intelligence <reports@geniuzlab.com>',
            to: email,
            subject: `Your AI Risk Report for ${profession.name}`,
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0A0F1E; color: #F8F6F0; padding: 40px; border-radius: 8px;">
                <h1 style="color: #C9A84C; border-bottom: 2px solid #C9A84C; padding-bottom: 20px;">Protocol v2.0 // Risk Assessment</h1>
                <p>Your intelligence report for <strong>${profession.name}</strong> is now available.</p>
                <p>You can access your results at any time using this link:</p>
                <div style="margin: 30px 0; text-align: center;">
                  <a href="${env.APP_URL}/risk-report/result/${token}" style="background: #C9A84C; color: #0A0F1E; padding: 16px 32px; border-radius: 4px; text-decoration: none; font-weight: bold; text-transform: uppercase;">View My Report</a>
                </div>
                <p style="opacity: 0.6; font-size: 14px;">In 24 hours, I will send you the first component of the survival blueprint specifically for ${profession.name}s.</p>
                <hr style="border: 0; border-top: 1px solid rgba(255,255,255,0.1); margin: 30px 0;" />
                <p style="font-size: 12px; opacity: 0.4;">GeniuzLab Intelligence Engine // London // Secure Transmission</p>
              </div>
            `
          })
        });
      } catch (emailErr) {
        console.error('Resend error:', emailErr);
      }
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    console.error('Save lead error:', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
