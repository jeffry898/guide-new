'use client';

import { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import Navbar from '@/components/Navbar';
import { GuideContent } from '@/lib/constants';
import { getProfessions } from '@/lib/professions-api';
import { createClientComponentClient } from '@/lib/supabase';
import { 
  BarChart3, 
  Calculator, 
  Map as MapIcon, 
  MessageSquare, 
  ChevronRight,
  Download,
  Share2,
  TrendingUp,
  Clock,
  Shield,
  ExternalLink,
  Twitter,
  Linkedin,
  Send,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend,
  Cell
} from 'recharts';

export default function GuideClient() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const router = useRouter();
  const supabase = createClientComponentClient();
  
  const [guide, setGuide] = useState<GuideContent | null>(null);
  const [professionInfo, setProfessionInfo] = useState<any>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ROI Calculator State
  const [hoursPerWeek, setHoursPerWeek] = useState(12);
  const hourlyRate = 125; // Default professional rate

  useEffect(() => {
    const initialize = async () => {
      try {
        setError(null);
        if (!id) {
          console.log('No ID found in params');
          setLoading(false);
          setVerifying(false);
          return;
        }

        // Get auth token
        const { data: { session } } = await supabase.auth.getSession();
        const token = session?.access_token;
        
        if (!token) {
          router.push('/login');
          return;
        }

        console.log('Initializing guide view for ID:', id);
        
        // Fetch professions first (or in parallel)
        const professions = await getProfessions();

        const response = await fetch(`/api/guide/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.status === 401) {
          router.push('/login');
          return;
        }

        if (response.status === 403) {
          router.push('/');
          return;
        }

        if (!response.ok) {
           const errorData = await response.json().catch(() => ({}));
           throw new Error(errorData.error || "Protocol not found");
        }

        const guideRecord = await response.json();
        setGuide(guideRecord.content);
        setUserEmail(guideRecord.user_email);
        
        const prof = professions.find((p: any) => p.slug === guideRecord.profession_slug);
        setProfessionInfo(prof);
        
        console.log('Guide content loaded successfully');

      } catch (err: any) {
        console.error(err);
        setError(err.message || "An unexpected error occurred");
      } finally {
        setLoading(false);
        setVerifying(false);
      }
    };

    initialize();
  }, [id, supabase, router]);

  const annualSavings = useMemo(() => {
    return hoursPerWeek * hourlyRate * 52;
  }, [hoursPerWeek]);

  const guidePrice = professionInfo?.price || 49;
  const investmentRecovery = useMemo(() => {
    const weeklyValue = (hoursPerWeek * hourlyRate);
    return Math.round((weeklyValue / guidePrice) * 4); 
  }, [hoursPerWeek, guidePrice]);

  if (error) return (
    <div className="min-h-screen bg-[#0A0F1E] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 border-4 border-red-500/20 border-t-red-500 rounded-full mb-8" />
      <h2 className="text-xl font-bold text-red-500 uppercase tracking-[0.3em] font-mono mb-4">
        ACCESS DENIED // ERROR
      </h2>
      <p className="text-white/60 mb-8 max-w-md">{error}</p>
      <button 
        onClick={() => router.push('/')}
        className="px-8 py-3 bg-white/5 border border-white/10 rounded-full text-xs font-bold uppercase tracking-widest"
      >
        Return to HQ
      </button>
    </div>
  );

  if (loading || verifying || !guide) return (
    <div className="min-h-screen bg-[#0A0F1E] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-64 h-1 bg-white/10 rounded-full mb-8 overflow-hidden relative">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 bg-[#C9A84C]"
        />
      </div>
      <h2 className="text-xl font-bold text-[#C9A84C] uppercase tracking-[0.3em] font-mono animate-pulse">
        Preparing your intelligence report...
      </h2>
    </div>
  );

  const chartData = [
    {
      name: 'Admin Tasks',
      current: guide.reality_check.chart.admin_time[0],
      optimized: guide.reality_check.chart.admin_time[1],
    },
    {
      name: 'Core Work',
      current: guide.reality_check.chart.core_work[0],
      optimized: guide.reality_check.chart.core_work[1],
    },
    {
      name: 'Revenue Ops',
      current: guide.reality_check.chart.revenue_growth[0],
      optimized: guide.reality_check.chart.revenue_growth[1],
    },
  ];

  const handleShare = (platform: string) => {
    const text = guide.closing.share_text;
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const shareUrls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`
    };
    window.open(shareUrls[platform], '_blank');
  };

  const WHATSAPP_NUMBER = "1234567890"; 

  return (
    <div className="min-h-screen bg-[#0A0F1E] text-[#F8F6F0]">
      <Navbar />
      
      <main className="pt-20">
        <header className="py-32 px-6 bg-[#0A0F1E] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#C9A84C]/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4" />
          
          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="px-3 py-1 bg-[#C9A84C]/10 border border-[#C9A84C]/30 rounded-full">
                  <p className="text-[10px] font-mono font-black text-[#C9A84C] uppercase tracking-widest flex items-center gap-2">
                    <Shield className="w-3 h-3" /> SECURE PROTOCOL v2.0
                  </p>
                </div>
              </div>

              <h1 className="text-5xl md:text-8xl font-serif font-bold text-[#C9A84C] leading-[0.9] tracking-tighter mb-6 max-w-4xl">
                {guide.hero.title}
              </h1>
              
              <p className="text-xl md:text-2xl opacity-60 mb-12 max-w-2xl font-light">
                {guide.hero.subtitle || `Complete AI synchronization blueprint for modern ${professionInfo?.name || 'professionals'}.`}
              </p>

              <div className="flex flex-wrap gap-12 items-center">
                <div className="flex flex-col">
                  <p className="text-xs font-mono uppercase tracking-widest opacity-40 mb-2">Primary Performance Stat</p>
                  <p className="text-4xl font-black text-[#C9A84C]">{guide.hero.stat}</p>
                  <p className="text-[10px] font-mono opacity-30 mt-1">Source: {guide.hero.stat_source}</p>
                </div>

                <div className="h-12 w-px bg-white/10 hidden md:block" />

                <div className="flex flex-col">
                  <p className="text-xs font-mono uppercase tracking-widest opacity-40 mb-2">Recipient Access</p>
                  <p className="text-sm font-mono text-white/80 font-bold">{userEmail || 'CONFIDENTIAL USER'}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </header>

        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="max-w-4xl mb-16">
            <h2 className="text-xs font-mono text-[#C9A84C] uppercase tracking-[0.4em] font-bold mb-4">MODULE 01 // REALITY CHECK</h2>
            <h3 className="text-4xl md:text-5xl font-black mb-6">THE COST OF INERTIA</h3>
          </div>

          <div className="p-8 md:p-12 rounded-[2px] bg-[#0A0F1E] border border-[#C9A84C]/20 shadow-[0_0_50px_-12px_rgba(201,168,76,0.1)]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h4 className="text-2xl font-bold mb-4">{guide.reality_check.headline}</h4>
                <p className="text-lg opacity-60 leading-relaxed mb-8">{guide.reality_check.insight}</p>
                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg border border-white/10 mb-8">
                  <TrendingUp className="w-5 h-5 text-[#C9A84C]" />
                  <p className="text-sm">90% of your competitors will fail to automate by 2026. This chart shows your advantage.</p>
                </div>
                <p className="text-[10px] font-mono opacity-30">Citations: {guide.reality_check.chart.title} via {guide.hero.stat_source}</p>
              </div>

              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      stroke="rgba(255,255,255,0.4)" 
                      fontSize={10} 
                      tickLine={false} 
                      axisLine={false}
                      fontFamily="JetBrains Mono"
                    />
                    <YAxis 
                      stroke="rgba(255,255,255,0.4)" 
                      fontSize={10} 
                      tickLine={false} 
                      axisLine={false}
                      fontFamily="JetBrains Mono"
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0A0F1E', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '4px' }}
                      itemStyle={{ fontFamily: 'Inter', fontSize: '12px' }}
                    />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', paddingTop: '20px' }} />
                    <Bar dataKey="current" name="Current Model" fill="#C0392B" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="optimized" name="AI-Engineered" fill="#1A6B3C" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 px-6 bg-white/[0.02]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-6">
              {guide.ai_systems.slice(0, 4).map((system, i) => (
                <div key={i} className="p-8 rounded-xl bg-white/[0.03] border border-white/5 hover:border-[#C9A84C]/30 transition-all group flex flex-col h-full">
                  <div className="flex justify-between items-start mb-6">
                    <div className="text-4xl">{system.icon || '🤖'}</div>
                    <div className="px-3 py-1 bg-[#C9A84C]/10 border border-[#C9A84C]/20 rounded-full">
                      <p className="text-[10px] font-mono text-[#C9A84C] font-bold">⏱ SAVES {system.time_saved_weekly} HRS/WK</p>
                    </div>
                  </div>
                  <h4 className="text-2xl font-bold mb-4 group-hover:text-[#C9A84C] transition-colors">{system.title}</h4>
                  <p className="text-white/60 mb-8 flex-grow leading-relaxed">{system.description}</p>
                  
                  <div className="space-y-4">
                    <button 
                      onClick={() => window.open(system.free_tool_url, '_blank')}
                      className="w-full flex items-center justify-between px-4 py-3 bg-white/5 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-colors"
                    >
                      <span>Launch {system.free_tool}</span>
                      <ExternalLink className="w-3 h-3 opacity-50" />
                    </button>
                    <a 
                      href={`https://wa.me/${WHATSAPP_NUMBER}?text=I'm interested in ${encodeURIComponent(system.geniuzlab_upgrade || system.title)} for my ${professionInfo?.name || 'business'}`}
                      target="_blank"
                      className="block text-center text-[10px] font-bold text-[#C9A84C] uppercase tracking-widest hover:underline"
                    >
                      GeniuzLab builds this for you →
                    </a>
                  </div>
                </div>
              ))}
            </div>
            
            {guide.ai_systems[4] && (
              <div className="p-8 md:p-12 rounded-xl bg-[#C9A84C]/5 border border-[#C9A84C]/20 group">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  <div className="md:col-span-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="text-5xl">{guide.ai_systems[4].icon || '✨'}</div>
                      <div className="px-3 py-1 bg-[#C9A84C]/20 rounded-full">
                        <p className="text-[10px] font-mono text-[#C9A84C] font-black uppercase">Master Protocol</p>
                      </div>
                    </div>
                    <h4 className="text-3xl font-black mb-4">{guide.ai_systems[4].title}</h4>
                    <p className="text-white/70 text-lg leading-relaxed">{guide.ai_systems[4].description}</p>
                  </div>
                  <div className="md:col-span-4 space-y-4">
                    <div className="p-6 bg-white/5 rounded-xl border border-white/10 text-center">
                      <p className="text-xs uppercase tracking-widest opacity-40 mb-2 font-bold">Protocol Saving</p>
                      <p className="text-3xl font-black text-[#C9A84C]">{guide.ai_systems[4].time_saved_weekly} HRS / WK</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5">
              <h2 className="text-xs font-mono text-[#C9A84C] uppercase tracking-[0.4em] font-bold mb-4">MODULE 03 // VALUE EXTRACTION</h2>
              <h3 className="text-5xl font-black mb-6">CALCULATE YOUR ROI</h3>
              <p className="text-lg opacity-60 mb-8 leading-relaxed">
                Adjust your weekly time reclaimed to see the institutional value of this protocol. 
              </p>
              
              <div className="p-8 rounded-2xl bg-white/5 border border-white/10 space-y-10">
                <div className="space-y-6">
                  <div className="flex justify-between items-end">
                    <label className="text-xs font-bold uppercase tracking-widest opacity-50">Hours Reclaimed Weekly</label>
                    <p className="text-3xl font-black text-[#C9A84C]">{hoursPerWeek} HRS</p>
                  </div>
                  <input 
                    type="range" min="4" max="40" step="1" 
                    value={hoursPerWeek} 
                    onChange={(e) => setHoursPerWeek(parseInt(e.target.value))}
                    className="w-full appearance-none bg-white/10 h-1 rounded-full accent-[#C9A84C] cursor-pointer"
                  />
                </div>

                <div className="pt-8 border-t border-white/10">
                  <p className="text-sm opacity-60 mb-2 italic">&quot;{guide.roi.insight}&quot;</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="p-12 rounded-3xl bg-[#C9A84C] text-[#0A0F1E] flex flex-col items-center text-center">
                <p className="text-xs font-black uppercase tracking-[0.3em] mb-4">Projected Annual Revenue Increase</p>
                <p className="text-8xl md:text-9xl font-serif font-black tracking-tighter mb-8">
                  ${annualSavings.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 px-6 bg-white/[0.02]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-xs font-mono text-[#C9A84C] uppercase tracking-[0.4em] font-bold mb-4">MODULE 04 // THE ACTIVATION</h2>
              <h3 className="text-5xl font-black">30-DAY SYNC ROADMAP</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {guide.roadmap.weeks.map((week, i) => (
                <div key={i} className="flex flex-col h-full bg-[#0A0F1E] border border-white/10 p-8 rounded-xl relative overflow-hidden group">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-10 h-10 rounded-full border border-[#C9A84C] flex items-center justify-center font-serif font-black text-[#C9A84C]">
                      {week.week}
                    </div>
                    <div>
                      <p className="text-[10px] font-mono text-[#C9A84C] font-bold uppercase tracking-widest">Phase</p>
                      <p className="text-xs font-black uppercase">{week.theme}</p>
                    </div>
                  </div>

                  <div className="space-y-4 flex-grow">
                    {week.actions.map((action, j) => (
                      <div key={j} className="flex gap-3 items-start">
                        <CheckCircle2 className="w-3 h-3 text-[#C9A84C] mt-1" />
                        <p className="text-sm opacity-60 leading-snug">{action}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-32 px-6 bg-[#1E3A5F]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-end mb-20">
              <div className="lg:col-span-8">
                <h2 className="text-xs font-mono text-[#C9A84C] uppercase tracking-[0.4em] font-bold mb-4">SYNC PARTNERSHIP</h2>
                <h3 className="text-5xl md:text-6xl font-serif font-bold leading-tight max-w-2xl">{guide.geniuzlab.headline}</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {guide.geniuzlab.services.map((service, i) => (
                <div key={i} className="p-10 rounded-2xl bg-[#0A0F1E]/40 border border-white/10 backdrop-blur-sm">
                  <div className="text-5xl mb-6">{service.icon}</div>
                  <h4 className="text-xl font-bold mb-4">{service.name}</h4>
                  <p className="text-sm opacity-70 leading-relaxed">{service.description}</p>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button
                onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=I'm interested in building custom AI systems.`, '_blank')}
                className="px-12 py-6 bg-[#C9A84C] text-[#0A0F1E] text-xl font-black uppercase tracking-[0.2em] rounded-[2px]"
              >
                {guide.geniuzlab.cta}
              </button>
            </div>
          </div>
        </section>

        <footer className="py-32 px-6 border-t border-white/10 text-center">
          <div className="max-w-3xl mx-auto">
            <h4 className="text-2xl md:text-4xl font-serif italic mb-12 opacity-80 leading-tight">
              &quot;{guide.closing.statement}&quot;
            </h4>
            
            <div className="flex flex-wrap justify-center gap-4 mb-20">
              <button onClick={() => handleShare('twitter')} className="p-4 rounded-full bg-white/5 border border-white/10">
                <Twitter className="w-5 h-5 opacity-40" />
              </button>
              <button onClick={() => handleShare('linkedin')} className="p-4 rounded-full bg-white/5 border border-white/10">
                <Linkedin className="w-5 h-5 opacity-40" />
              </button>
              <button onClick={() => window.print()} className="flex items-center gap-3 px-8 py-4 rounded-full bg-white/5 border border-white/10">
                <Download className="w-5 h-5 opacity-40" />
                <span className="text-xs font-bold uppercase tracking-widest">Download PDF Report</span>
              </button>
            </div>

            <button 
              onClick={() => router.push('/')}
              className="text-lg font-black text-[#C9A84C] uppercase tracking-widest hover:tracking-[0.3em] transition-all flex items-center gap-4 mx-auto"
            >
              Browse more guides <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
}
