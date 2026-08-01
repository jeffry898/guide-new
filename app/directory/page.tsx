export const runtime = 'edge';

import { Suspense } from 'react';
import DirectoryClient from './DirectoryClient';
import { Loader2 } from 'lucide-react';

export const metadata = {
  title: 'All Professional AI Survival Protocols Directory | GUIDR EMPIRE',
  description: 'Browse all 50+ professional AI survival guides, task automation risk scores, and ChatGPT prompt banks for legal, medical, tech, finance, and creative industries.',
};

export default function DirectoryPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#060A14] flex items-center justify-center text-[#C9A84C]">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    }>
      <DirectoryClient />
    </Suspense>
  );
}
