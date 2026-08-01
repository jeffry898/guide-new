export const runtime = 'edge';
export const dynamic = 'force-dynamic';

import { Suspense } from 'react';
import ProductClient from './ProductClient';
import { PROFESSIONS } from '@/lib/professions-data';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = PROFESSIONS.find(item => item.slug === slug);

  if (!p) {
    return {
      title: 'AI Survival Protocol | GUIDR EMPIRE',
      description: 'AI survival guides for modern white-collar professionals.',
    };
  }

  const title = p.industry_data?.meta_title || `${p.name} AI Survival Guide 2026 | GUIDR EMPIRE`;
  const description = p.industry_data?.meta_description || `How ${p.name}s leverage ChatGPT, Claude 3.5, and AI prompt automation to protect their income and 10x output.`;

  return {
    title,
    description,
    keywords: [
      `AI for ${p.name}`,
      `will AI replace ${p.name}`,
      `${p.name} AI tools 2026`,
      `ChatGPT prompts for ${p.name}`,
      `${p.name} automation protocol`,
      'GeniuzLab intelligence'
    ],
    openGraph: {
      title,
      description,
      url: `https://guidr-empire.pages.dev/product/${slug}`,
      siteName: 'GUIDR EMPIRE',
      images: [
        {
          url: `https://guidr-empire.pages.dev/images/guides/${slug}.jpg`,
          width: 1200,
          height: 630,
          alt: `${p.name} AI Guide Cover`,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`https://guidr-empire.pages.dev/images/guides/${slug}.jpg`],
    },
  };
}

export default function ProductPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#060A14]" />}>
      <ProductClient />
    </Suspense>
  );
}
