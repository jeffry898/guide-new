import { createBrowserClient } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';

// Client-side supabase
export const createClientComponentClient = () => createBrowserClient(supabaseUrl, supabaseAnonKey);

export async function fetchProfessionsDirectly() {
  const supabase = createClientComponentClient();
  const { data: professions, error } = await supabase
    .from('professions')
    .select('*')
    .order('name');

  if (error) throw error;
  
  // Transform to match front-end expectation
  return (professions || []).map((p: any) => ({
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
}

// Server-side supabase (admin/service role)
let supabaseAdminInstance: any = null;
export const getSupabaseAdmin = () => {
  if (!supabaseAdminInstance) {
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY;
    if (!supabaseUrl || !serviceRoleKey) {
      console.warn('Supabase credentials missing. Admin operations will fail.');
      return null;
    }
    supabaseAdminInstance = createClient(supabaseUrl, serviceRoleKey);
  }
  return supabaseAdminInstance;
};

// Keeping it for legacy use in modules that import it at top level, 
// but it might be null initially if keys are missing
export const supabaseAdmin = getSupabaseAdmin();
