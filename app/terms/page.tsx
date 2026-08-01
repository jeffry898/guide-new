export const runtime = 'edge';

import Navbar from '@/components/Navbar';
import { FileText, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#060A14] text-[#F8F6F0]">
      <Navbar />
      
      <main className="pt-32 pb-24 px-6 max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-mono text-[#C9A84C] hover:underline mb-8">
          <ArrowLeft className="w-4 h-4" /> Return to Intelligence Marketplace
        </Link>

        <div className="space-y-6 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#C9A84C]/10 border border-[#C9A84C]/30 rounded text-[10px] font-mono font-bold text-[#C9A84C] uppercase tracking-widest">
            <FileText className="w-3.5 h-3.5" /> LEGAL AGREEMENT
          </div>
          
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#F8F6F0]">
            Terms of Service & License Agreement
          </h1>
          <p className="text-xs font-mono text-gray-400">Effective Date: January 1, 2026 | GeniuzLab Intelligence Unit</p>
        </div>

        <div className="bg-[#0A0F1E] border border-white/10 p-8 md:p-12 rounded-2xl space-y-8 text-sm text-gray-300 font-sans leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-[#C9A84C]">1. Acceptance of Terms</h2>
            <p>
              By purchasing, downloading, or accessing any AI Survival Protocol, Risk Report, or prompt library on GUIDR EMPIRE (&quot;https://guidr-empire.pages.dev&quot;), you enter into a legally binding agreement with GeniuzLab Inc.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-[#C9A84C]">2. Intellectual Property & Digital License</h2>
            <p>
              Upon successful payment via Stripe, you are granted a non-exclusive, non-transferable, lifetime single-user license to utilize the custom prompt templates, 4-week roadmap, and AI tool workflows for your personal or commercial practice. You may <strong>NOT resell, redistribute, publicize, or re-package</strong> the proprietary prompt banks.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-[#C9A84C]">3. Earnings & Performance Disclaimer</h2>
            <p>
              GUIDR EMPIRE provides high-yield automation blueprints based on empirical data from the World Economic Forum and McKinsey. However, individual results depend on your implementation effort. We do not guarantee specific income figures or job retention.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-[#C9A84C]">4. Limitation of Liability</h2>
            <p>
              In no event shall GeniuzLab or its partners be liable for any indirect or consequential damages arising out of the use or inability to use our protocols.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
