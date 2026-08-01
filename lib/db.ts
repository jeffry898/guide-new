import { getSupabaseAdmin } from './supabase';

// Professions
export async function getProfession(slug: string) {
  const supabaseAdmin = getSupabaseAdmin();
  const { data } = await supabaseAdmin
    .from('professions')
    .select('*')
    .eq('slug', slug)
    .single();
  return data;
}

export async function getAllProfessions() {
  const supabaseAdmin = getSupabaseAdmin();
  const { data } = await supabaseAdmin
    .from('professions')
    .select('*')
    .order('name');
  return data || [];
}

export async function getProfessionPackages(slug: string) {
  const profession = await getProfession(slug);
  return [
    { id: 'standard', name: 'Standard AI Protocol', price: profession?.price || 49, features: ['Dashboard Access', 'PDF Export'] },
    { id: 'premium', name: 'Premium Implementation', price: (profession?.price || 49) * 3, features: ['1-on-1 Setup', 'Priority Support'] }
  ];
}

// Guides
export async function getGuideByHash(professionSlug: string, hash: string) {
  const supabaseAdmin = getSupabaseAdmin();
  const { data, error } = await supabaseAdmin
    .from('guides')
    .select('*')
    .eq('profession_slug', professionSlug)
    .eq('onboarding_hash', hash)
    .single();
  
  if (error) return null;
  return data;
}

export async function saveGuide(professionSlug: string, hash: string, contentJson: any, userEmail: string) {
  const supabaseAdmin = getSupabaseAdmin();
  const { data, error } = await supabaseAdmin
    .from('guides')
    .insert([{
      profession_slug: professionSlug,
      onboarding_hash: hash,
      content: contentJson,
      user_email: userEmail,
      served_count: 0
    }])
    .select()
    .single();
    
  if (error) throw error;
  return data;
}

export async function getGuideById(id: string) {
  const supabaseAdmin = getSupabaseAdmin();
  const { data, error } = await supabaseAdmin
    .from('guides')
    .select('*')
    .eq('id', id)
    .single();
    
  if (error) return null;
  return data;
}

export async function incrementServedCount(id: string) {
  const supabaseAdmin = getSupabaseAdmin();
  const { error } = await supabaseAdmin.rpc('increment_served_count', { row_id: id });
  if (error) {
    // Fallback if RPC doesn't exist yet — fetch guide directly and update
    const guide = await getGuideById(id);
    if (guide) {
      await supabaseAdmin
        .from('guides')
        .update({ served_count: (guide.served_count || 0) + 1 })
        .eq('id', id);
    }
  }
}

// Purchases
export async function createPendingPurchase(purchaseData: { 
  user_email: string; 
  guide_id?: string;
  profession_slug?: string;
  stripe_session_id?: string;
  amount?: number;
  status?: string;
}) {
  const supabaseAdmin = getSupabaseAdmin();
  const { data: purchase, error } = await supabaseAdmin
    .from('purchases')
    .insert([{
      ...purchaseData,
      status: purchaseData.status || 'pending'
    }])
    .select()
    .single();
    
  if (error) throw error;
  return purchase;
}

export async function completePurchase(stripeSessionId: string, professionSlug: string) {
  const supabaseAdmin = getSupabaseAdmin();
  const { error } = await supabaseAdmin
    .from('purchases')
    .update({ status: 'completed' })
    .match({ stripe_session_id: stripeSessionId, profession_slug: professionSlug });
    
  if (error) throw error;
}

export async function getUserPurchases(userEmail: string) {
  const supabaseAdmin = getSupabaseAdmin();
  const { data, error } = await supabaseAdmin
    .from('purchases')
    .select('*, guides(*)')
    .eq('user_email', userEmail)
    .eq('status', 'completed');
    
  if (error) return [];
  return data;
}

export async function verifyUserOwnsGuide(userEmail: string, guideId: string) {
  const supabaseAdmin = getSupabaseAdmin();
  const { data, error } = await supabaseAdmin
    .from('purchases')
    .select('id')
    .eq('user_email', userEmail)
    .eq('guide_id', guideId)
    .eq('status', 'completed')
    .single();
    
  return !!data && !error;
}

// Leads / Report Leads
export async function saveReportLead(email: string, professionSlug: string, answers: any, token: string) {
  const supabaseAdmin = getSupabaseAdmin();
  const { error } = await supabaseAdmin
    .from('report_leads')
    .insert([{
      email,
      profession_slug: professionSlug,
      answers,
      token,
      email_sequence_step: 1
    }]);
    
  if (error) throw error;
}

export async function saveLead(email: string, professionSlug: string, serviceInterest: string) {
  const supabaseAdmin = getSupabaseAdmin();
  const { error } = await supabaseAdmin
    .from('report_leads')
    .insert([{
      email,
      profession_slug: professionSlug,
      answers: { service_interest: serviceInterest },
      token: crypto.randomUUID(),
      email_sequence_step: 1
    }]);
    
  if (error) throw error;
}
