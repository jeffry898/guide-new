'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import Navbar from '@/components/Navbar';
import { Profession } from '@/lib/constants';
import { getProfessions } from '@/lib/professions-api';
import { ArrowRight, ChevronDown, ShieldAlert, Loader2, CheckCircle2, Lock, Sparkles, AlertTriangle } from 'lucide-react';

export default function RiskReportLanding() {
  const router = useRouter();
  const [professions, setProfessions] = useState<Profession[]>([]);
  const [selectedProfession, setSelectedProfession] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

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

  const profession = professions.find(p => p.slug === selectedProfession);

  const handleStart = () => {
    if (selectedProfession) {
      sessionStorage.setItem('risk_report_profession', selectedProfession);
      router.push('/risk-report/assess');
    }
  };

  return (
    <div className="min-h-screen bg-[#060A14] text-[#F8F6F0]">
      <Navbar />
      
      <main className="pt-36 pb-24 px-6 relative overflow-hidden">
        {/* Background Subtle Grid & Ambient Glow */}
        <div className="absolute inset-0 z-0 opacity-[0.03]" 
             style={{ backgroundImage: 'linear-gradient(#C9A84C 1px, transparent 1px), linear-gradient(90deg, #C9A84C 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#C9A84C]/10 blur-[140px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#0A0F1E] border border-[#C9A84C]/40 rounded-full mb-8 shadow-[0_0_20px_rgba(201,168,76,0.15)]"
          >
            <ShieldAlert className="w-4 h-4 text-[#C9A84C]" />
            <span className="text-xs font-mono font-bold text-[#C9A84C] uppercase tracking-widest">
              2026 WEF DATASET // CONFIDENTIAL ASSESSMENT
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold leading-[1.05] tracking-tight mb-8"
          >
            Calculate Your Profession&apos;s <br />
            <span className="text-[#C9A84C]">AI Displacement Risk</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-2xl text-gray-300 font-light mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Get an instant 90-second intelligence report analyzing task automation risk, income vulnerability, and protective AI action steps.
          </motion.p>

          {/* Profession Selection Box */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative max-w-lg mx-auto mb-10"
          >
            <div className="relative">
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full bg-[#0A0F1E] border border-[#C9A84C]/40 p-5 flex justify-between items-center rounded-xl text-base md:text-lg font-mono font-bold text-[#F8F6F0] hover:border-[#C9A84C] transition-all text-left shadow-2xl"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{profession?.icon || '💼'}</span>
                  <span>{profession ? profession.name : "Select your profession..."}</span>
                </div>
                <ChevronDown className={`w-5 h-5 text-[#C9A84C] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
              </button>

              {isOpen && (
                <div className="absolute top-full left-0 w-full mt-2 bg-[#0A0F1E] border border-[#C9A84C]/40 rounded-xl max-h-80 overflow-y-auto z-50 shadow-2xl divide-y divide-white/5">
                  {loading ? (
                    <div className="p-6 flex justify-center">
                      <Loader2 className="w-6 h-6 text-[#C9A84C] animate-spin" />
                    </div>
                  ) : (
                    professions.map((p) => (
                      <button
                        key={p.slug}
                        onClick={() => {
                          setSelectedProfession(p.slug);
                          setIsOpen(false);
                        }}
                        className="w-full px-5 py-4 text-left font-mono text-sm hover:bg-[#C9A84C]/10 flex items-center justify-between transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-lg">{p.icon || '💼'}</span>
                          <span className="font-semibold text-gray-200 group-hover:text-[#C9A84C]">{p.name}</span>
                        </div>
                        <span className="text-xs text-red-400 font-bold bg-red-950/40 border border-red-800/40 px-2 py-0.5 rounded">
                          {p.automation_risk}% RISK
                        </span>
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>

            <button
              onClick={handleStart}
              disabled={!selectedProfession}
              className={`w-full mt-4 py-5 px-8 rounded-xl font-mono font-black text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-3 shadow-2xl ${
                selectedProfession 
                  ? 'bg-[#C9A84C] hover:bg-[#E6C875] text-[#060A14] shadow-[0_0_30px_rgba(201,168,76,0.4)] cursor-pointer' 
                  : 'bg-gray-800 text-gray-500 cursor-not-allowed border border-white/5'
              }`}
            >
              <span>GENERATE CONFIDENTIAL RISK REPORT</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>

          {/* Social Proof & Security Badges */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-xs font-mono text-gray-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#C9A84C]" /> 14,290+ Reports Generated
            </span>
            <span className="flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-[#C9A84C]" /> 100% Free & Confidential
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#C9A84C]" /> Instant 90-Second Analysis
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}
