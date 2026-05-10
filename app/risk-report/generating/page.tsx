'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import Navbar from '@/components/Navbar';
import { Sparkles, ShieldCheck, Mail, Loader2, ArrowRight } from 'lucide-react';
import { Profession } from '@/lib/constants';
import { getProfessions } from '@/lib/professions-api';

export default function RiskReportGenerating() {
  const router = useRouter();
  const [professions, setProfessions] = useState<Profession[]>([]);
  const [profession, setProfession] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'analyzing' | 'email_capture' | 'saving'>('analyzing');
  const [progress, setProgress] = useState(0);
  const [currentStat, setCurrentStat] = useState(0);

  const stats = [
    "Cross-referencing WEF Automation Indices...",
    "Calculating sector-specific displacement MoM...",
    "Analyzing historical wage suppression data...",
    "Synthesizing 2,847 data points for your role...",
    "Mapping AI structural efficiency gains..."
  ];

  useEffect(() => {
    async function fetchProfessions() {
      try {
        const data = await getProfessions();
        setProfessions(data);
      } catch (err) {
        console.error('Error fetching professions:', err);
      }
    }
    fetchProfessions();
  }, []);

  useEffect(() => {
    const stored = sessionStorage.getItem('risk_report_profession');
    if (!stored) {
      router.push('/risk-report');
    } else if (profession !== stored) {
      // Defer state update to next tick to avoid cascading render lint error
      const timer = setTimeout(() => setProfession(stored), 0);
      return () => clearTimeout(timer);
    }
  }, [profession, router]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setStatus('email_capture');
          return 100;
        }
        return prev + 1;
      });
    }, 50);

    const statInterval = setInterval(() => {
      setCurrentStat(prev => (prev + 1) % stats.length);
    }, 1500);

    return () => {
      clearInterval(interval);
      clearInterval(statInterval);
    };
  }, [router, stats.length]);

  const pInfo = professions.find(p => p.slug === profession);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('saving');

    const answers = JSON.parse(sessionStorage.getItem('risk_report_answers') || '{}');
    const token = Math.random().toString(36).substring(7);

    try {
      const response = await fetch('/api/risk-report/save-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          profession_slug: profession,
          answers,
          token
        })
      });

      if (response.ok) {
        router.push(`/risk-report/result/${token}`);
      } else {
        throw new Error('Failed to save lead');
      }
    } catch (err) {
      console.error(err);
      // Fallback for demo
      router.push(`/risk-report/result/${token}`);
    }
  };

  if (!profession) return null;

  return (
    <div className="min-h-screen bg-[#0A0F1E] text-[#F8F6F0]">
      <Navbar />
      
      <main className="pt-40 px-6 flex flex-col items-center justify-center min-h-[80vh]">
        <div className="max-w-xl w-full text-center">
          {status === 'analyzing' ? (
            <div className="space-y-12">
              <div className="relative">
                <div className="w-24 h-24 rounded-full border-4 border-[#C9A84C]/20 border-t-[#C9A84C] animate-spin mx-auto" />
                <Sparkles className="w-10 h-10 text-[#C9A84C] absolute inset-0 m-auto animate-pulse" />
              </div>

              <div>
                <h2 className="text-3xl font-black mb-4 uppercase tracking-tighter">Analyzing Survival Data</h2>
                <p className="text-[#C9A84C] font-mono text-xs uppercase tracking-[0.3em] h-4">
                  {stats[currentStat]}
                </p>
              </div>

              <div className="space-y-4">
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-[#C9A84C]"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-[10px] font-mono opacity-40 uppercase tracking-widest">{progress}% COMPLETE</p>
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-12 rounded-[2px] bg-white/[0.02] border border-white/10"
            >
              <ShieldCheck className="w-16 h-16 text-[#C9A84C] mx-auto mb-8" />
              <h2 className="text-4xl font-serif font-black mb-4">Report Complete.</h2>
              <p className="text-[#F8F6F0]/60 mb-12">
                We&apos;ve synthesized your risk score for <span className="text-[#F8F6F0] font-bold">{pInfo?.name}</span>. Enter your professional email to unlock the protocol.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 p-6 pl-16 rounded-[2px] text-lg hover:border-[#C9A84C]/50 focus:outline-none focus:border-[#C9A84C] transition-all"
                  />
                </div>

                <button
                  disabled={status === 'saving'}
                  className="w-full py-6 bg-[#C9A84C] text-[#0A0F1E] rounded-[2px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-4 hover:scale-[1.02] transition-all"
                >
                  {status === 'saving' ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    <>Unlock Report <ArrowRight className="w-5 h-5" /></>
                  )}
                </button>
              </form>

              <p className="mt-8 text-[10px] font-mono opacity-30 uppercase tracking-widest">
                🔒 We respect your privacy. No spam, just intelligence.
              </p>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
