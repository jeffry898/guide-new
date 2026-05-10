'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import Navbar from '@/components/Navbar';
import { Profession } from '@/lib/constants';
import { getProfessions } from '@/lib/professions-api';
import { BookOpen, Sparkles, ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import { createClientComponentClient } from '@/lib/supabase';

export default function Dashboard() {
  const [professions, setProfessions] = useState<Profession[]>([]);
  const [guides, setGuides] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        // Fetch All Professions for mapping and upsells
        const profs = await getProfessions();
        setProfessions(profs);

        if (user) {
          // Fetch Purchased Guides for the user
          // Note: In this environment, we fetch guides and then join manually or use professions list if direct relation is tricky
          const { data, error } = await supabase
            .from('guides')
            .select('*')
            .eq('user_email', user.email)
            .order('created_at', { ascending: false });
          
          if (error) throw error;
          setGuides(data || []);
        }
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [supabase]);

  return (
    <div className="min-h-screen bg-brand-background text-brand-light">
      <Navbar />
      
      <main className="pt-32 px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          <header className="mb-20">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl font-serif font-black mb-4 uppercase tracking-tighter"
            >
              My <span className="text-brand-gold">Survival</span> Vault
            </motion.h1>
            <p className="text-brand-light/60 font-light text-xl max-w-2xl font-sans">
              Access your activated AI survival protocols and business transformation blueprints.
            </p>
          </header>

          {/* Purchased Guides Section */}
          <section className="mb-32">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-2xl font-black uppercase tracking-widest flex items-center gap-4">
                <BookOpen className="w-6 h-6 text-brand-gold" /> ACTIVATED SYSTEMS
              </h2>
            </div>
            
            {loading ? (
              <div className="py-20 flex justify-center">
                <div className="w-12 h-12 border-4 border-brand-gold/20 border-t-brand-gold rounded-full animate-spin" />
              </div>
            ) : guides.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {guides.map((guide, i) => {
                  const prof = professions.find(p => p.slug === guide.profession_slug);
                  return (
                    <motion.div
                      key={guide.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="group relative p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-brand-gold/50 transition-all flex flex-col justify-between h-[400px] overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 transition-opacity">
                        <ShieldCheck className="w-8 h-8 text-brand-gold" />
                      </div>

                      <div>
                        <span className="inline-block px-3 py-1 rounded-full bg-brand-gold/10 text-brand-gold text-[10px] font-bold uppercase tracking-widest mb-6 border border-brand-gold/20">
                          Verified Protocol
                        </span>
                        <h3 className="text-3xl font-black mb-2 tracking-tight group-hover:text-brand-gold transition-colors">
                          {prof?.name || guide.profession_slug.replace(/-/g, ' ')}
                        </h3>
                        {prof && (
                          <p className="text-sm text-white/40 font-mono mb-4 italic">
                            &ldquo;{prof.short_title}&rdquo;
                          </p>
                        )}
                        <div className="flex items-center gap-2 text-xs text-white/30 font-medium">
                          <Clock className="w-3 h-3" /> 
                          Purchased {new Date(guide.created_at).toLocaleDateString(undefined, { 
                            month: 'long', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <Link href={`/guide/${guide.onboarding_hash}`}>
                          <button className="w-full py-4 bg-brand-gold text-brand-background rounded-xl font-bold uppercase text-xs tracking-widest flex items-center justify-center gap-2 hover:bg-white transition-all transform group-active:scale-95 shadow-xl shadow-brand-gold/5">
                            VIEW GUIDE <ArrowRight className="w-4 h-4" />
                          </button>
                        </Link>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-32 text-center rounded-3xl bg-white/[0.02] border border-dashed border-white/10"
              >
                <div className="max-w-md mx-auto px-6 text-center">
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                    <BookOpen className="w-8 h-8 text-white/20" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">No Protocols Activated</h3>
                  <p className="text-white/40 mb-10 leading-relaxed">
                    You haven&apos;t secured your professional future yet. Your risk exposure remains unmitigated.
                  </p>
                  <Link href="/risk-report">
                    <button className="px-10 py-4 bg-brand-gold text-brand-background rounded-full font-black uppercase text-xs tracking-widest hover:scale-105 transition-transform flex items-center gap-3 mx-auto">
                      Generate Risk Report <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>
                </div>
              </motion.div>
            )}
          </section>

          {/* Upsells Section */}
          <section className="pt-20 border-t border-white/5">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-2xl font-black uppercase tracking-widest flex items-center gap-4">
                <Sparkles className="w-6 h-6 text-brand-gold" /> EXPAND YOUR DEFENSES
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {!loading && professions
                .filter(p => !guides.some(g => g.profession_slug === p.slug))
                .slice(0, 4)
                .map((p, i) => (
                  <Link key={p.id} href={`/product/${p.slug}`} className="group">
                    <motion.div
                      whileHover={{ y: -5 }}
                      className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 group-hover:border-brand-gold/30 transition-all h-full flex flex-col justify-between"
                    >
                      <div>
                        <h4 className="text-lg font-bold mb-2 group-hover:text-brand-gold transition-colors">{p.name}</h4>
                        <p className="text-[10px] uppercase font-mono text-white/30 tracking-widest mb-4">
                          {p.short_title}
                        </p>
                      </div>
                      <div className="flex justify-between items-center mt-6">
                        <span className="text-sm font-black text-brand-gold tracking-tight font-mono">£{p.price}</span>
                        <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-brand-gold group-hover:border-brand-gold transition-all">
                          <ArrowRight className="w-4 h-4 text-white group-hover:text-brand-background" />
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
