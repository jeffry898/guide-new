import { Suspense } from 'react';
import { getSupabaseAdmin } from '@/lib/supabase';
import ProductClient from './ProductClient';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  try {
    const supabase = getSupabaseAdmin();
    if (!supabase) return [{ slug: 'hair-salon-owner' }];
    
    const { data: professions } = await supabase
      .from('professions')
      .select('slug');
      
    if (!professions || professions.length === 0) {
      return [{ slug: 'hair-salon-owner' }];
    }

    return professions.map((p: { slug: string }) => ({
      slug: p.slug,
    }));
  } catch (e) {
    console.error('Error in generateStaticParams:', e);
    return [{ slug: 'hair-salon-owner' }];
  }
}

export default function ProductPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0A0F1E]" />}>
      <ProductClient />
    </Suspense>
  );
}
