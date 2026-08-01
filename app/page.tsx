'use client';

import { motion } from 'motion/react';
import Navbar from '@/components/Navbar';
import ProfessionCard from '@/components/ProfessionCard';
import { Profession } from '@/lib/constants';
import { getProfessions } from '@/lib/professions-api';
import { ShieldCheck, Zap, TrendingUp, ArrowRight, ShieldAlert, Loader2, Calculator, Sparkles, Award, Lock, CheckCircle2, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [professions, setProfessions] = useState<Profession[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  // Interactive ROI Calculator State
  const [hourlyRate, setHourlyRate] = useState<number>(45);
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(15);

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

  const weeklySaved = Math.round(hoursPerWeek * 0.7); // 70% reduction in admin tasks
  const annualSavings = weeklySaved * hourlyRate * 52;

  const categories = ['ALL', 'HIGH RISK (60%+)', 'CREATIVE & TECH', 'MEDICAL & LEGAL', 'SERVICES & RETAIL'];

  const filteredProfessions = professions.filter((p) => {
    if (selectedCategory === 'HIGH RISK (60%+)') return (p.automation_risk || 0) >= 60;
    if (selectedCategory === 'CREATIVE & TECH') return ['freelance-designer', 'copywriter', 'social-media-manager', 'photographer', 'marketing-manager'].includes(p.slug);
    if (selectedCategory === 'MEDICAL & LEGAL') return ['dentist', 'nurse', 'lawyer', 'accountant'].includes(p.slug);
    if (selectedCategory === 'SERVICES & RETAIL') return ['hair-salon', 'restaurant-owner', 'hotel-owner', 'florist', 'plumber', 'electrician', 'chef', 'real-estate-agent', 'personal-trainer', 'virtual-assistant'].includes(p.slug);
    return true;
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#060A14] text-[#F8F6F0] selection:bg-[#C9A84C] selection:text-[#060A14]">
      <Navbar />
      
      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden px-6 py-20">
          {/* Background Grid Pattern */}
          <div className="absolute inset-0 z-0 opacity-[0.04]" 
            style={{ 
              backgroundImage: `linear-gradient(#C9A84C 1px, transparent 1px), linear-gradient(90deg, #C9A84C 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }} 
          />
          
          {/* Radial Ambient Glow */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#C9A84C]/10 blur-[150px] rounded-full" />
            <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#DC2626]/10 blur-[120px] rounded-full" />
          </div>

          <div className="max-w-6xl mx-auto w-full relative z-10 text-center">
            {/* Top Security Pill */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center mb-8"
            >
              <div className="px-5 py-2 bg-[#0A0F1E] border border-[#C9A84C]/40 rounded-full flex items-center gap-3 shadow-[0_0_25px_rgba(201,168,76,0.15)]">
                <span className="w-2 h-2 rounded-full bg-[#C9A84C] animate-ping" />
                <span className="text-xs font-mono font-bold text-[#C9A84C] uppercase tracking-[0.25em]">
                  GENIUZLAB INTELLIGENCE ENGINE // USA · UK · EU EDITION
                </span>
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-[#F8F6F0] leading-[1.05] tracking-tight mb-8 max-w-5xl mx-auto">
                Will AI Replace You? <br />
                <span className="text-[#C9A84C] drop-shadow-[0_0_20px_rgba(201,168,76,0.2)]">Get Your AI Survival Protocol</span>
              </h1>
              
              <p className="text-lg md:text-2xl text-gray-300 font-light mb-12 leading-relaxed max-w-3xl mx-auto">
                Don&apos;t get disrupted by autonomous AI agents. Master the specialized systems, prompt architectures, and tools that turn your career into a high-income fortress.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-16">
                <Link href="/risk-report" className="w-full sm:w-auto">
                  <motion.button 
                    whileHover={{ scale: 1.04, boxShadow: "0 0 40px rgba(201,168,76,0.4)" }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full sm:w-auto bg-[#C9A84C] hover:bg-[#E6C875] text-[#060A14] px-10 py-5 rounded-lg text-lg font-black flex items-center justify-center gap-3 uppercase tracking-widest shadow-2xl transition-all"
                  >
                    <span>Get Free Risk Report</span>
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>
                
                <Link href="#explore" className="w-full sm:w-auto">
                  <motion.button 
                    whileHover={{ scale: 1.04, backgroundColor: "rgba(201,168,76,0.1)" }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full sm:w-auto border border-[#C9A84C]/40 text-[#F8F6F0] hover:border-[#C9A84C] px-10 py-5 rounded-lg text-lg font-bold uppercase tracking-widest transition-all"
                  >
                    Explore 20 Protocols
                  </motion.button>
                </Link>
              </div>

              {/* Quick Trust Checklist */}
              <div className="flex flex-wrap justify-center items-center gap-8 text-xs font-mono text-gray-400">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A84C]" /> Instant 8K Digital Guide Access
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A84C]" /> Industry-Specific ChatGPT Prompts
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A84C]" /> 99.9% Gross Value Guaranteed
                </span>
              </div>
            </motion.div>
          </div>

          {/* Scrolling System Ticker */}
          <div className="absolute bottom-0 w-full overflow-hidden border-t border-[#C9A84C]/20 py-4 bg-[#060A14]/80 backdrop-blur-xl">
            <div className="flex whitespace-nowrap animate-ticker">
              {(professions.length > 0 ? [...professions, ...professions] : []).map((p, i) => (
                <div key={i} className="flex items-center gap-8 px-8">
                  <span className="text-[10px] font-mono font-bold text-[#C9A84C] uppercase tracking-widest">
                    ⚡ {p.name}: {p.automation_risk}% RISK
                  </span>
                  <span className="text-[10px] font-mono text-gray-500 uppercase">
                    PROTOCOL READY
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]/40" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive ROI Calculator Section */}
        <section className="py-24 px-6 border-y border-[#C9A84C]/20 bg-[#0A0F1E]/80 relative overflow-hidden">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#C9A84C]/10 border border-[#C9A84C]/30 rounded text-[10px] font-mono font-bold text-[#C9A84C] uppercase tracking-widest">
                <Calculator className="w-3.5 h-3.5" /> Interactive ROI Calculator
              </div>
              
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#F8F6F0] leading-tight">
                Calculate How Much Time & Revenue You Gain With AI
              </h2>

              <p className="text-gray-300 text-sm leading-relaxed font-light">
                By deploying specialized AI prompt protocols and free tools, professionals eliminate up to 70% of manual repetitive tasks within 30 days.
              </p>

              <div className="space-y-6 pt-4">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-2">
                    <span className="text-gray-400">YOUR HOURLY RATE OR VALUE:</span>
                    <span className="text-[#C9A84C] font-bold">£{hourlyRate} / hr</span>
                  </div>
                  <input 
                    type="range" 
                    min="20" 
                    max="250" 
                    step="5"
                    value={hourlyRate} 
                    onChange={(e) => setHourlyRate(Number(e.target.value))}
                    className="w-full accent-[#C9A84C] bg-gray-800 h-2 rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-2">
                    <span className="text-gray-400">WEEKLY ADMIN & REPETITIVE HOURS:</span>
                    <span className="text-[#C9A84C] font-bold">{hoursPerWeek} hrs / week</span>
                  </div>
                  <input 
                    type="range" 
                    min="5" 
                    max="40" 
                    step="1"
                    value={hoursPerWeek} 
                    onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                    className="w-full accent-[#C9A84C] bg-gray-800 h-2 rounded-lg cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* ROI Results Card */}
            <div className="lg:col-span-6 bg-[#060A14] border border-[#C9A84C]/40 rounded-2xl p-8 shadow-[0_0_50px_rgba(201,168,76,0.15)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9A84C]/10 blur-3xl rounded-full" />
              
              <div className="text-center space-y-6 relative z-10">
                <span className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest">
                  YOUR ESTIMATED ANNUAL AI RECOVERY VALUE
                </span>

                <div className="text-5xl md:text-6xl font-serif font-extrabold text-[#C9A84C]">
                  £{annualSavings.toLocaleString()} <span className="text-lg text-gray-400 font-mono font-normal">/ year</span>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10 text-left">
                  <div className="bg-[#0A0F1E] p-4 rounded-lg border border-[#C9A84C]/20">
                    <span className="text-[10px] font-mono text-gray-400 block uppercase">Hours Saved Weekly</span>
                    <span className="text-2xl font-bold font-serif text-[#F8F6F0]">{weeklySaved} Hours</span>
                  </div>

                  <div className="bg-[#0A0F1E] p-4 rounded-lg border border-[#C9A84C]/20">
                    <span className="text-[10px] font-mono text-gray-400 block uppercase">Blueprint Investment</span>
                    <span className="text-2xl font-bold font-serif text-[#C9A84C]">From £29</span>
                  </div>
                </div>

                <Link href="/risk-report" className="block pt-4">
                  <button className="w-full bg-[#C9A84C] hover:bg-[#E6C875] text-[#060A14] py-4 rounded-lg font-mono font-black text-sm uppercase tracking-widest shadow-xl transition-all flex items-center justify-center gap-2">
                    Claim Your Custom Protocol <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 8K Guide Cover Marketplace Grid */}
        <section id="explore" className="py-28 px-6 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#C9A84C]/10 border border-[#C9A84C]/30 rounded text-[10px] font-mono font-bold text-[#C9A84C] uppercase tracking-widest">
              <Award className="w-3.5 h-3.5" /> 2026 SURVIVAL PROTOCOL CATALOG
            </div>
            
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#F8F6F0]">
              Select Your Profession For Immediate Deployment
            </h2>

            <p className="text-gray-400 text-sm font-light">
              Each protocol contains 8K visual guides, step-by-step 4-week roadmaps, ChatGPT/Claude prompt libraries, and free tool stacks tailored to your exact industry.
            </p>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap justify-center gap-2 pt-6">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-mono font-bold tracking-wider transition-all border ${
                    selectedCategory === cat
                      ? 'bg-[#C9A84C] text-[#060A14] border-[#C9A84C] shadow-[0_0_15px_rgba(201,168,76,0.3)]'
                      : 'bg-[#0A0F1E] text-gray-300 border-white/10 hover:border-[#C9A84C]/50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
              <Loader2 className="w-10 h-10 text-[#C9A84C] animate-spin" />
              <span className="text-xs font-mono text-[#C9A84C] uppercase tracking-widest">Loading Intelligence Database...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProfessions.map((prof) => (
                <ProfessionCard key={prof.id || prof.slug} profession={prof} />
              ))}
            </div>
          )}
        </section>

        {/* Global Intelligence Sources */}
        <section className="py-20 px-6 border-t border-[#C9A84C]/20 bg-[#0A0F1E]">
          <div className="max-w-6xl mx-auto text-center space-y-10">
            <h3 className="text-xs font-mono text-gray-500 uppercase tracking-[0.4em] font-bold">
              INTELLIGENCE & DATA SOURCES
            </h3>
            
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60">
              {['WORLD ECONOMIC FORUM', 'MCKINSEY & COMPANY', 'OXFORD UNIVERSITY', 'MIT MEDIA LAB', 'HARVARD BUSINESS REVIEW'].map((source) => (
                <span key={source} className="text-sm md:text-base font-serif font-bold text-[#F8F6F0] uppercase tracking-widest hover:text-[#C9A84C] transition-colors cursor-default">
                  {source}
                </span>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-[#C9A84C]/20 bg-[#060A14] text-xs font-mono text-gray-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-base font-serif font-bold text-[#F8F6F0] tracking-widest">
              GUIDR<span className="text-[#C9A84C]">.EMPIRE</span>
            </span>
            <span className="text-[9px] text-gray-500 uppercase tracking-widest">
              BY GENIUZLAB INTELLIGENCE ENGINE · USA · UK · EUROPE · SRI LANKA
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/risk-report" className="hover:text-[#C9A84C] transition-colors">Free Risk Assessment</Link>
            <Link href="/dashboard" className="hover:text-[#C9A84C] transition-colors">Purchased Vault</Link>
            <Link href="/login" className="hover:text-[#C9A84C] transition-colors">Client Login</Link>
          </div>

          <p className="text-[10px] text-gray-600">
            © 2026 GENIUZLAB INC. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>
    </div>
  );
}
