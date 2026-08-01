import { createClient } from '@supabase/supabase-js';
import { PROFESSIONS } from '@/lib/professions-data';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const env = process.env;
    const supabaseUrl = env.VITE_SUPABASE_URL || env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Supabase configuration is missing');
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const { data: professions, error } = await supabase
      .from('professions')
      .select('*')
      .order('name');

    if (error) {
      throw error;
    }

    // Transform to match front-end expectation if necessary
    const transformed = (professions || []).map(p => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      price: p.price,
      automation_risk: p.automation_risk,
      icon: p.industry_data?.icon,
      short_title: p.industry_data?.psychological_title,
      psychological_title: p.industry_data?.psychological_title,
      fear_title: p.industry_data?.fear_title,
      headline: p.industry_data?.fear_title,
      subheadline: p.industry_data?.ad_hook,
      pain_points: p.industry_data?.pain_points,
      tech_stack: p.industry_data?.industry_tools,
      ticket_value: p.industry_data?.avg_revenue_client,
      questionnaire: p.industry_data?.onboarding_questions,
      core_systems: p.industry_data?.geniuzlab_services,
      meta_title: p.industry_data?.meta_title,
      meta_description: p.industry_data?.meta_description
    }));

    return new Response(JSON.stringify(transformed), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    console.warn('Supabase fetch in /api/professions failed, using fallback list:', err.message || err);
    
    // Transform PROFESSIONS fallback
    const fallback = PROFESSIONS.map((p: any) => ({
      id: p.slug,
      name: p.name,
      slug: p.slug,
      price: p.price,
      automation_risk: p.automation_risk,
      icon: p.industry_data?.icon,
      short_title: p.industry_data?.psychological_title,
      psychological_title: p.industry_data?.psychological_title,
      fear_title: p.industry_data?.fear_title,
      headline: p.industry_data?.fear_title,
      subheadline: p.industry_data?.ad_hook,
      pain_points: p.industry_data?.pain_points,
      tech_stack: p.industry_data?.industry_tools,
      ticket_value: p.industry_data?.avg_revenue_client,
      questionnaire: p.industry_data?.onboarding_questions,
      core_systems: p.industry_data?.geniuzlab_services,
      meta_title: p.industry_data?.meta_title,
      meta_description: p.industry_data?.meta_description
    }));

    return new Response(JSON.stringify(fallback), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
