export const runtime = 'edge';

import Navbar from '@/components/Navbar';
import { RefreshCw, ShieldCheck, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-[#060A14] text-[#F8F6F0]">
      <Navbar />
      
      <main className="pt-32 pb-24 px-6 max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-mono text-[#C9A84C] hover:underline mb-8">
          <ArrowLeft className="w-4 h-4" /> Return to Intelligence Marketplace
        </Link>

        <div className="space-y-6 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#C9A84C]/10 border border-[#C9A84C]/30 rounded text-[10px] font-mono font-bold text-[#C9A84C] uppercase tracking-widest">
            <ShieldCheck className="w-3.5 h-3.5" /> 100% SATISFACTION GUARANTEE
          </div>
          
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#F8F6F0]">
            30-Day Money-Back Guarantee Policy
          </h1>
          <p className="text-xs font-mono text-gray-400">Zero Risk Guarantee | GeniuzLab Intelligence Unit</p>
        </div>

        <div className="bg-[#0A0F1E] border border-white/10 p-8 md:p-12 rounded-2xl space-y-8 text-sm text-gray-300 font-sans leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-[#C9A84C]">1. Our 30-Day 100% Satisfaction Promise</h2>
            <p>
              We stand 100% behind the caliber of our 8K AI Survival Protocols. If you purchase any protocol, deploy the 5 AI systems and ChatGPT prompts for 30 days, and feel you did not reclaim at least 10x the protocol value in time or efficiency, we will issue a <strong>100% full refund with zero hassle</strong>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-[#C9A84C]">2. How To Request A Refund</h2>
            <p>
              Simply email <strong>support@geniuzlab.com</strong> with your Stripe receipt email or session ID within 30 days of purchase. Refunds are processed back to your original payment method within 3-5 business days.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-[#C9A84C]">3. Fair Use Safeguard</h2>
            <p>
              To prevent malicious digital piracy, accounts attempting to purchase, download, and refund multiple protocols systematically will be flagged by our security system.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
