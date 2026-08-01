export const runtime = 'edge';

import Navbar from '@/components/Navbar';
import { ShieldCheck, Lock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#060A14] text-[#F8F6F0]">
      <Navbar />
      
      <main className="pt-32 pb-24 px-6 max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-mono text-[#C9A84C] hover:underline mb-8">
          <ArrowLeft className="w-4 h-4" /> Return to Intelligence Marketplace
        </Link>

        <div className="space-y-6 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#C9A84C]/10 border border-[#C9A84C]/30 rounded text-[10px] font-mono font-bold text-[#C9A84C] uppercase tracking-widest">
            <Lock className="w-3.5 h-3.5" /> OFFICIAL LEGAL DOCUMENT
          </div>
          
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#F8F6F0]">
            Privacy Policy & Data Security
          </h1>
          <p className="text-xs font-mono text-gray-400">Effective Date: January 1, 2026 | GeniuzLab Intelligence Unit</p>
        </div>

        <div className="bg-[#0A0F1E] border border-white/10 p-8 md:p-12 rounded-2xl space-y-8 text-sm text-gray-300 font-sans leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-[#C9A84C]">1. Data Protection Commitment</h2>
            <p>
              At GeniuzLab GUIDR EMPIRE (&quot;GUIDR&quot;), we take white-collar professional privacy and data security with absolute military seriousness. This Privacy Policy details how we collect, process, encrypt, and safeguard your personal information when utilizing our AI Risk Assessment tools, purchasing 8K AI Survival Protocols, or consulting with our Intelligence Unit.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-[#C9A84C]">2. Information We Collect</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Contact & Account Data:</strong> Email addresses provided during risk assessment or checkout to deliver access tokens and PDF reports.</li>
              <li><strong>Profession & Sector Metadata:</strong> Assessment questionnaire responses used exclusively to generate customized AI prompt libraries and risk percentages.</li>
              <li><strong>Payment Data:</strong> Handled 100% securely via Stripe API. GUIDR EMPIRE never stores or views raw credit card or banking details.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-[#C9A84C]">3. How We Use Artificial Intelligence</h2>
            <p>
              Your professional assessment data is processed using Google Gemini 2.0 Flash Enterprise LLM models. All prompts and response payloads are processed through zero-retention enterprise API endpoints. Your data is <strong>NEVER used to train public AI models</strong>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-[#C9A84C]">4. Data Encryption & Security Standards</h2>
            <p>
              All traffic between your browser and our edge servers is encrypted using 256-Bit SSL/TLS. Account tokens are stored in Supabase with strict Row-Level Security (RLS) policies preventing unauthorized access.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-[#C9A84C]">5. Contact Intelligence Unit</h2>
            <p>
              If you have any questions regarding data removal or compliance, contact us at <strong>legal@geniuzlab.com</strong>.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
