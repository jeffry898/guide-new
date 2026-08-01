import { PROFESSIONS } from './professions-data';

// Transforms raw profession data into the normalized Profession shape
export function transformProfession(p: any) {
  return {
    id: p.id || p.slug,
    name: p.name,
    slug: p.slug,
    price: p.price,
    automation_risk: p.automation_risk,
    icon: p.industry_data?.icon || p.icon || 'Briefcase',
    short_title: p.industry_data?.psychological_title || p.short_title || '',
    psychological_title: p.industry_data?.psychological_title || p.psychological_title || '',
    fear_title: p.industry_data?.fear_title || p.fear_title || '',
    headline: p.industry_data?.fear_title || p.headline || p.name,
    subheadline: p.industry_data?.ad_hook || p.subheadline || '',
    guide_title: p.industry_data?.fear_title || p.name + ' AI Survival Blueprint',
    pain_points: p.industry_data?.pain_points || p.pain_points || [],
    tech_stack: p.industry_data?.industry_tools || p.tech_stack || [],
    ticket_value: p.industry_data?.avg_revenue_client || p.ticket_value || '',
    questionnaire: p.industry_data?.onboarding_questions || p.questionnaire || [],
    core_systems: p.industry_data?.geniuzlab_services || p.core_systems || [],
    roi_insight: p.industry_data?.roi_insight || p.roi_insight || 'Significant ROI expected within 90 days.',
    transformation_statement: p.industry_data?.transformation_statement || p.transformation_statement || 'AI will transform your profession.',
    popularity_score: p.industry_data?.popularity_score || p.popularity_score || 80,
    meta_title: p.industry_data?.meta_title || p.meta_title || p.name + ' AI Guide 2026',
    meta_description: p.industry_data?.meta_description || p.meta_description || '',
  };
}

export async function getProfessions() {
  // Attempt live Supabase fetch via API route (server-side only, absolute URL needed)
  // Skip fetch() entirely on client — use direct static data for reliability
  if (typeof window === 'undefined') {
    // Server context: try API route (only works in Next.js server components)
    try {
      const { fetchProfessionsDirectly } = await import('./supabase');
      const data = await fetchProfessionsDirectly();
      if (data && data.length > 0) return data.map(transformProfession);
    } catch (err) {
      console.warn('[server] Supabase direct fetch failed, using static fallback:', err);
    }
  }

  // Client context OR server fallback: use the static bundled data — always reliable
  return PROFESSIONS.map(transformProfession);
}

