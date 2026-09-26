import { fetchProfessionsDirectly } from './supabase';
import { PROFESSIONS } from './professions-data';

export async function getProfessions() {
  try {
    const res = await fetch('/api/professions');
    if (res.ok) {
      const data = await res.json();
      if (data && data.length > 0) return data;
    }
  } catch (err) {
    console.warn('API /api/professions unavailable, falling back to direct Supabase fetch');
  }
  
  try {
    const data = await fetchProfessionsDirectly();
    if (data && data.length > 0) return data;
  } catch (err) {
    console.warn('fetchProfessionsDirectly failed, falling back to local list:', err);
  }

  // Fallback if everything else fails
  return PROFESSIONS.map((p: any) => ({
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
}
