'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import Navbar from '@/components/Navbar';
import { Profession } from '@/lib/constants';
import { getProfessions } from '@/lib/professions-api';
import { ArrowRight, ChevronDown, ShieldAlert, Loader2 } from 'lucide-react';

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
    <div className="min-h-screen bg-[#0A0F1E] text-[#F8F6F0]">
      <Navbar />
      
      <main className="pt-40 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#C9A84C]/10 border border-[#C9A84C]/20 rounded-full mb-12"
          >
            <ShieldAlert className="w-4 h-4 text-[#C9A84C]" />
            <span className="text-[10px] font-mono font-black text-[#C9A84C] uppercase tracking-widest">
              GeniuzLab Intelligence Engine v2.0
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-serif font-black leading-[0.9] tracking-tighter mb-8"
          >
            Find Out If AI Will <br />
            <span className="text-[#C9A84C]">Replace You</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-[#F8F6F0]/60 font-light mb-16 max-w-2xl mx-auto"
          >
            Free personalised risk report based on World Economic Forum datasets. Takes 90 seconds.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative max-w-md mx-auto"
          >
            <div className="relative">
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full bg-white/5 border border-white/10 p-6 flex justify-between items-center rounded-[2px] text-lg font-bold hover:border-[#C9A84C]/50 transition-all text-left"
              >
                {profession ? profession.name : "Select your profession..."}
                <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </button>

              {isOpen && (
                <div className="absolute top-full left-0 w-full mt-2 bg-[#0c1224] border border-white/10 rounded-[2px] max-h-80 overflow-y-auto z-50 shadow-2xl">
                  {loading ? (
                    <div className="p-4 flex justify-center">
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
                        className="w-full p-4 text-left hover:bg-[#C9A84C]/10 hover:text-[#C9A84C] border-b border-white/5 transition-colors text-sm font-bold uppercase tracking-widest"
                      >
                        {p.name}
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>

            <button
              onClick={handleStart}
              disabled={!selectedProfession}
              className={`w-full mt-6 py-6 rounded-[2px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-4 transition-all ${
                selectedProfession 
                ? 'bg-[#C9A84C] text-[#0A0F1E] hover:scale-[1.02]' 
                : 'bg-white/5 text-white/20 cursor-not-allowed'
              }`}
            >
              Check My Risk <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 opacity-40 text-[10px] font-mono font-bold uppercase tracking-widest"
          >
            <div>NO CREDIT CARD REQUIRED</div>
            <div>STRICTLY CONFIDENTIAL</div>
            <div>CITING WEF 2025 DATA</div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
