'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Navbar from '@/components/Navbar';
import { Profession } from '@/lib/constants';
import { getProfessions } from '@/lib/professions-api';
import StripeButton from '@/components/StripeButton';
import { 
  ArrowRight, 
  ShieldCheck, 
  Lock, 
  Globe, 
  TrendingUp, 
  Zap, 
  Check, 
  AlertTriangle, 
  ShieldAlert, 
  Loader2, 
  Clock, 
  Sparkles, 
  Star, 
  HelpCircle,
  Flame,
  CheckCircle2,
  Copy,
  ChevronRight,
  Gift
} from 'lucide-react';
import Link from 'next/link';

const GuideCover = ({ profession, slugStr }: { profession: Profession, slugStr?: string }) => {
  const imageSrc = `/images/guides/${profession.slug || slugStr}.jpg`;

  return (
    <div className="relative w-[340px] sm:w-[400px] aspect-[3/4] bg-[#060913] shadow-[0_30px_90px_rgba(0,0,0,0.95),0_0_40px_rgba(201,168,76,0.35)] border-[2px] border-[#C9A84C] rounded-xl group overflow-hidden">
      {/* 8K Cover Image */}
      <img 
        src={imageSrc} 
        alt={`AI Guide Cover for ${profession.name}`}
        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        onError={(e) => {
          (e.target as HTMLElement).style.display = 'none';
        }}
      />

      {/* Gold Corner Frame Accents */}
      <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-[#C9A84C] pointer-events-none z-10" />
      <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-[#C9A84C] pointer-events-none z-10" />
      <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-[#C9A84C] pointer-events-none z-10" />
      <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-[#C9A84C] pointer-events-none z-10" />

      {/* Specular Lighting Accent */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.05] to-transparent pointer-events-none" />
    </div>
  );
};

export default function ProductClient() {
  const { slug } = useParams();
  const searchParams = useSearchParams();
  const isDiscounted = searchParams.get('discount') === 'true';

  const [professions, setProfessions] = useState<Profession[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'TOOLS' | 'PROMPTS' | 'ROADMAP' | 'ROI'>('TOOLS');
  const [copiedPrompt, setCopiedPrompt] = useState<number | null>(null);

  const slugStr = Array.isArray(slug) ? slug[0] : slug;

  useEffect(() => {
    async function fetchProfessions() {
      try {
        const data = await getProfessions();
        setProfessions(data);
      } catch (err) {
        console.error('Error fetching professions:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchProfessions();
  }, []);

  const profession = professions.find(p => p.slug === slugStr);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#060A14] flex flex-col items-center justify-center text-[#C9A84C] space-y-4">
        <Loader2 className="w-10 h-10 animate-spin" />
        <span className="text-xs font-mono uppercase tracking-widest">Decrypting Sector Protocol...</span>
      </div>
    );
  }

  if (!profession) {
    return (
      <div className="min-h-screen bg-[#060A14] flex flex-col items-center justify-center text-[#F8F6F0] space-y-4">
        <h1 className="text-3xl font-serif">Sector Protocol Not Found</h1>
        <Link href="/" className="text-xs font-mono text-[#C9A84C] underline">← Return to Intelligence Marketplace</Link>
      </div>
    );
  }

  const price = isDiscounted ? Math.round(profession.price * 0.5) : profession.price;
  const originalValue = 497;

  // Sample prompt teasers for preview
  const samplePrompts = [
    {
      title: `${profession.name} Client Intake Automator`,
      use_case: "Cuts onboarding time by 80%",
      snippet: `Act as a senior AI business strategist for ${profession.name}s. Analyze client requirements, extract core pain points, and draft a personalized proposal template with 3 high-value tier packages...`
    },
    {
      title: "Repetitive Task Elimination System",
      use_case: "Reclaims 12+ hours per week",
      snippet: `Generate a step-by-step workflow to automate data entry, follow-up notifications, and scheduling for a ${profession.name} using Zapier, ChatGPT API, and Google Workspace...`
    }
  ];

  return (
    <div className="min-h-screen bg-[#060A14] text-[#F8F6F0] selection:bg-[#C9A84C] selection:text-[#060A14]">
      <Navbar />
      
      <main className="pt-28 pb-32">
        {/* Top Scarcity & Urgency Banner */}
        <div className="bg-[#DC2626]/15 border-y border-[#DC2626]/30 py-2.5 px-4 text-center">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 text-xs font-mono text-[#EF4444] font-bold tracking-widest">
            <Flame className="w-4 h-4 animate-bounce text-[#EF4444]" />
            <span>URGENT: ONLY 14 PROTOCOL LICENSES REMAINING FOR {profession.name.toUpperCase()}S THIS MONTH</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-12">
          {/* Main Sales Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* LEFT COLUMN: 8K Cover Image & Trust Signals */}
            <div className="lg:col-span-5 flex flex-col items-center lg:sticky lg:top-28">
              <GuideCover profession={profession} slugStr={slugStr} />

              {/* Verified Buyers Social Proof */}
              <div className="mt-8 bg-[#0A0F1E] border border-[#C9A84C]/30 p-5 rounded-xl w-full max-w-[400px] shadow-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-[#C9A84C]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#C9A84C]" />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono text-gray-400 uppercase font-bold">4.9 / 5.0 RATING</span>
                </div>
                
                <p className="text-xs text-gray-300 italic font-serif leading-relaxed">
                  &quot;This protocol saved my practice from losing clients to AI-native competitors. Implemented System #2 in 3 days.&quot;
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[10px] font-mono text-gray-400">
                  <span className="font-bold text-[#C9A84C]">Verified {profession.name}</span>
                  <span>London, UK</span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Sales Copy & High-Converting Checkout Box */}
            <div className="lg:col-span-7 space-y-8">
              {/* Risk Badge */}
              <div className="inline-flex items-center gap-2 bg-[#DC2626]/20 border border-[#DC2626]/40 px-4 py-2 rounded-md">
                <AlertTriangle className="w-4 h-4 text-[#EF4444]" />
                <span className="text-xs font-mono font-black text-[#EF4444] uppercase tracking-widest">
                  CRITICAL: {profession.automation_risk}% TASK DISPLACEMENT RISK
                </span>
              </div>

              {/* Title & Subtitle */}
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#F8F6F0] leading-tight">
                  {profession.industry_data?.psychological_title || `The AI Survival Protocol for ${profession.name}s`}
                </h1>

                <p className="text-lg md:text-xl text-gray-300 font-light leading-relaxed border-l-2 border-[#C9A84C] pl-4 italic">
                  {profession.industry_data?.fear_title || `Stop losing revenue to AI automation. Deploy the exact 5-system workflow used by top 1% ${profession.name}s.`}
                </p>
              </div>

              {/* HIGH CONVERTING CHECKOUT & PRICE BOX */}
              <div className="bg-[#0A0F1E] border-2 border-[#C9A84C] rounded-2xl p-8 shadow-[0_0_50px_rgba(201,168,76,0.2)] space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-[#C9A84C] text-[#060A14] px-4 py-1.5 rounded-bl-xl font-mono font-black text-[10px] uppercase tracking-widest">
                  2026 OFFICIAL EDITION
                </div>

                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
                  <div>
                    <span className="text-[10px] font-mono text-gray-400 block uppercase tracking-widest">INSTANT DOWNLOAD ACCESS TOKEN</span>
                    <div className="flex items-baseline gap-3 mt-1">
                      <span className="text-5xl font-serif font-black text-[#C9A84C]">£{price}</span>
                      <span className="text-lg text-gray-500 line-through font-serif">Original ${originalValue} USD</span>
                      <span className="bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs px-2 py-0.5 rounded font-mono font-bold">
                        SAVE 85% TODAY
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-emerald-400 font-bold block">✓ 1-CLICK INSTANT ACCESS</span>
                    <span className="text-[10px] font-mono text-gray-400">PDF + LIVE DIGITAL APP</span>
                  </div>
                </div>

                {/* What You Get Included List */}
                <div className="space-y-3">
                  <span className="text-xs font-mono font-bold text-[#C9A84C] uppercase tracking-widest block">
                    EVERYTHING INCLUDED IN THIS PROTOCOL:
                  </span>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-gray-300">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#C9A84C] flex-shrink-0" />
                      <span>8K Digital Magazine Guide</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#C9A84C] flex-shrink-0" />
                      <span>5 Industry AI Systems</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#C9A84C] flex-shrink-0" />
                      <span>ChatGPT & Claude Prompt Bank</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#C9A84C] flex-shrink-0" />
                      <span>4-Week Action Roadmap</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#C9A84C] flex-shrink-0" />
                      <span>Free Tools Directory & Links</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#C9A84C] flex-shrink-0" />
                      <span>GeniuzLab Agency Support</span>
                    </div>
                  </div>
                </div>

                {/* Stripe Button Component */}
                <div className="pt-2">
                  <StripeButton 
                    professionSlug={profession.slug} 
                    price={price} 
                    customLabel={`ACTIVATE PROTOCOL NOW — £${price}`}
                  />
                </div>
              </div>

              {/* INTERACTIVE PREVIEW TABS */}
              <div className="space-y-6 pt-6">
                <div className="flex items-center justify-between border-b border-[#C9A84C]/20 pb-4">
                  <h3 className="text-lg font-serif font-bold text-[#C9A84C] flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#C9A84C]" /> INSIDE THE PROTOCOL PREVIEW
                  </h3>
                </div>

                {/* Tab Switcher */}
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'TOOLS', label: '🛠️ Secret Tool Stack' },
                    { id: 'PROMPTS', label: '💬 Sample AI Prompts' },
                    { id: 'ROADMAP', label: '🗺️ 30-Day Roadmap' },
                    { id: 'ROI', label: '📊 Financial Value' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`px-4 py-2.5 rounded-lg text-xs font-mono font-bold transition-all border ${
                        activeTab === tab.id
                          ? 'bg-[#C9A84C] text-[#060A14] border-[#C9A84C]'
                          : 'bg-[#0A0F1E] text-gray-400 border-white/10 hover:border-[#C9A84C]/40'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Tab Content Box */}
                <div className="bg-[#0A0F1E] border border-white/10 rounded-xl p-6 space-y-4">
                  {activeTab === 'TOOLS' && (
                    <div className="space-y-4 text-xs font-mono">
                      <p className="text-gray-300">Target tools deployed in this protocol for {profession.name}s:</p>
                      <div className="flex flex-wrap gap-2">
                        {(profession.industry_data?.industry_tools || ['ChatGPT', 'Claude 3.5', 'Zapier', 'Make.com', 'Notion AI']).map((tool, idx) => (
                          <span key={idx} className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-md text-[#C9A84C] font-bold">
                            ⚡ {tool}
                          </span>
                        ))}
                      </div>
                      <p className="text-gray-400 text-[11px] pt-2 font-sans">
                        Includes exact free tier links + GeniuzLab agency done-for-you automation upgrades.
                      </p>
                    </div>
                  )}

                  {activeTab === 'PROMPTS' && (
                    <div className="space-y-4">
                      {samplePrompts.map((p, idx) => (
                        <div key={idx} className="bg-[#060A14] p-4 rounded-lg border border-[#C9A84C]/30 space-y-2">
                          <div className="flex justify-between items-center text-xs font-mono">
                            <span className="font-bold text-[#C9A84C]">{p.title}</span>
                            <span className="text-[10px] text-emerald-400 font-semibold">{p.use_case}</span>
                          </div>
                          <p className="text-xs font-mono text-gray-400 bg-white/5 p-3 rounded border border-white/5 line-clamp-2">
                            {p.snippet}
                          </p>
                          <span className="text-[10px] font-mono text-gray-500 italic block">
                            🔒 Full copy-paste prompt unlocked inside paid protocol.
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'ROADMAP' && (
                    <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                      <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                        <span className="text-[#C9A84C] font-bold block">WEEK 1: Foundation</span>
                        <span className="text-gray-400 text-[11px]">Audit manual tasks & setup free AI tools.</span>
                      </div>
                      <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                        <span className="text-[#C9A84C] font-bold block">WEEK 2: Lead Automation</span>
                        <span className="text-gray-400 text-[11px]">Deploy 24/7 AI response & intake bots.</span>
                      </div>
                      <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                        <span className="text-[#C9A84C] font-bold block">WEEK 3: Delivery Engine</span>
                        <span className="text-gray-400 text-[11px]">Automate client deliverables & reports.</span>
                      </div>
                      <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                        <span className="text-[#C9A84C] font-bold block">WEEK 4: Scaling & Retainers</span>
                        <span className="text-gray-400 text-[11px]">Scale to 10x capacity with zero stress.</span>
                      </div>
                    </div>
                  )}

                  {activeTab === 'ROI' && (
                    <div className="space-y-3 text-xs font-mono text-gray-300">
                      <div className="flex justify-between items-center bg-white/5 p-3 rounded-lg">
                        <span>Average Client Value:</span>
                        <span className="text-[#C9A84C] font-bold">{profession.industry_data?.avg_revenue_client || '£500 - £2,000'}</span>
                      </div>
                      <div className="flex justify-between items-center bg-white/5 p-3 rounded-lg">
                        <span>Estimated Hours Reclaimed:</span>
                        <span className="text-emerald-400 font-bold">12 - 18 Hours / Week</span>
                      </div>
                      <div className="flex justify-between items-center bg-white/5 p-3 rounded-lg">
                        <span>Annual Value Recovered:</span>
                        <span className="text-[#C9A84C] font-black text-sm">£15,000 - £45,000+</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* TRANSFORMATION COMPARISON TABLE */}
              <div className="space-y-4 pt-8">
                <h3 className="text-lg font-serif font-bold text-[#F8F6F0]">
                  Why Operating Without AI In 2026 Is Financial Suicide
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Left: Manual Extinct */}
                  <div className="bg-red-950/20 border border-red-800/40 p-5 rounded-xl space-y-3">
                    <span className="text-xs font-mono font-bold text-red-400 uppercase tracking-widest block">
                      ❌ WITHOUT THIS PROTOCOL (EXPOSED)
                    </span>
                    <ul className="space-y-2 text-xs font-mono text-gray-400">
                      <li>• Spending 15+ hours/week on manual admin</li>
                      <li>• Losing leads to faster AI-native competitors</li>
                      <li>• Trapped in billable hour treadmill</li>
                      <li>• 0% automated client retention</li>
                    </ul>
                  </div>

                  {/* Right: AI Augmented */}
                  <div className="bg-emerald-950/20 border border-emerald-500/40 p-5 rounded-xl space-y-3">
                    <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest block">
                      ✅ WITH THIS PROTOCOL (PROTECTED)
                    </span>
                    <ul className="space-y-2 text-xs font-mono text-gray-300">
                      <li>✓ 70% of repetitive work fully automated</li>
                      <li>✓ 24/7 AI lead capture & instant booking</li>
                      <li>✓ Scaling client capacity 3x without hiring</li>
                      <li>✓ Future-proofed high-income career</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
