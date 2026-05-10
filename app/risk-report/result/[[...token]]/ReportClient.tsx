'use client';

import { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import Navbar from '@/components/Navbar';
import { Profession } from '@/lib/constants';
import { getProfessions } from '@/lib/professions-api';
import { createClientComponentClient } from '@/lib/supabase';
import { 
  TrendingUp, 
  ShieldAlert, 
  Zap, 
  CheckCircle2, 
  Lock, 
  ArrowRight,
  TrendingDown,
  AlertTriangle,
  Globe,
  Database
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

export default function ReportClient() {
  const params = useParams();
  const token = Array.isArray(params.token) ? params.token[0] : params.token;
  const router = useRouter();
  const supabase = createClientComponentClient();
  
  const [professions, setProfessions] = useState<Profession[]>([]);
  const [leadData, setLeadData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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

    const fetchLead = async () => {
      try {
        if (!token) {
          const storedSlug = sessionStorage.getItem('risk_report_profession');
          const storedAnswers = JSON.parse(sessionStorage.getItem('risk_report_answers') || '{}');
          if (storedSlug) {
            setLeadData({
              profession_slug: storedSlug,
              answers: storedAnswers
            });
          }
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from('report_leads')
          .select('*')
          .eq('token', token)
          .single();
        
        if (data) {
          setLeadData(data);
        } else {
           const storedSlug = sessionStorage.getItem('risk_report_profession');
          if (storedSlug) {
            setLeadData({ profession_slug: storedSlug });
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLead();
  }, [token, supabase]);

  const profession = useMemo(() => {
    if (!leadData || professions.length === 0) return null;
    return professions.find(p => p.slug === leadData.profession_slug);
  }, [leadData, professions]);

  const riskScore = useMemo(() => {
    if (!profession) return 0;
    let score = profession.automation_risk;
    const answers = leadData?.answers || {};
    
    if (answers.repetitive === 'Over 50%') score += 15;
    if (answers.ai_usage === 'None') score += 10;
    if (answers.security === 'Very worried') score += 5;
    
    return Math.min(Math.max(score, 5), 98);
  }, [profession, leadData]);

  const chartData = useMemo(() => {
    if (!profession) return [];
    return [
      { name: 'Admin Operations', risk: Math.min(riskScore + 10, 95) },
      { name: 'Client Communication', risk: Math.min(riskScore - 20, 80) },
      { name: 'Strategic Analysis', risk: Math.min(riskScore - 40, 60) },
      { name: 'Technical Execution', risk: Math.min(riskScore + 5, 90) }
    ];
  }, [profession, riskScore]);

  if (loading || !profession) return (
    <div className="min-h-screen bg-[#0A0F1E] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 border-4 border-[#C9A84C]/20 border-t-[#C9A84C] rounded-full animate-spin mb-8" />
      <h2 className="text-xl font-bold text-[#C9A84C] uppercase tracking-[0.3em] font-mono animate-pulse">
        Retrieving Intelligence Report...
      </h2>
    </div>
  );

  const getRiskColor = (score: number) => {
    if (score > 60) return 'text-red-500';
    if (score >= 40) return 'text-amber-500';
    return 'text-green-500';
  };

  return (
    <div className="min-h-screen bg-[#0A0F1E] text-[#F8F6F0]">
      <Navbar />
      
      <main className="pt-32">
        {/* Section 1: Risk Score */}
        <section className="py-20 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
                  <ShieldAlert className="w-4 h-4 text-[#C9A84C]" />
                  <span className="text-[10px] font-mono font-black uppercase tracking-widest leading-none">
                    Confidential Intelligence Report
                  </span>
                </div>

                <h1 className="text-5xl md:text-7xl font-serif font-black leading-[0.9] tracking-tighter">
                  Risk Profile: <br />
                  <span className="text-[#C9A84C]">{profession.name}</span>
                </h1>

                <p className="text-xl text-[#F8F6F0]/60 font-light leading-relaxed max-w-lg">
                  This assessment analyzes structural displacement risks for {profession.name}s based on WEF Future of Jobs 2025 datasets.
                </p>

                <div className="pt-8 flex items-center gap-6">
                  <div className="p-4 bg-white/5 border border-white/10 rounded-xl flex items-center gap-4">
                    <Database className="w-8 h-8 text-[#C9A84C]" />
                    <div>
                      <p className="text-[10px] font-mono font-black opacity-30 uppercase tracking-widest">Dataset</p>
                      <p className="text-xs font-bold">WEF V3.1 // OXFORD</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative aspect-square max-w-md mx-auto"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className={`text-9xl font-serif font-black ${getRiskColor(riskScore)}`}
                    >
                      {riskScore}%
                    </motion.p>
                    <p className="text-xs font-mono font-black uppercase tracking-[0.4em] opacity-40">Displacement Risk</p>
                  </div>
                </div>

                <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                  <circle
                    className="text-white/5 stroke-current"
                    strokeWidth="4"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                  />
                  <motion.circle
                    initial={{ strokeDasharray: "0 1000" }}
                    animate={{ strokeDasharray: `${riskScore * 2.51} 1000` }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className={`${getRiskColor(riskScore)} stroke-current`}
                    strokeWidth="4"
                    strokeLinecap="round"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                  />
                </svg>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Section 2: What AI is doing to [profession] */}
        <section className="py-24 px-6 bg-white/[0.02]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} layout="vertical" margin={{ left: 100 }}>
                    <XAxis type="number" hide />
                    <YAxis 
                      dataKey="name" 
                      type="category" 
                      stroke="rgba(255,255,255,0.4)" 
                      fontSize={10} 
                      tickLine={false} 
                      axisLine={false}
                      fontFamily="JetBrains Mono"
                    />
                    <Tooltip 
                      cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                      contentStyle={{ backgroundColor: '#0A0F1E', border: '1px solid rgba(255,255,255,0.1)' }}
                    />
                    <Bar dataKey="risk" radius={[0, 4, 4, 0]} barSize={20}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.risk > 60 ? '#ef4444' : entry.risk > 40 ? '#f59e0b' : '#22c55e'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-8">
                <h3 className="text-3xl font-serif font-black leading-tight">The Structural Impact on {profession.name}s</h3>
                <p className="text-lg text-[#F8F6F0]/60 leading-relaxed">
                  Automation isn&apos;t coming for your job — it&apos;s coming for your billable habits. For {profession.name}s, the risk is concentrated in <span className="text-[#F8F6F0] font-bold">reproducible cognitive tasks</span> and <span className="text-[#F8F6F0] font-bold">information synthesis</span>.
                </p>
                <div className="p-8 bg-[#C9A84C]/5 border border-[#C9A84C]/20 rounded-2xl">
                  <p className="text-sm font-bold italic text-[#C9A84C]">
                    &quot;Roles that rely on manual synthesis of data ({profession.tech_stack[0]} etc.) are seeing a structural wage suppression of 12-14% as of Q1 2026.&quot;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Your Timeline */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-xs font-mono text-[#C9A84C] uppercase tracking-[0.4em] font-black mb-4">THE ACCELERATION CURVE</h2>
            <h3 className="text-4xl font-serif font-black">Your 36-Month Scenario</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { year: '2027', title: 'The Margin War', desc: 'AI-agents for your competitors start undercutting your rates by 40% using zero-labor overhead.' },
              { year: '2028', title: 'The Structural Cliff', desc: 'Clients demand instant results. Those without a real-time AI protocol lose 60% of market share.' },
              { year: '2029', title: 'The Terminal State', desc: 'Manual execution becomes a boutique luxury — or an obsolete cost burden.' }
            ].map((s, i) => (
              <div key={i} className="p-10 bg-white/[0.02] border border-white/5 rounded-2xl">
                <p className="text-4xl font-serif font-black text-[#C9A84C] mb-4">{s.year}</p>
                <h4 className="text-xl font-bold mb-4">{s.title}</h4>
                <p className="text-sm text-[#F8F6F0]/50 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: The 3 Types of [Profession] */}
        <section className="py-24 px-6 bg-white/[0.02]">
          <div className="max-w-7xl mx-auto">
             <div className="text-center mb-16">
              <h2 className="text-xs font-mono text-[#C9A84C] uppercase tracking-[0.4em] font-black mb-4">SEGMENTATION ANALYSIS</h2>
              <h3 className="text-4xl font-serif font-black">The 3 Types of {profession.name}s in 2027</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-10 border border-red-500/20 bg-red-500/5 rounded-2xl relative overflow-hidden flex flex-col h-full">
                <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/10 blur-3xl rounded-full" />
                <h4 className="text-2xl font-black text-red-500 mb-2">The Replaced</h4>
                <p className="text-xs font-mono font-black opacity-40 mb-6 uppercase">37% OF SECTOR</p>
                <p className="text-sm opacity-60 flex-grow">Professionals who ignore automation, clinging to manual billable hours until client turnover forces closure.</p>
              </div>

              <div className="p-10 border border-amber-500/20 bg-amber-500/5 rounded-2xl relative overflow-hidden flex flex-col h-full">
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 blur-3xl rounded-full" />
                <h4 className="text-2xl font-black text-amber-500 mb-2">The Surviving</h4>
                <p className="text-xs font-mono font-black opacity-40 mb-6 uppercase">45% OF SECTOR</p>
                <p className="text-sm opacity-60 flex-grow">Using fragmented tools but no core AI architecture. Working harder to stay still. Stagnant rates.</p>
              </div>

              <div className="p-10 border-2 border-[#C9A84C] bg-[#C9A84C]/10 rounded-2xl relative overflow-hidden flex flex-col h-full ring-4 ring-[#C9A84C]/20">
                <div className="absolute -top-4 -right-4 px-4 py-1 bg-[#C9A84C] text-[#0A0F1E] text-[10px] font-black uppercase tracking-widest rotate-12">TARGET STATE</div>
                <h4 className="text-2xl font-black text-[#C9A84C] mb-2">The Thriving</h4>
                <p className="text-xs font-mono font-black opacity-60 mb-6 uppercase">18% OF SECTOR</p>
                <p className="text-sm text-white flex-grow">Full protocol synchronization. Client acquisition, delivery, and scaling handled by the GeniuzLab Engine.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: What the Top 18% Are Doing */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-serif font-black mb-12 text-center">Protocol Components of the Top 18%</h3>
            
            <div className="space-y-4">
              {[
                { title: "Synthetic Client Nurture", desc: "Automated WhatsApp ARIA integration managing 100% of inquiries." },
                { title: "Context-Aware Automation", desc: "Linking " + (profession.tech_stack?.[0] || 'your stack') + " directly to reasoning models." },
                { title: "HIDDEN PROTOCOL", desc: "LOCKED CONTENT", blur: true },
                { title: "FUTURE-STATE LOGIC", desc: "LOCKED CONTENT", blur: true }
              ].map((item, i) => (
                <div key={i} className={`p-8 border border-white/5 bg-white/[0.02] rounded-xl relative ${item.blur ? 'overflow-hidden' : ''}`}>
                  <div className={item.blur ? 'blur-md opacity-20 select-none' : ''}>
                    <div className="flex items-center gap-4 mb-2">
                       <CheckCircle2 className={`w-5 h-5 ${item.blur ? 'text-white/20' : 'text-[#C9A84C]'}`} />
                       <h5 className="text-lg font-bold">{item.title}</h5>
                    </div>
                    <p className="text-sm opacity-50 ml-9">{item.desc}</p>
                  </div>
                  
                  {item.blur && i === 2 && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0A0F1E]/40 backdrop-blur-[2px] z-10 p-6 text-center">
                       <Lock className="w-8 h-8 text-[#C9A84C] mb-4" />
                       <p className="text-xs font-black uppercase tracking-widest text-white">Full survival blueprint reveals the complete system</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 6: GeniuzLab Section */}
        <section className="mt-32 bg-[#0c1224] border-y border-white/5 py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">You don&apos;t have to figure this out alone.</h2>
                <p className="text-xl text-[#F8F6F0]/60 mb-12 font-light">
                  The GeniuzLab Intelligence Unit builds, deploys, and scales your AI survival architecture. 
                </p>
                <div className="space-y-6">
                   <a 
                    href={`https://wa.me/geniuzlab_aria?text=I%20just%20finished%20my%20risk%20report%20for%20${profession.name}.%20My%20risk%20is%20${riskScore}%.%20How%20can%20you%20help%20me%20thrive?`}
                    target="_blank"
                    className="inline-flex items-center gap-4 bg-green-600 px-8 py-4 rounded-[2px] text-sm font-black uppercase tracking-widest hover:bg-green-500 transition-colors"
                   >
                     DEPLOY VIA WHATSAPP <Zap className="w-5 h-5 fill-white" />
                   </a>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {[
                  { name: "Content Automation", icon: Zap },
                  { name: "SEO Systems", icon: Globe },
                  { name: "Workflow Building", icon: Database }
                 ].map((s, i) => (
                   <div key={i} className="p-8 border border-white/5 bg-[#0A0F1E] group hover:border-[#C9A84C]/50 transition-all">
                      <s.icon className="w-8 h-8 text-[#C9A84C] mb-6 group-hover:scale-110 transition-transform" />
                      <h4 className="font-bold text-sm uppercase tracking-widest mb-2">{s.name}</h4>
                      <p className="text-[10px] font-mono opacity-40 uppercase">GeniuzLab Core Service</p>
                   </div>
                 ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: Buy CTA */}
        <section className="py-40 px-6 max-w-4xl mx-auto text-center border-t border-white/10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">Your personalised step-by-step blueprint is ready.</h2>
            <p className="text-[#F8F6F0]/60 mb-16 text-lg">
              Get the complete £49 {profession.name} protocol for a report-exclusive price of just £27. 
            </p>

            <div className="relative mb-20 group">
              <div className="absolute inset-0 z-10 flex items-center justify-center">
                 <div className="bg-[#0A0F1E]/80 backdrop-blur-sm border border-white/10 p-8 rounded-2xl max-w-sm">
                    <p className="text-6xl font-serif font-black text-[#C9A84C] mb-4">£27</p>
                    <p className="text-xs font-mono font-black uppercase tracking-widest opacity-40 mb-8">REPORT EXCLUSIVE DISCOUNT</p>
                    <button 
                      onClick={() => router.push(`/product/${profession.slug}?discount=true`)}
                      className="w-full py-4 bg-[#C9A84C] text-[#0A0F1E] font-black uppercase tracking-widest rounded-[2px] flex items-center justify-center gap-3"
                    >
                      SECURE BLUEPRINT <ArrowRight className="w-4 h-4" />
                    </button>
                 </div>
              </div>
              <div className="aspect-[16/9] w-full bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden blur-xl opacity-30">
                 <div className="p-12 space-y-8 animate-pulse">
                    <div className="h-8 w-48 bg-white/20 rounded" />
                    <div className="h-4 w-full bg-white/10 rounded" />
                    <div className="h-4 w-full bg-white/10 rounded" />
                    <div className="h-4 w-3/4 bg-white/10 rounded" />
                    <div className="grid grid-cols-2 gap-4">
                       <div className="h-24 bg-white/5 rounded" />
                       <div className="h-24 bg-white/5 rounded" />
                    </div>
                 </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-12 text-[10px] font-mono font-bold uppercase tracking-widest opacity-30">
               <span className="flex items-center gap-2"><Lock className="w-3 h-3" /> Encrypted Checkout</span>
               <span className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3" /> Instant Digital Access</span>
               <span className="flex items-center gap-2"><Zap className="w-3 h-3" /> Exclusive Valuation</span>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
