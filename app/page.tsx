'use client';

import { motion } from 'motion/react';
import Navbar from '@/components/Navbar';
import ProfessionCard from '@/components/ProfessionCard';
import LeadCaptureModal from '@/components/LeadCaptureModal';
import { Profession } from '@/lib/constants';
import { getProfessions } from '@/lib/professions-api';
import { ShieldCheck, Zap, TrendingUp, ArrowRight, ShieldAlert, Loader2, Calculator, Sparkles, Award, Lock, CheckCircle2, ChevronDown, Layers, Search, Grid } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [professions, setProfessions] = useState<Profession[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.slug.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    if (selectedCategory === 'HIGH RISK (60%+)') return (p.automation_risk || 0) >= 60;
    if (selectedCategory === 'CREATIVE & TECH') return ['freelance-designer', 'copywriter', 'social-media-manager', 'photographer', 'marketing-manager', 'graphic-designer', 'software-engineer', 'data-scientist'].includes(p.slug);
    if (selectedCategory === 'MEDICAL & LEGAL') return ['dentist', 'nurse', 'lawyer', 'accountant', 'paralegal', 'financial-analyst'].includes(p.slug);
    if (selectedCategory === 'SERVICES & RETAIL') return ['hair-salon', 'restaurant-owner', 'hotel-owner', 'florist', 'plumber', 'electrician', 'chef', 'real-estate-agent', 'personal-trainer', 'virtual-assistant', 'hr-manager', 'executive-assistant'].includes(p.slug);
    return true;
  });

  // Limit homepage view to top 12 for speed optimization
  const displayedProfessions = searchQuery ? filteredProfessions : filteredProfessions.slice(0, 12);

  return (
    <div className="flex flex-col min-h-screen bg-[#060A14] text-[#F8F6F0] selection:bg-[#C9A84C] selection:text-[#060A14]">
      <Navbar />
      
      {/* Lead Capture Exit-Intent / Button Modal */}
      <LeadCaptureModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        professions={professions} 
      />

      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="relative min-h-[92vh] flex flex-col items-center justify-center overflow-hidden px-6 py-20">
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
                  GENIUZLAB INTELLIGENCE ENGINE // 50+ SECTORS ACTIVE
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
              
              <p className="text-lg md:text-2xl text-gray-300 font-light mb-10 leading-relaxed max-w-3xl mx-auto">
                Don&apos;t get disrupted by autonomous AI agents. Master the specialized systems, prompt architectures, and tools that turn your career into a high-income fortress.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-12">
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="w-full sm:w-auto bg-[#C9A84C] hover:bg-[#E6C875] text-[#060A14] px-10 py-5 rounded-lg text-lg font-black flex items-center justify-center gap-3 uppercase tracking-widest shadow-2xl transition-all cursor-pointer hover:scale-[1.03]"
                >
                  <span>Get Free Risk Report</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <Link href="/directory" className="w-full sm:w-auto">
                  <motion.button 
                    whileHover={{ scale: 1.04, backgroundColor: "rgba(201,168,76,0.1)" }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full sm:w-auto border border-[#C9A84C]/40 text-[#F8F6F0] hover:border-[#C9A84C] px-10 py-5 rounded-lg text-lg font-bold uppercase tracking-widest transition-all cursor-pointer"
                  >
                    Browse All 50+ Directory
                  </motion.button>
                </Link>
              </div>

              {/* 8K AI Engine Feature Display Showcase */}
              <div className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden border-2 border-[#C9A84C]/40 shadow-[0_30px_90px_rgba(0,0,0,0.9),0_0_50px_rgba(201,168,76,0.25)] group mb-10">
                <img 
                  src="/images/hero_ai_engine.jpg" 
                  alt="GeniuzLab 8K AI Engine Core" 
                  className="w-full h-[280px] sm:h-[360px] object-cover object-center group-hover:scale-105 transition-transform duration-700 filter contrast-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060A14] via-transparent to-black/30 opacity-70" />
                
                {/* Floating Glassmorphic Overlay Badge */}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 bg-[#0A0F1E]/80 backdrop-blur-md border border-[#C9A84C]/40 p-4 rounded-xl flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-mono font-bold text-[#F8F6F0] tracking-wider uppercase">
                      GENIUZLAB ENGINE v2.4 OPERATIONAL
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#C9A84C] font-bold tracking-widest uppercase">
                    50 SECTORS ACTIVE · 99.9% ACCURACY
                  </span>
                </div>
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

        {/* Interactive ROI Calculator & 8K Analytics Section */}
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

            {/* ROI Results Card & 8K Analytics Display */}
            <div className="lg:col-span-6 bg-[#060A14] border border-[#C9A84C]/40 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(201,168,76,0.15)] relative">
              <div className="relative h-[180px] overflow-hidden border-b border-[#C9A84C]/20">
                <img 
                  src="/images/roi_dashboard.jpg" 
                  alt="8K Analytics Dashboard" 
                  className="w-full h-full object-cover filter contrast-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060A14] via-transparent to-black/30" />
                <div className="absolute top-4 left-4 bg-[#0A0F1E]/80 backdrop-blur-md px-3 py-1 rounded text-[10px] font-mono font-bold text-[#C9A84C] border border-[#C9A84C]/30">
                  REAL-TIME AUTOMATION ANALYTICS
                </div>
              </div>
              
              <div className="p-8 text-center space-y-6">
                <span className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest block">
                  YOUR ESTIMATED ANNUAL AI RECOVERY VALUE
                </span>

                <div className="text-5xl md:text-6xl font-serif font-extrabold text-[#C9A84C]">
                  £{annualSavings.toLocaleString()} <span className="text-lg text-gray-400 font-mono font-normal">/ year</span>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10 text-left">
                  <div className="bg-[#0A0F1E] p-4 rounded-lg border border-[#C9A84C]/20">
                    <span className="text-[10px] font-mono text-gray-400 block uppercase">Hours Saved Weekly</span>
                    <span className="text-2xl font-bold font-serif text-[#F8F6F0]">{weeklySaved} Hours</span>
                  </div>

                  <div className="bg-[#0A0F1E] p-4 rounded-lg border border-[#C9A84C]/20">
                    <span className="text-[10px] font-mono text-gray-400 block uppercase">Blueprint Investment</span>
                    <span className="text-2xl font-bold font-serif text-[#C9A84C]">From £29</span>
                  </div>
                </div>

                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="w-full bg-[#C9A84C] hover:bg-[#E6C875] text-[#060A14] py-4 rounded-lg font-mono font-black text-sm uppercase tracking-widest shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02]"
                >
                  Claim Your Custom Protocol <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 8K Guide Cover Marketplace Grid */}
        <section id="explore" className="py-28 px-6 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#C9A84C]/10 border border-[#C9A84C]/30 rounded text-[10px] font-mono font-bold text-[#C9A84C] uppercase tracking-widest">
              <Award className="w-3.5 h-3.5" /> SURVIVAL PROTOCOL CATALOG
            </div>
            
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#F8F6F0]">
              Select Your Profession For Immediate Deployment
            </h2>

            <p className="text-gray-400 text-sm font-light">
              Each protocol contains 8K visual guides, step-by-step 4-week roadmaps, ChatGPT/Claude prompt libraries, and free tool stacks tailored to your exact industry.
            </p>

            {/* Instant Search Bar inside Catalog */}
            <div className="relative max-w-lg mx-auto pt-2">
              <div className="relative flex items-center">
                <Search className="absolute left-4 w-4 h-4 text-[#C9A84C]" />
                <input 
                  type="text"
                  placeholder="Filter 50+ professions (e.g. Accountant, Software Engineer)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#0A0F1E] border border-[#C9A84C]/40 rounded-xl py-3 pl-11 pr-4 text-xs font-mono text-[#F8F6F0] placeholder:text-gray-500 focus:outline-none focus:border-[#C9A84C]"
                />
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap justify-center gap-2 pt-4">
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
            <div className="space-y-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {displayedProfessions.map((prof) => (
                  <ProfessionCard key={prof.id || prof.slug} profession={prof} />
                ))}
              </div>

              {/* View All Directory Button */}
              <div className="text-center pt-6">
                <Link href="/directory">
                  <button className="px-10 py-5 bg-[#0A0F1E] border-2 border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#060A14] rounded-xl font-mono font-black text-xs uppercase tracking-widest transition-all shadow-2xl flex items-center justify-center gap-3 mx-auto cursor-pointer">
                    <Grid className="w-4 h-4" />
                    <span>View All 50+ Professions Directory</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>
          )}
        </section>

        {/* 8K Security Vault Section */}
        <section className="py-24 px-6 bg-[#0A0F1E] border-t border-[#C9A84C]/20">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 rounded-2xl overflow-hidden border-2 border-[#C9A84C]/40 shadow-2xl relative group">
              <img 
                src="/images/security_vault.jpg" 
                alt="8K Security Vault" 
                className="w-full h-[320px] object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060A14] via-transparent to-black/30" />
              <div className="absolute bottom-6 left-6 right-6 bg-[#060A14]/80 backdrop-blur-md p-4 rounded-xl border border-[#C9A84C]/30 text-xs font-mono">
                <span className="text-[#C9A84C] font-bold block uppercase">CLASSIFIED INTELLIGENCE VAULT</span>
                <span className="text-gray-400 text-[10px]">256-Bit SSL Encrypted Protocol Delivery</span>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#C9A84C]/10 border border-[#C9A84C]/30 rounded text-[10px] font-mono font-bold text-[#C9A84C] uppercase tracking-widest">
                <Lock className="w-3.5 h-3.5" /> ENTERPRISE SECURITY & PRIVACY
              </div>

              <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#F8F6F0] leading-tight">
                Institutional Grade Privacy & Proprietary Prompt Vault
              </h2>

              <p className="text-gray-300 text-sm leading-relaxed font-light">
                Your data and prompt workflows are locked inside an encrypted personal vault. We never share proprietary business blueprints with third parties.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4 text-xs font-mono text-gray-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A84C]" /> 100% Confidential
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A84C]" /> Lifetime Protocol Updates
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A84C]" /> GeniuzLab Support
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A84C]" /> Instant PDF & Web App
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Global Intelligence Sources */}
        <section className="py-16 px-6 border-t border-[#C9A84C]/20 bg-[#060A14]">
          <div className="max-w-6xl mx-auto text-center space-y-8">
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

          <div className="flex flex-wrap justify-center gap-6 text-gray-400">
            <Link href="/risk-report" className="hover:text-[#C9A84C] transition-colors">Free Risk Assessment</Link>
            <Link href="/directory" className="hover:text-[#C9A84C] transition-colors">50+ Directory</Link>
            <Link href="/privacy" className="hover:text-[#C9A84C] transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[#C9A84C] transition-colors">Terms of Service</Link>
            <Link href="/refund" className="hover:text-[#C9A84C] transition-colors">30-Day Refund Policy</Link>
            <Link href="/dashboard" className="hover:text-[#C9A84C] transition-colors">Vault Login</Link>
          </div>

          <p className="text-[10px] text-gray-600">
            © 2026 GENIUZLAB INC. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>
    </div>
  );
}
