import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

export async function POST(request: Request) {
  const env = process.env;
  const supabaseUrl = env.VITE_SUPABASE_URL || env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.warn('Supabase is not configured. Skipping sequence email sending.');
    return new Response(
      JSON.stringify({ day2: 0, day3: 0, message: 'Supabase not configured' }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const resend = new Resend(env.RESEND_API_KEY);
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    const now = new Date();
    
    // Find leads needing Day 2 (created ~24hrs ago, step=1)
    const day2Cutoff = new Date(now.getTime() - 23 * 60 * 60 * 1000);
    const { data: day2Leads, error: day2Err } = await supabase
      .from('report_leads')
      .select('*')
      .eq('email_sequence_step', 1)
      .lt('created_at', day2Cutoff.toISOString());
    
    if (day2Err) console.error('Day 2 query error:', day2Err);
  
    for (const lead of day2Leads || []) {
      try {
        await resend.emails.send({
          from: 'GeniuzLab Intelligence <noreply@geniuzlab.com>',
          to: lead.email,
          subject: `What happened to ${lead.profession_slug} professionals who ignored AI`,
          html: buildDay2Email(lead, env.APP_URL!)
        });
        await supabase.from('report_leads')
          .update({ email_sequence_step: 2 })
          .eq('id', lead.id);
      } catch (err) {
        console.error(`Error sending Day 2 email to ${lead.email}:`, err);
      }
    }
    
    // Find leads needing Day 3 (created ~48hrs ago, step=2)
    const day3Cutoff = new Date(now.getTime() - 47 * 60 * 60 * 1000);
    const { data: day3Leads, error: day3Err } = await supabase
      .from('report_leads')
      .select('*')
      .eq('email_sequence_step', 2)
      .lt('created_at', day3Cutoff.toISOString());
  
    if (day3Err) console.error('Day 3 query error:', day3Err);
    
    for (const lead of day3Leads || []) {
      try {
        await resend.emails.send({
          from: 'GeniuzLab Intelligence <noreply@geniuzlab.com>',
          to: lead.email,
          subject: `Last chance — your profession is moving fast`,
          html: buildDay3Email(lead, env.APP_URL!)
        });
        await supabase.from('report_leads')
          .update({ email_sequence_step: 3 })
          .eq('id', lead.id);
      } catch (err) {
        console.error(`Error sending Day 3 email to ${lead.email}:`, err);
      }
    }
    
    return new Response(
      JSON.stringify({ 
        day2: day2Leads?.length || 0, 
        day3: day3Leads?.length || 0 
      }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    console.error('Send sequence background job error:', err);
    return new Response(
      JSON.stringify({ error: err.message || err }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

function buildDay2Email(lead: any, appUrl: string): string {
  const productUrl = `${appUrl}/product/${lead.profession_slug}`;
  return `
    <div style="font-family:Inter,sans-serif;
      background:#0A0F1E;color:#F8F6F0;
      max-width:600px;margin:0 auto;padding:40px;">
      <h1 style="color:#C9A84C;
        font-family:Georgia,serif;">
        What happened when they waited...
      </h1>
      <p>Yesterday you discovered your AI risk score.</p>
      <p>Most people read it. Close the tab. 
         Tell themselves they'll deal with it later.</p>
      <p style="color:#C0392B;font-weight:bold;">
        "Later" is the most expensive word in 2026.
      </p>
      <p>The professionals who are thriving right now 
         didn't wait for "later." They got the blueprint 
         and started Week 1 immediately.</p>
      <a href="${productUrl}"
        style="background:#C9A84C;color:#0A0F1E;
          padding:16px 32px;text-decoration:none;
          font-weight:bold;display:inline-block;
          margin-top:24px;">
        Get Your Blueprint — £27 →
      </a>
      <p style="margin-top:40px;opacity:0.5;
        font-size:12px;">
        GeniuzLab Intelligence · 
        guides.geniuzlab.com
      </p>
    </div>
  `;
}

function buildDay3Email(lead: any, appUrl: string): string {
  const productUrl = `${appUrl}/product/${lead.profession_slug}`;
  return `
    <div style="font-family:Inter,sans-serif;
      background:#0A0F1E;color:#F8F6F0;
      max-width:600px;margin:0 auto;padding:40px;">
      <h1 style="color:#C9A84C;
        font-family:Georgia,serif;">
        This is the last time I'll mention this.
      </h1>
      <p>Three days ago you checked your AI risk score.</p>
      <p>Your profession has a 
        <strong style="color:#C0392B;">
          high displacement risk
        </strong> 
        that is not going down.
      </p>
      <p>The complete survival blueprint is £27. 
         One client. One session. 
         Yours forever.</p>
      <a href="${productUrl}"
        style="background:#C9A84C;color:#0A0F1E;
          padding:16px 32px;text-decoration:none;
          font-weight:bold;display:inline-block;
          margin-top:24px;">
        Final chance — Get Blueprint →
      </a>
      <p style="margin-top:40px;opacity:0.5;
        font-size:12px;">
        GeniuzLab Intelligence · 
        guides.geniuzlab.com
      </p>
    </div>
  `;
}
