'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Navbar from '@/components/Navbar';
import { Profession } from '@/lib/constants';
import { getProfessions } from '@/lib/professions-api';
import StripeButton from '@/components/StripeButton';
import { ArrowRight, ShieldCheck, Lock, Globe, TrendingUp, Zap, Check, AlertTriangle, ShieldAlert, Loader2 } from 'lucide-react';
import Link from 'next/link';

const GuideCover = ({ profession, slugStr }: { profession: Profession, slugStr?: string }) => {
  return (
    <div className="relative w-[400px] h-[500px] bg-[#0A0F1E] shadow-[0_50px_100px_rgba(0,0,0,0.8),0_0_1px_rgba(201,168,76,0.3)] border-[2px] border-[#C9A84C] group overflow-hidden">
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#C9A84C 1px, transparent 1px), linear-gradient(90deg, #C9A84C 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      </div>

      {/* Glossy Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-transparent pointer-events-none" />

      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#C9A84C]" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#C9A84C]" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#C9A84C]" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#C9A84C]" />

      {/* 2026 Edition Stamp */}
      <div className="absolute top-8 right-8 border border-[#C9A84C]/40 px-3 py-1 -rotate-12">
        <span className="text-[10px] font-mono font-black text-[#C9A84C] tracking-[0.2em]">2026 EDITION</span>
      </div>

      <div className="h-full flex flex-col p-10 relative z-10">
        {/* Top Header */}
        <div className="flex justify-between items-start mb-12">
          <div className="text-[10px] font-mono font-black text-[#C9A84C]/60 uppercase tracking-[0.3em]">
            CLASSIFIED // GENIUZLAB
          </div>
          <div className="w-8 h-[2px] bg-[#C9A84C]/40 mt-1" />
        </div>

        {/* Center Content */}
        <div className="flex-grow flex flex-col items-center justify-center text-center">
          <div className="text-8xl mb-10 group-hover:scale-110 transition-transform duration-500 filter drop-shadow-[0_0_15px_rgba(201,168,76,0.4)]">
            {profession.icon || (slugStr?.includes('doctor') ? '🩺' : '💼')}
          </div>
          
          <h2 className="text-4xl font-serif font-bold text-[#F8F6F0] mb-4 leading-tight">
            {profession.name}
          </h2>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[1px] w-8 bg-[#C9A84C]/40" />
            <span className="text-[11px] font-mono font-black text-[#C9A84C] uppercase tracking-[0.4em]">
              INTELLIGENCE PROTOCOL
            </span>
            <div className="h-[1px] w-8 bg-[#C9A84C]/40" />
          </div>

          <div className="inline-flex items-center gap-2 bg-red-600 px-4 py-2 rounded-[2px] shadow-[0_0_20px_rgba(220,38,38,0.3)]">
            <AlertTriangle className="w-4 h-4 text-white fill-white/20" />
            <span className="text-xs font-mono font-black text-white uppercase tracking-tighter">
              RISK LEVEL: {profession.automation_risk || 0}% DISPLACEMENT
            </span>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-auto pt-10 flex flex-col items-center">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#C9A84C]/20 to-transparent mb-6" />
          <p className="text-[12px] font-serif italic text-[#C9A84C]">
            GeniuzLab × <span className="font-bold">{profession.name}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default function ProductClient() {
  const { slug } = useParams();
  const searchParams = useSearchParams();
  const isDiscounted = searchParams.get('discount') === 'true';

  const [professions, setProfessions] = useState<Profession[]>([]);
  const [loading, setLoading] = useState(true);

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
  
  // Use deterministic "random" values based on slug
  const slugHash = slugStr ? slugStr.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) : 0;
  const viewingCount = 12 + (slugHash % 24);
  const recentSales = 142 + (slugHash % 187);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0F1E] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-[#C9A84C] animate-spin" />
      </div>
    );
  }

  if (!profession) {
    return <div className="min-h-screen bg-[#0A0F1E] flex items-center justify-center text-white">Profession not found</div>;
  }

  const price = isDiscounted ? 27 : profession.price;

  // Related professions
  const relatedProfessions = professions
    .filter(p => p.slug !== slugStr)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#0A0F1E] text-[#F8F6F0] selection:bg-[#C9A84C] selection:text-[#0A0F1E]">
      <Navbar />
      
      <main className="pt-32 pb-40 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Discount Banner */}
          {isDiscounted && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#C9A84C] text-[#0A0F1E] p-3 text-center font-black uppercase tracking-[0.4em] text-[10px] mb-12 flex items-center justify-center gap-4 border border-white/10"
            >
              <ShieldAlert className="w-5 h-5" />
              PRIORITY ACCESS GRANTED: 75% DISCOUNT APPLIED
            </motion.div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-start">
            
            {/* LEFT SIDE: Guide Cover */}
            <div className="flex justify-center lg:sticky lg:top-32">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                {/* Visual shadow glow */}
                <div className="absolute -inset-4 bg-[#C9A84C]/10 blur-[100px] rounded-full pointer-events-none" />
                
                <GuideCover profession={profession} slugStr={slugStr} />
                
                <div className="mt-12 flex items-center gap-6 opacity-40">
                  <div className="flex -space-x-3">
                    {[1,2,3,4,5].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0A0F1E] bg-[#C9A84C]/20 flex items-center justify-center overflow-hidden">
                        <img 
                          src={`https://i.pravatar.cc/100?u=${slugHash + i}`} 
                          alt="Reviewer" 
                          className="w-full h-full object-cover grayscale brightness-125"
                        />
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] font-mono font-bold uppercase tracking-widest leading-tight">
                    Verified Purchase Sector: <br />
                    Professional {profession.name}s
                  </p>
                </div>
              </motion.div>
            </div>

            {/* RIGHT SIDE: Sales Copy */}
            <div className="space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {/* Fear Badge */}
                <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-red-600/10 border border-red-600/30 rounded-sm mb-10 shadow-[0_0_30px_rgba(220,38,38,0.1)]">
                  <span className="text-[11px] font-mono font-black text-red-500 uppercase tracking-[0.2em] animate-pulse">
                    ⚠️ ALERT: {profession.automation_risk}% AI DISPLACEMENT RISK
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black text-[#C9A84C] leading-[1.1] mb-8 tracking-tight">
                  {profession.psychological_title || profession.headline}
                </h1>
                
                <p className="text-xl md:text-2xl text-[#F8F6F0]/70 font-serif italic font-light leading-relaxed mb-12 border-l-2 border-[#C9A84C]/30 pl-8">
                  {profession.fear_title || profession.subheadline}
                </p>

                {/* Price & Primary CTA */}
                <div className="bg-white/[0.03] border border-white/5 p-10 rounded-sm space-y-10">
                  <div className="flex flex-col md:flex-row md:items-end gap-6">
                    <div className="flex flex-col">
                      <span className="text-xs font-mono font-black text-[#C9A84C]/40 uppercase tracking-widest mb-1">ACCESS TOKEN PRICE</span>
                      <div className="flex items-start gap-4">
                        <span className="text-6xl md:text-7xl font-serif font-black text-[#C9A84C] tracking-tighter">
                          £{price}
                        </span>
                        {isDiscounted && (
                          <span className="text-2xl line-through text-red-500/50 font-serif mt-2">£{profession.price}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex-grow md:pb-3">
                      <div className="h-[1px] w-full bg-gradient-to-r from-[#C9A84C]/30 to-transparent" />
                    </div>
                  </div>

                  {/* Trust Signals */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-white/5">
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="w-5 h-5 text-[#C9A84C]" />
                      <span className="text-[10px] font-mono font-black uppercase tracking-widest opacity-60">Anti-Scrape Encrypted</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Globe className="w-5 h-5 text-[#C9A84C]" />
                      <span className="text-[10px] font-mono font-black uppercase tracking-widest opacity-60">Global Industry Data</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Zap className="w-5 h-5 text-[#C9A84C]" />
                      <span className="text-[10px] font-mono font-black uppercase tracking-widest opacity-60">Lifetime Updates</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <StripeButton 
                      professionSlug={profession.slug} 
                      price={price} 
                      className="w-full bg-[#C9A84C] hover:bg-[#D4B96A] text-[#0A0F1E] font-black py-6 text-base tracking-[0.2em] shadow-[0_15px_30px_rgba(201,168,76,0.2)] rounded-sm transition-all hover:scale-[1.02] uppercase flex items-center justify-center gap-3"
                      customLabel="GET INSTANT ACCESS →"
                    />
                    
                    <div className="flex items-center justify-center gap-4 opacity-30">
                      <Lock className="w-3 h-3" />
                      <span className="text-[9px] font-mono uppercase tracking-[0.3em]">SECURE SSL ENCRYPTED GATEWAY</span>
                    </div>
                  </div>
                </div>

                {/* What's Inside */}
                <div className="pt-16 space-y-10">
                  <h3 className="text-[11px] font-mono font-black text-[#C9A84C] uppercase tracking-[0.4em] flex items-center gap-4">
                    <div className="h-px flex-grow bg-gradient-to-r from-transparent to-[#C9A84C]/20" />
                    WHAT IS INSIDE THE PROTOCOL
                    <div className="h-px flex-grow bg-gradient-to-l from-transparent to-[#C9A84C]/20" />
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                    {[
                      "AI Survival Roadmap (2026-2028 Edition)",
                      "High-Value Automation Logic Workflows",
                      "Sector-Specific Prompt Libraries",
                      "Displacement Prevention Strategies",
                      "Exclusive GeniuzLab Implementation Guides"
                    ].map((benefit, i) => (
                      <div key={i} className="flex gap-4 items-start group">
                        <div className="w-6 h-6 rounded-sm bg-[#C9A84C]/10 border border-[#C9A84C]/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[#C9A84C]/30 transition-colors">
                          <Check className="w-3.5 h-3.5 text-[#C9A84C]" />
                        </div>
                        <span className="text-sm font-light text-[#F8F6F0]/80">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Blurred Preview Section */}
                <div className="relative mt-20 pt-10">
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
                    <div className="px-8 py-4 bg-[#0A0F1E]/80 border border-[#C9A84C]/40 backdrop-blur-md rounded-sm">
                      <span className="text-xs font-mono font-black text-[#C9A84C] uppercase tracking-widest">LOCKED // PROTOCOL OVERVIEW</span>
                    </div>
                  </div>
                  <div className="space-y-4 opacity-20 blur-[3px] select-none pointer-events-none">
                    <div className="h-4 w-full bg-white/10 rounded-sm" />
                    <div className="h-4 w-[90%] bg-white/10 rounded-sm" />
                    <div className="h-4 w-[95%] bg-white/10 rounded-sm" />
                    <div className="h-4 w-[60%] bg-white/10 rounded-sm" />
                    <div className="h-4 w-full bg-white/10 rounded-sm mt-8" />
                    <div className="h-4 w-[85%] bg-white/10 rounded-sm" />
                  </div>
                </div>

                {/* Social Urgency */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 py-10 border-y border-white/5 mt-20">
                  <div className="flex items-center gap-4 text-[#C9A84C]/60">
                    <TrendingUp className="w-5 h-5" />
                    <span className="text-xs font-mono font-bold uppercase tracking-widest leading-none">
                      {viewingCount} Professionals viewing this sector
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-[#C9A84C]">
                    <Zap className="w-5 h-5 fill-[#C9A84C]" />
                    <span className="text-xs font-mono font-black uppercase tracking-widest leading-none animate-pulse">
                      Urgent Delivery Protocol Active
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* GeniuzLab DFY Section */}
        <section className="mt-60 relative overflow-hidden">
          <div className="absolute inset-0 bg-[#C9A84C]/5 skew-y-3 translate-y-20 pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-6 py-40 relative z-10">
            <div className="text-center mb-24 max-w-4xl mx-auto">
              <span className="text-[11px] font-mono font-black text-[#C9A84C] uppercase tracking-[0.5em] mb-6 block">
                BEYOND THE BLUEPRINT
              </span>
              <h2 className="text-5xl md:text-6xl font-serif font-black mb-8 leading-[1.05]">
                Want the entire system <br className="hidden md:block" />
                <span className="text-[#C9A84C]">built for you in 7 days?</span>
              </h2>
              <p className="text-xl text-[#F8F6F0]/60 font-light leading-relaxed">
                The Guide gives you the roadmap. Our Done-For-You (DFY) service builds the infrastructure. 
                We deploy your custom AI content engine, high-conversion SEO systems, 
                and ARIA — your 24/7 WhatsApp AI Sales Specialist.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
              {[
                { 
                  name: "AI CONTENT FACTORY", 
                  desc: "A programmatic social engine generating 30 days of high-converting social media, blogs, and email sequences in your voice.", 
                  icon: Zap 
                },
                { 
                  name: "SEO DOMINANCE ENGINE", 
                  desc: "Technical AI-driven optimization that builds 100+ landing pages to capture every local market search intent for your niche.", 
                  icon: TrendingUp 
                },
                { 
                  name: "ARIA SALES PROTOCOL", 
                  desc: "Your custom WhatsApp AI agent that interacts with leads, answers complex industry questions, and closes bookable appointments.", 
                  icon: Globe 
                }
              ].map((service, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ y: -10 }}
                  className="p-12 border border-white/5 bg-[#0D1528] rounded-sm group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#C9A84C]/5 rounded-bl-[100px] pointer-events-none group-hover:bg-[#C9A84C]/10 transition-all" />
                  <div className="w-14 h-14 rounded-full border border-[#C9A84C]/30 flex items-center justify-center mb-10 group-hover:border-[#C9A84C] transition-all">
                    <service.icon className="w-7 h-7 text-[#C9A84C]" />
                  </div>
                  <h4 className="font-mono font-black text-sm text-[#C9A84C] uppercase tracking-[0.2em] mb-6">{service.name}</h4>
                  <p className="text-[#F8F6F0]/50 text-sm leading-relaxed">{service.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col items-center">
              <a 
                href={`https://wa.me/geniuzlab_aria?text=I%20just%20viewed%20the%20${profession.name}%20Intelligence%20Protocol%20and%20want%20to%20discuss%20a%20full%20DFY%20implementation.`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group"
              >
                <div className="relative">
                  <div className="absolute -inset-4 bg-green-500/20 blur-[40px] opacity-0 group-hover:opacity-100 transition-all rounded-full" />
                  <button className="relative bg-green-600 text-white px-16 py-6 rounded-sm font-black uppercase tracking-[0.3em] flex items-center gap-6 transition-all hover:scale-[1.03] shadow-[0_20px_40px_rgba(22,163,74,0.3)]">
                    DEPLOY VIA WHATSAPP <Zap className="w-6 h-6 fill-white" />
                  </button>
                </div>
              </a>
              <p className="mt-8 text-[11px] font-mono font-bold uppercase tracking-[0.3em] text-[#F8F6F0]/30 italic">
                Direct Intelligence Line: Instant Response
              </p>
            </div>
          </div>
        </section>

        {/* Related Professions Carousel */}
        <section className="max-w-7xl mx-auto px-6 pt-60 pb-20">
          <div className="flex items-end justify-between mb-16">
            <div className="space-y-4">
              <span className="text-[11px] font-mono font-black text-[#C9A84C]/40 uppercase tracking-[0.4em]">CROSS-SECTOR INTELLIGENCE</span>
              <h3 className="text-4xl font-serif font-black">Related Protocols</h3>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedProfessions.map((p, i) => (
              <Link key={i} href={`/product/${p.slug}`}>
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="group relative h-full bg-white/[0.02] border border-white/5 p-10 flex flex-col justify-between hover:border-[#C9A84C]/40 transition-all"
                >
                  <div className="space-y-6">
                    <div className="flex justify-between items-start">
                      <span className="text-4xl">{p.icon || '💼'}</span>
                      <span className="text-[10px] font-mono font-black text-[#C9A84C] border border-[#C9A84C]/30 px-2 py-1">RISK: {p.automation_risk}%</span>
                    </div>
                    <div>
                      <h4 className="text-2xl font-serif font-black mb-1 group-hover:text-[#C9A84C] transition-colors">{p.name}</h4>
                      <p className="text-[10px] font-mono text-[#F8F6F0]/40 uppercase tracking-widest font-bold">{p.short_title}</p>
                    </div>
                  </div>
                  <div className="mt-12 flex justify-between items-center text-sm font-black text-[#C9A84C]">
                    <span className="font-serif text-lg">£{p.price}</span>
                    <div className="flex items-center gap-2 group-hover:translate-x-2 transition-transform">
                      <span className="text-[10px] font-mono uppercase tracking-widest">Protocol Access</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

