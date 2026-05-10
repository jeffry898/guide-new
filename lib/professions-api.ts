import { fetchProfessionsDirectly } from './supabase';

export async function getProfessions() {
  try {
    const res = await fetch('/api/professions');
    if (res.ok) {
      return await res.json();
    }
    console.warn('API /api/professions failed, falling back to direct Supabase fetch');
  } catch (err) {
    console.warn('API /api/professions unavailable, falling back to direct Supabase fetch');
  }
  
  return await fetchProfessionsDirectly();
}
