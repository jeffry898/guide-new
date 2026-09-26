'use client';

import { motion } from 'motion/react';
import Navbar from '@/components/Navbar';
import ProfessionCard from '@/components/ProfessionCard';
import { Profession } from '@/lib/constants';
import { getProfessions } from '@/lib/professions-api';
import { ShieldCheck, Zap, TrendingUp, ArrowRight, ChevronRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [professions, setProfessions] = useState<Profession[]>([]);
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

  return (
    <div className="flex flex-col min-h-screen bg-[#0A0F1E]">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden px-6">
          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 z-0 opacity-[0.03]" 
            style={{ 
              backgroundImage: `repeating-linear-gradient(0deg, #F8F6F0 0px, #F8F6F0 1px, transparent 1px, transparent 40px),
                               repeating-linear-gradient(90deg, #F8F6F0 0px, #F8F6F0 1px, transparent 1px, transparent 40px)` 
            }} 
          />
          
          <div className="absolute inset-0 z-0">
            <div className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] bg-[#C9A84C]/5 blur-[120px] rounded-full" />
            <div className="absolute bottom-1/4 -right-1/4 w-[800px] h-[800px] bg-[#C9A84C]/5 blur-[120px] rounded-full" />
          </div>

          <div className="max-w-7xl mx-auto w-full relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="flex justify-center mb-8"
            >
              <div className="px-6 py-2 bg-[#C9A84C]/10 border border-[#C9A84C]/30 rounded-full flex items-center gap-3 backdrop-blur-md shadow-[0_0_20px_rgba(201,168,76,0.1)]">
                <div className="w-2 h-2 rounded-full bg-[#C9A84C] animate-pulse" />
                <span className="text-[10px] font-mono font-black text-[#C9A84C] uppercase tracking-[0.3em]">
                  GeniuzLab Intelligence Engine
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <h1 className="text-6xl md:text-[80px] font-serif font-bold text-[#F8F6F0] leading-[0.9] tracking-tighter mb-8 max-w-5xl mx-auto">
                Your Profession&apos;s <br />
                <span className="text-[#C9A84C]">AI Survival Blueprint</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-[#F8F6F0]/60 font-light mb-16 leading-relaxed max-w-2xl mx-auto">
                Join 2,400+ professionals who chose to <span className="text-[#F8F6F0] font-medium">thrive</span> — not be replaced by autonomous agents.
              </p>

              <div className="flex flex-wrap gap-8 justify-center items-center">
                <Link href="/risk-report">
                  <motion.button 
                    whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(201,168,76,0.3)" }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-[#C9A84C] text-[#0A0F1E] px-12 py-5 rounded-[2px] text-lg font-black flex items-center gap-4 uppercase tracking-[0.2em] shadow-2xl transition-all"
                  >
                    Get Your Free Risk Report <ArrowRight className="w-6 h-6" />
                  </motion.button>
                </Link>
                
                <Link href="#explore">
                  <motion.button 
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(248, 246, 240, 0.05)" }}
                    whileTap={{ scale: 0.98 }}
                    className="border border-[#F8F6F0]/20 text-[#F8F6F0] px-12 py-5 rounded-[2px] text-lg font-black uppercase tracking-[0.2em] transition-all"
                  >
                    Browse All Guides
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Scrolling Ticker */}
          <div className="absolute bottom-0 w-full overflow-hidden border-t border-[#F8F6F0]/10 py-6 bg-[#0A0F1E]/50 backdrop-blur-xl">
            <div className="flex whitespace-nowrap animate-ticker">
              {(professions.length > 0 ? [...professions, ...professions] : []).map((p, i) => (
                <div key={i} className="flex items-center gap-12 px-12">
                   <span className="text-[10px] font-mono font-black text-[#F8F6F0]/30 uppercase tracking-[0.4em]">{p.name} SYSTEM ACTIVATED</span>
                   <div className="w-2 h-2 rounded-full bg-[#C9A84C]/40" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="bg-[#0A0F1E] border-y border-[#F8F6F0]/10">
          <div className="max-w-7xl mx-auto px-6 py-12 flex flex-wrap justify-between items-center gap-12">
            <div className="flex flex-col">
              <span className="text-4xl font-serif font-black text-[#C9A84C] mb-2">73%</span>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#F8F6F0]/40">Average displacement risk</span>
            </div>
            <div className="flex flex-col">
              <span className="text-4xl font-serif font-black text-[#C9A84C] mb-2">£47</span>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#F8F6F0]/40">Less than one client session</span>
            </div>
            <div className="flex flex-col">
              <span className="text-4xl font-serif font-black text-[#C9A84C] mb-2">2,400+</span>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#F8F6F0]/40">Professionals guided</span>
            </div>
          </div>
        </section>

        {/* Profession Grid */}
        <section id="explore" className="py-40 px-6 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-12">
            <div className="max-w-2xl">
              <h2 className="text-xs font-mono text-[#C9A84C] uppercase tracking-[0.4em] font-bold mb-6">INTELLIGENCE LIBRARY // 2026</h2>
              <h3 className="text-4xl md:text-5xl font-black text-[#F8F6F0] leading-tight">CHOOSE YOUR SECTOR FOR IMMEDIATE RECALIBRATION.</h3>
            </div>
            <div className="flex items-center gap-6">
              <div className="h-px w-24 bg-[#C9A84C]/30" />
              <span className="text-[11px] font-mono text-[#C9A84C] font-bold uppercase tracking-widest">v2.1 STABLE</span>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-12 h-12 text-[#C9A84C] animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {professions.map((prof) => (
                <ProfessionCard key={prof.id} profession={prof} />
              ))}
            </div>
          )}
        </section>

        {/* Trust Section */}
        <section className="py-40 px-6 border-t border-[#F8F6F0]/10 bg-white/[0.01]">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-[10px] font-mono text-[#F8F6F0]/40 uppercase tracking-[0.5em] font-black mb-20">INTELLIGENCE SOURCED FROM</h2>
            <div className="flex flex-wrap justify-center items-center gap-16 md:gap-32">
              {['WEF', 'MCKINSEY', 'OXFORD UNIVERSITY', 'MIT', 'WORLD BANK'].map((logo) => (
                <span key={logo} className="text-xl md:text-2xl font-serif font-bold text-[#F8F6F0]/20 hover:text-[#C9A84C]/50 transition-colors uppercase tracking-widest cursor-default">
                  {logo}
                </span>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="py-32 px-6 border-t border-[#F8F6F0]/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-20">
          <div className="md:col-span-4">
            <Link href="/" className="inline-block mb-8">
              <span className="text-3xl font-serif font-black text-[#C9A84C] tracking-tighter uppercase">GUIDR</span>
              <span className="text-[10px] font-mono font-bold text-[#F8F6F0] ml-2 tracking-widest uppercase">Empire</span>
            </Link>
            <p className="text-[#F8F6F0]/40 text-sm leading-relaxed max-w-xs mb-12">
              The world&apos;s leading intelligence platform for AI professional transformation.
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full border border-[#F8F6F0]/10 flex items-center justify-center hover:bg-[#C9A84C] hover:text-[#0A0F1E] transition-all cursor-pointer">
                <span className="text-[10px] font-mono font-bold">X</span>
              </div>
              <div className="w-10 h-10 rounded-full border border-[#F8F6F0]/10 flex items-center justify-center hover:bg-[#C9A84C] hover:text-[#0A0F1E] transition-all cursor-pointer">
                <span className="text-[10px] font-mono font-bold">LI</span>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-8 grid grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="flex flex-col gap-6">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#C9A84C]">Protocols</span>
              <Link href="#" className="text-sm text-[#F8F6F0]/50 hover:text-[#C9A84C] transition-colors">Business Intelligence</Link>
              <Link href="#" className="text-sm text-[#F8F6F0]/50 hover:text-[#C9A84C] transition-colors">Creative Engineering</Link>
              <Link href="#" className="text-sm text-[#F8F6F0]/50 hover:text-[#C9A84C] transition-colors">Technical Synthesis</Link>
            </div>
            <div className="flex flex-col gap-6">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#C9A84C]">GeniuzLab</span>
              <Link href="#" className="text-sm text-[#F8F6F0]/50 hover:text-[#C9A84C] transition-colors">Aria Sales Bot</Link>
              <Link href="#" className="text-sm text-[#F8F6F0]/50 hover:text-[#C9A84C] transition-colors">SEO Mastery</Link>
              <Link href="#" className="text-sm text-[#F8F6F0]/50 hover:text-[#C9A84C] transition-colors">Custom Build</Link>
            </div>
            <div className="flex flex-col gap-6">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#C9A84C]">Legal</span>
              <Link href="#" className="text-sm text-[#F8F6F0]/50 hover:text-[#C9A84C] transition-colors">Corporate Terms</Link>
              <Link href="#" className="text-sm text-[#F8F6F0]/50 hover:text-[#C9A84C] transition-colors">Privacy Shield</Link>
              <Link href="#" className="text-sm text-[#F8F6F0]/50 hover:text-[#C9A84C] transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto pt-20 border-t border-[#F8F6F0]/5 mt-20 text-center">
          <p className="text-[#F8F6F0]/20 text-[10px] font-mono uppercase tracking-widest">© 2026 GENIUZLAB INTELLIGENCE ENGINE. ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    </div>
  );
}
