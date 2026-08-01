export const runtime = 'edge';
export const dynamic = 'force-dynamic';

import { Suspense } from 'react';
import ProductClient from './ProductClient';

export default function ProductPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0A0F1E]" />}>
      <ProductClient />
    </Suspense>
  );
}
