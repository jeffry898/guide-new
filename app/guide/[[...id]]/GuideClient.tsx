'use client';

import { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
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
  CheckCircle2,
  Copy,
  Check,
  Play,
  Sparkles,
  Zap,
  Terminal,
  Printer,
  Sliders,
  Layers,
  ArrowRight
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend
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

  // Tab State
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'sandbox' | 'roadmap' | 'roi'>('overview');

  // ROI Calculator State
  const [hoursPerWeek, setHoursPerWeek] = useState(12);
  const [hourlyRate, setHourlyRate] = useState(125);

  // Interactive Sandbox State
  const [selectedPromptIndex, setSelectedPromptIndex] = useState(0);
  const [promptVarInputs, setPromptVarInputs] = useState<Record<string, string>>({});
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  // Roadmap Progress State (Persisted in localStorage)
  const [completedActions, setCompletedActions] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const initialize = async () => {
      try {
        setError(null);
        if (!id) {
          setLoading(false);
          setVerifying(false);
          return;
        }

        const { data: { session } } = await supabase.auth.getSession();
        const token = session?.access_token;
        
        if (!token) {
          router.push('/login');
          return;
        }

        const professions = await getProfessions();
        const response = await fetch(`/api/guide/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
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

        // Load saved roadmap progress from localStorage
        if (typeof window !== 'undefined') {
          const savedProgress = localStorage.getItem(`guide_progress_${id}`);
          if (savedProgress) {
            try {
              setCompletedActions(JSON.parse(savedProgress));
            } catch (e) {}
          }
        }

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

  // Handle roadmap checkbox toggle
  const toggleActionItem = (itemKey: string) => {
    const updated = { ...completedActions, [itemKey]: !completedActions[itemKey] };
    setCompletedActions(updated);
    if (typeof window !== 'undefined' && id) {
      localStorage.setItem(`guide_progress_${id}`, JSON.stringify(updated));
    }
  };

  // Active prompt in sandbox
  const currentPromptObj = useMemo(() => {
    if (!guide?.prompt_templates || guide.prompt_templates.length === 0) {
      return {
        title: 'Master Strategic Execution Prompt',
        use_case: 'General AI Automation',
        target_tool: 'ChatGPT Enterprise / Claude 3.5 Sonnet',
        prompt: `Act as an elite AI Systems Architect for [CLIENT_NAME]. Analyze current workflow bottlenecks in [INDUSTRY] and draft a step-by-step automation blueprint targeting [REVENUE_GOAL].`,
        variables: ['CLIENT_NAME', 'INDUSTRY', 'REVENUE_GOAL'],
        setup_instructions: 'Copy and run in ChatGPT or Claude to generate instant execution strategy.'
      };
    }
    return guide.prompt_templates[selectedPromptIndex] || guide.prompt_templates[0];
  }, [guide, selectedPromptIndex]);

  // Extract bracketed variables like [CLIENT_NAME] dynamically if not explicitly defined
  const detectedVariables = useMemo(() => {
    if (currentPromptObj.variables && currentPromptObj.variables.length > 0) {
      return currentPromptObj.variables;
    }
    const matches = currentPromptObj.prompt.match(/\[([A-Z0-9_]+)\]/g);
    if (!matches) return ['CLIENT_NAME', 'TARGET_GOAL'];
    return Array.from(new Set(matches.map(m => m.replace(/[\[\]]/g, ''))));
  }, [currentPromptObj]);

  // Compiled live prompt string with user variable inputs filled in
  const liveCompiledPrompt = useMemo(() => {
    let result = currentPromptObj.prompt;
    detectedVariables.forEach(v => {
      const val = promptVarInputs[v] || `[${v}]`;
      result = result.replaceAll(`[${v}]`, val);
    });
    return result;
  }, [currentPromptObj, detectedVariables, promptVarInputs]);

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(liveCompiledPrompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2500);
  };

  const annualSavings = useMemo(() => {
    return hoursPerWeek * hourlyRate * 52;
  }, [hoursPerWeek, hourlyRate]);

  // Roadmap progress calculation
  const totalRoadmapActions = useMemo(() => {
    if (!guide?.roadmap?.weeks) return 0;
    return guide.roadmap.weeks.reduce((acc, week) => acc + week.actions.length, 0);
  }, [guide]);

  const completedRoadmapCount = useMemo(() => {
    return Object.values(completedActions).filter(Boolean).length;
  }, [completedActions]);

  const progressPercent = useMemo(() => {
    if (totalRoadmapActions === 0) return 0;
    return Math.round((completedRoadmapCount / totalRoadmapActions) * 100);
  }, [completedRoadmapCount, totalRoadmapActions]);

  if (error) return (
    <div className="min-h-screen bg-[#0A0F1E] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 border-4 border-red-500/20 border-t-red-500 rounded-full mb-8" />
      <h2 className="text-xl font-bold text-red-500 uppercase tracking-[0.3em] font-mono mb-4">
        ACCESS DENIED // ERROR
      </h2>
      <p className="text-white/60 mb-8 max-w-md">{error}</p>
      <button 
        onClick={() => router.push('/')}
        className="px-8 py-3 bg-white/5 border border-white/10 rounded-full text-xs font-bold uppercase tracking-widest text-[#C9A84C]"
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
        Generating $1,000 Enterprise Protocol...
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

  const WHATSAPP_NUMBER = "1234567890";

  return (
    <div className="min-h-screen bg-[#0A0F1E] text-[#F8F6F0]">
      <Navbar />
      
      <main className="pt-20">
        {/* Header Hero Section */}
        <header className="py-24 px-6 bg-[#0A0F1E] relative overflow-hidden border-b border-white/10 print:py-8">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#C9A84C]/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4" />
          
          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="px-4 py-1.5 bg-[#C9A84C]/10 border border-[#C9A84C]/30 rounded-full">
                    <p className="text-[11px] font-mono font-black text-[#C9A84C] uppercase tracking-widest flex items-center gap-2">
                      <Shield className="w-3.5 h-3.5" /> ENTERPRISE PROTOCOL v3.0 // LIVE APP
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 print:hidden">
                  <button 
                    onClick={() => window.print()}
                    className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 hover:border-[#C9A84C]/50 rounded-lg text-xs font-mono font-bold uppercase tracking-wider text-white/80 transition-all"
                  >
                    <Printer className="w-4 h-4 text-[#C9A84C]" /> Export PDF Report
                  </button>
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=I'm reviewing the AI Guide for ${encodeURIComponent(professionInfo?.name || 'my business')} and would like to hire GeniuzLab for DFY setup.`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-5 py-2 bg-[#C9A84C] text-[#0A0F1E] hover:bg-[#D4B55B] rounded-lg text-xs font-mono font-black uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(201,168,76,0.3)]"
                  >
                    <Zap className="w-4 h-4" /> Book DFY Agency Build
                  </a>
                </div>
              </div>

              <h1 className="text-4xl md:text-7xl font-serif font-bold text-[#C9A84C] leading-[0.95] tracking-tighter mb-6 max-w-5xl">
                {guide.hero.title}
              </h1>
              
              <p className="text-lg md:text-2xl opacity-70 mb-10 max-w-3xl font-light leading-relaxed">
                {guide.hero.subtitle || `Complete AI synchronization blueprint for modern ${professionInfo?.name || 'professionals'}.`}
              </p>

              <div className="flex flex-wrap gap-8 items-center pt-6 border-t border-white/10">
                <div className="flex flex-col">
                  <p className="text-[10px] font-mono uppercase tracking-widest opacity-40 mb-1">Primary Performance Stat</p>
                  <p className="text-3xl font-black text-[#C9A84C]">{guide.hero.stat}</p>
                  <p className="text-[10px] font-mono opacity-40 mt-0.5">Source: {guide.hero.stat_source}</p>
                </div>

                <div className="h-10 w-px bg-white/10 hidden md:block" />

                <div className="flex flex-col">
                  <p className="text-[10px] font-mono uppercase tracking-widest opacity-40 mb-1">Interactive Master Prompts</p>
                  <p className="text-2xl font-black text-white">{guide.prompt_templates?.length || 5} Ready-to-Run Prompts</p>
                </div>

                <div className="h-10 w-px bg-white/10 hidden md:block" />

                <div className="flex flex-col">
                  <p className="text-[10px] font-mono uppercase tracking-widest opacity-40 mb-1">30-Day Execution Roadmap</p>
                  <div className="flex items-center gap-3">
                    <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-[#C9A84C] transition-all duration-500" style={{ width: `${progressPercent}%` }} />
                    </div>
                    <span className="text-sm font-mono font-bold text-[#C9A84C]">{progressPercent}% Completed</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </header>

        {/* Tab Navigation Menu */}
        <section className="sticky top-20 z-40 bg-[#0A0F1E]/90 backdrop-blur-md border-b border-white/10 print:hidden">
          <div className="max-w-7xl mx-auto px-6 flex items-center gap-2 overflow-x-auto py-3 no-scrollbar">
            {[
              { id: 'overview', label: '1. Reality Check', icon: BarChart3 },
              { id: 'architecture', label: '2. AI Systems Architecture', icon: Layers },
              { id: 'sandbox', label: '3. Live Prompt Sandbox', icon: Terminal, badge: 'INTERACTIVE' },
              { id: 'roadmap', label: '4. 30-Day Action Roadmap', icon: MapIcon, count: `${completedRoadmapCount}/${totalRoadmapActions}` },
              { id: 'roi', label: '5. ROI Simulator', icon: Sliders }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2.5 px-5 py-2.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                    isActive 
                      ? 'bg-[#C9A84C] text-[#0A0F1E] shadow-[0_0_15px_rgba(201,168,76,0.4)]' 
                      : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-black ${isActive ? 'bg-[#0A0F1E] text-[#C9A84C]' : 'bg-[#C9A84C]/20 text-[#C9A84C]'}`}>
                      {tab.badge}
                    </span>
                  )}
                  {tab.count && (
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${isActive ? 'bg-[#0A0F1E] text-[#C9A84C]' : 'bg-white/10 text-white/70'}`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* Tab 1: Reality Check & Overview */}
        {(activeTab === 'overview' || typeof window === 'undefined') && (
          <section className="py-16 px-6 max-w-7xl mx-auto space-y-16">
            <div className="max-w-4xl">
              <h2 className="text-xs font-mono text-[#C9A84C] uppercase tracking-[0.4em] font-bold mb-3">MODULE 01 // REALITY CHECK</h2>
              <h3 className="text-3xl md:text-5xl font-black mb-4">THE COST OF OPERATIONAL INERTIA</h3>
              <p className="text-white/60 text-lg">Compare traditional manual operation hours against the AI-synchronized systems layer.</p>
            </div>

            <div className="p-8 md:p-12 rounded-xl bg-[#0A0F1E] border border-[#C9A84C]/30 shadow-[0_0_50px_-12px_rgba(201,168,76,0.15)]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h4 className="text-2xl font-bold mb-4 text-white">{guide.reality_check.headline}</h4>
                  <p className="text-base text-white/70 leading-relaxed mb-8">{guide.reality_check.insight}</p>
                  <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg border border-white/10 mb-6">
                    <TrendingUp className="w-5 h-5 text-[#C9A84C] shrink-0" />
                    <p className="text-xs text-white/80">Automating admin overload reclaims 15-25 hours per week, shifting your team capacity directly into high-ticket client acquisition.</p>
                  </div>
                  <p className="text-[10px] font-mono text-white/30">Data Citation: {guide.reality_check.chart.title} via {guide.hero.stat_source}</p>
                </div>

                <div className="h-[350px] w-full bg-white/[0.02] p-4 rounded-lg border border-white/5">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                      <XAxis 
                        dataKey="name" 
                        stroke="rgba(255,255,255,0.4)" 
                        fontSize={11} 
                        tickLine={false} 
                        axisLine={false}
                        fontFamily="JetBrains Mono"
                      />
                      <YAxis 
                        stroke="rgba(255,255,255,0.4)" 
                        fontSize={11} 
                        tickLine={false} 
                        axisLine={false}
                        fontFamily="JetBrains Mono"
                      />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0A0F1E', border: '1px solid rgba(201,168,76,0.3)', borderRadius: '6px' }}
                        itemStyle={{ fontFamily: 'Inter', fontSize: '12px' }}
                      />
                      <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', paddingTop: '15px' }} />
                      <Bar dataKey="current" name="Traditional Manual Model (Hours/Wk)" fill="#C0392B" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="optimized" name="AI-Engineered Systems Model (Hours/Wk)" fill="#1A6B3C" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="flex justify-end print:hidden">
              <button
                onClick={() => setActiveTab('architecture')}
                className="flex items-center gap-2 px-6 py-3 bg-[#C9A84C] text-[#0A0F1E] text-xs font-mono font-bold uppercase tracking-widest rounded-lg hover:bg-[#D4B55B] transition-all"
              >
                Proceed to Module 02: AI Architecture <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </section>
        )}

        {/* Tab 2: AI Systems Architecture */}
        {(activeTab === 'architecture' || typeof window === 'undefined') && (
          <section className="py-16 px-6 max-w-7xl mx-auto space-y-12">
            <div className="max-w-4xl">
              <h2 className="text-xs font-mono text-[#C9A84C] uppercase tracking-[0.4em] font-bold mb-3">MODULE 02 // ARCHITECTURE</h2>
              <h3 className="text-3xl md:text-5xl font-black mb-4">5 ENTERPRISE AI AUTOMATION BLUEPRINTS</h3>
              <p className="text-white/60 text-lg">Step-by-step implementation blueprints for high-impact AI systems engineered specifically for {professionInfo?.name || 'your profession'}.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {guide.ai_systems.map((system, i) => (
                <div key={i} className="p-8 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#C9A84C]/40 transition-all flex flex-col justify-between space-y-6">
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-12 h-12 rounded-lg bg-[#C9A84C]/10 border border-[#C9A84C]/30 flex items-center justify-center text-2xl">
                        {system.icon || '🤖'}
                      </div>
                      <div className="px-3 py-1 bg-[#C9A84C]/10 border border-[#C9A84C]/30 rounded-full">
                        <p className="text-[10px] font-mono text-[#C9A84C] font-black uppercase">
                          ⏱ RECLAIMS {system.time_saved_weekly || 5} HRS / WK
                        </p>
                      </div>
                    </div>

                    <h4 className="text-2xl font-bold text-white mb-3">{system.title}</h4>
                    <p className="text-white/70 text-sm leading-relaxed mb-6">{system.description}</p>

                    {system.architecture_steps && system.architecture_steps.length > 0 && (
                      <div className="p-4 rounded-lg bg-black/30 border border-white/5 space-y-2 mb-6">
                        <p className="text-[10px] font-mono uppercase tracking-widest text-[#C9A84C] font-bold">Implementation SOP Steps:</p>
                        {system.architecture_steps.map((step, sIdx) => (
                          <div key={sIdx} className="flex gap-2.5 text-xs text-white/80 items-start">
                            <span className="font-mono text-[#C9A84C] font-bold shrink-0">{sIdx + 1}.</span>
                            <span>{step}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="space-y-3 pt-4 border-t border-white/10">
                    {system.free_tool && (
                      <button 
                        onClick={() => window.open(system.free_tool_url || 'https://chatgpt.com', '_blank')}
                        className="w-full flex items-center justify-between px-4 py-3 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-mono font-bold uppercase tracking-wider text-white transition-colors"
                      >
                        <span>Launch Free Tool: {system.free_tool}</span>
                        <ExternalLink className="w-3.5 h-3.5 text-[#C9A84C]" />
                      </button>
                    )}
                    <a 
                      href={`https://wa.me/${WHATSAPP_NUMBER}?text=I'm interested in GeniuzLab building the ${encodeURIComponent(system.title)} for my business.`}
                      target="_blank"
                      rel="noreferrer"
                      className="block text-center text-xs font-mono font-bold text-[#C9A84C] hover:underline uppercase tracking-wider pt-1"
                    >
                      Hire GeniuzLab to build this DFY →
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end print:hidden">
              <button
                onClick={() => setActiveTab('sandbox')}
                className="flex items-center gap-2 px-6 py-3 bg-[#C9A84C] text-[#0A0F1E] text-xs font-mono font-bold uppercase tracking-widest rounded-lg hover:bg-[#D4B55B] transition-all"
              >
                Proceed to Module 03: Live Prompt Sandbox <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </section>
        )}

        {/* Tab 3: Interactive Live Prompt Sandbox */}
        {(activeTab === 'sandbox' || typeof window === 'undefined') && (
          <section className="py-16 px-6 max-w-7xl mx-auto space-y-12">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#C9A84C]/10 border border-[#C9A84C]/30 rounded-full mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#C9A84C]" />
                <span className="text-[10px] font-mono text-[#C9A84C] font-black uppercase">LIVE INTERACTIVE PLAYGROUND</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black mb-4">MODULE 03 // LIVE PROMPT SANDBOX</h2>
              <p className="text-white/60 text-lg">Customize master prompt variables live on screen and copy ready-to-run prompt scripts directly into ChatGPT, Claude, or Cursor.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Prompt Selection Sidebar */}
              <div className="lg:col-span-4 space-y-3">
                <p className="text-xs font-mono uppercase tracking-widest text-[#C9A84C] font-bold mb-2">Select Master Prompt ({guide.prompt_templates?.length || 5}):</p>
                {(guide.prompt_templates || []).map((pt, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedPromptIndex(idx);
                      setCopiedPrompt(false);
                    }}
                    className={`w-full text-left p-4 rounded-xl border transition-all ${
                      selectedPromptIndex === idx 
                        ? 'bg-[#C9A84C]/10 border-[#C9A84C] text-white shadow-[0_0_20px_rgba(201,168,76,0.15)]' 
                        : 'bg-white/[0.02] border-white/10 text-white/70 hover:border-white/30 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] font-mono font-bold text-[#C9A84C] uppercase">PROMPT #{idx + 1}</span>
                      <span className="text-[9px] font-mono text-white/40">{pt.target_tool}</span>
                    </div>
                    <h5 className="font-bold text-sm text-white mb-1 line-clamp-1">{pt.title}</h5>
                    <p className="text-xs text-white/50 line-clamp-2">{pt.use_case}</p>
                  </button>
                ))}
              </div>

              {/* Main Interactive Editor Box */}
              <div className="lg:col-span-8 space-y-6">
                <div className="p-6 md:p-8 rounded-xl bg-[#050811] border border-[#C9A84C]/30 shadow-2xl space-y-6">
                  <div className="flex flex-wrap justify-between items-center gap-4 pb-6 border-b border-white/10">
                    <div>
                      <span className="text-xs font-mono font-bold text-[#C9A84C] uppercase tracking-wider block mb-1">Target Engine: {currentPromptObj.target_tool}</span>
                      <h4 className="text-2xl font-bold text-white">{currentPromptObj.title}</h4>
                      <p className="text-xs text-white/60">{currentPromptObj.use_case}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={handleCopyPrompt}
                        className="flex items-center gap-2 px-5 py-2.5 bg-[#C9A84C] text-[#0A0F1E] rounded-lg text-xs font-mono font-black uppercase tracking-wider hover:bg-[#D4B55B] transition-all shadow-[0_0_15px_rgba(201,168,76,0.3)]"
                      >
                        {copiedPrompt ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        <span>{copiedPrompt ? 'COPIED TO CLIPBOARD!' : 'COPY PROMPT'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Variable Input Fields */}
                  {detectedVariables.length > 0 && (
                    <div className="p-4 rounded-lg bg-white/5 border border-white/10 space-y-4">
                      <p className="text-xs font-mono font-bold text-[#C9A84C] uppercase tracking-wider flex items-center gap-2">
                        <Sliders className="w-3.5 h-3.5" /> Fill Prompt Variables Live:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {detectedVariables.map((variable) => (
                          <div key={variable} className="space-y-1">
                            <label className="text-[10px] font-mono uppercase text-white/50 font-bold">[{variable}]</label>
                            <input
                              type="text"
                              placeholder={`Enter ${variable.replaceAll('_', ' ').toLowerCase()}...`}
                              value={promptVarInputs[variable] || ''}
                              onChange={(e) => setPromptVarInputs({ ...promptVarInputs, [variable]: e.target.value })}
                              className="w-full px-3 py-2 bg-black/60 border border-white/10 focus:border-[#C9A84C] rounded text-xs text-white placeholder:text-white/30 focus:outline-none"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Compiled Prompt Live Output */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[10px] font-mono text-white/40 uppercase font-bold">
                      <span>Compiled Master Output Script</span>
                      <span>Real-Time Editor</span>
                    </div>
                    <pre className="p-5 rounded-lg bg-black/80 border border-white/10 text-xs text-emerald-400 font-mono whitespace-pre-wrap leading-relaxed max-h-[300px] overflow-y-auto selection:bg-[#C9A84C] selection:text-[#0A0F1E]">
                      {liveCompiledPrompt}
                    </pre>
                  </div>

                  {/* External Launch Buttons */}
                  <div className="flex flex-wrap gap-3 pt-2">
                    <button
                      onClick={() => window.open('https://chatgpt.com', '_blank')}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-mono font-bold text-white border border-white/10 transition-colors"
                    >
                      <Play className="w-3.5 h-3.5 text-[#C9A84C]" /> Launch in ChatGPT
                    </button>
                    <button
                      onClick={() => window.open('https://claude.ai/chat', '_blank')}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-mono font-bold text-white border border-white/10 transition-colors"
                    >
                      <Play className="w-3.5 h-3.5 text-[#C9A84C]" /> Launch in Claude 3.5
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end print:hidden">
              <button
                onClick={() => setActiveTab('roadmap')}
                className="flex items-center gap-2 px-6 py-3 bg-[#C9A84C] text-[#0A0F1E] text-xs font-mono font-bold uppercase tracking-widest rounded-lg hover:bg-[#D4B55B] transition-all"
              >
                Proceed to Module 04: 30-Day Action Roadmap <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </section>
        )}

        {/* Tab 4: 30-Day Action Roadmap & Progress Tracker */}
        {(activeTab === 'roadmap' || typeof window === 'undefined') && (
          <section className="py-16 px-6 max-w-7xl mx-auto space-y-12">
            <div className="max-w-4xl">
              <h2 className="text-xs font-mono text-[#C9A84C] uppercase tracking-[0.4em] font-bold mb-3">MODULE 04 // THE ACTIVATION</h2>
              <h3 className="text-3xl md:text-5xl font-black mb-4">30-DAY STEP-BY-STEP ACTION ROADMAP</h3>
              <p className="text-white/60 text-lg">Check off action milestones as you execute them. Progress is automatically saved locally.</p>
            </div>

            {/* Overall Progress Tracker Bar */}
            <div className="p-6 rounded-xl bg-white/[0.03] border border-[#C9A84C]/30 flex flex-wrap items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border-2 border-[#C9A84C] flex items-center justify-center font-mono font-black text-[#C9A84C]">
                  {progressPercent}%
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">30-Day Protocol Transformation</h4>
                  <p className="text-xs text-white/60">{completedRoadmapCount} of {totalRoadmapActions} Milestones Completed</p>
                </div>
              </div>

              <div className="w-full md:w-1/3 space-y-1.5">
                <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#C9A84C] transition-all duration-500 shadow-[0_0_10px_#C9A84C]" 
                    style={{ width: `${progressPercent}%` }} 
                  />
                </div>
                <p className="text-[10px] font-mono text-white/40 text-right uppercase">Saved in Browser LocalStorage</p>
              </div>
            </div>

            {/* Roadmap Week Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {guide.roadmap.weeks.map((week, i) => (
                <div key={i} className="flex flex-col justify-between bg-[#0A0F1E] border border-white/10 p-6 rounded-xl space-y-6 relative overflow-hidden">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-4 border-b border-white/10">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full border border-[#C9A84C] flex items-center justify-center font-mono font-black text-xs text-[#C9A84C]">
                          W{week.week}
                        </div>
                        <div>
                          <p className="text-[9px] font-mono text-[#C9A84C] font-bold uppercase">Phase {week.week}</p>
                          <h5 className="text-xs font-black uppercase text-white line-clamp-1">{week.theme}</h5>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {week.actions.map((action, j) => {
                        const itemKey = `w${week.week}_a${j}`;
                        const isChecked = !!completedActions[itemKey];
                        return (
                          <div 
                            key={j} 
                            onClick={() => toggleActionItem(itemKey)}
                            className={`flex gap-3 items-start p-2.5 rounded-lg border cursor-pointer transition-all ${
                              isChecked 
                                ? 'bg-[#C9A84C]/10 border-[#C9A84C]/40 text-white' 
                                : 'bg-white/[0.02] border-white/5 text-white/70 hover:border-white/20'
                            }`}
                          >
                            <div className={`w-4 h-4 rounded mt-0.5 border flex items-center justify-center shrink-0 transition-colors ${
                              isChecked ? 'bg-[#C9A84C] border-[#C9A84C] text-[#0A0F1E]' : 'border-white/30 bg-black/40'
                            }`}>
                              {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                            <p className={`text-xs leading-relaxed ${isChecked ? 'line-through opacity-60' : ''}`}>{action}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {week.key_deliverable && (
                    <div className="pt-4 border-t border-white/10">
                      <p className="text-[10px] font-mono text-[#C9A84C] font-bold uppercase mb-0.5">Key Deliverable:</p>
                      <p className="text-xs text-white/80 font-medium">{week.key_deliverable}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-end print:hidden">
              <button
                onClick={() => setActiveTab('roi')}
                className="flex items-center gap-2 px-6 py-3 bg-[#C9A84C] text-[#0A0F1E] text-xs font-mono font-bold uppercase tracking-widest rounded-lg hover:bg-[#D4B55B] transition-all"
              >
                Proceed to Module 05: ROI Simulator <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </section>
        )}

        {/* Tab 5: Dynamic ROI Simulator */}
        {(activeTab === 'roi' || typeof window === 'undefined') && (
          <section className="py-16 px-6 max-w-7xl mx-auto space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5 space-y-8">
                <div>
                  <h2 className="text-xs font-mono text-[#C9A84C] uppercase tracking-[0.4em] font-bold mb-3">MODULE 05 // VALUE EXTRACTION</h2>
                  <h3 className="text-4xl font-black mb-4">DYNAMIC ROI SIMULATOR</h3>
                  <p className="text-white/60 text-base leading-relaxed">
                    Adjust your hourly rate and estimated weekly hours reclaimed to calculate the institutional financial return of this protocol.
                  </p>
                </div>
                
                <div className="p-6 rounded-xl bg-white/5 border border-white/10 space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-bold uppercase tracking-wider text-white/70">Weekly Hours Reclaimed</label>
                      <span className="text-2xl font-black text-[#C9A84C]">{hoursPerWeek} HRS / WK</span>
                    </div>
                    <input 
                      type="range" min="4" max="40" step="1" 
                      value={hoursPerWeek} 
                      onChange={(e) => setHoursPerWeek(parseInt(e.target.value))}
                      className="w-full appearance-none bg-white/10 h-2 rounded-full accent-[#C9A84C] cursor-pointer"
                    />
                  </div>

                  <div className="space-y-4 pt-4 border-t border-white/10">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-bold uppercase tracking-wider text-white/70">Your Hourly Value ($/HR)</label>
                      <span className="text-2xl font-black text-emerald-400">${hourlyRate} / HR</span>
                    </div>
                    <input 
                      type="range" min="25" max="500" step="25" 
                      value={hourlyRate} 
                      onChange={(e) => setHourlyRate(parseInt(e.target.value))}
                      className="w-full appearance-none bg-white/10 h-2 rounded-full accent-emerald-400 cursor-pointer"
                    />
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <p className="text-xs text-white/60 italic">&quot;{guide.roi.insight}&quot;</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="p-10 md:p-14 rounded-2xl bg-[#C9A84C] text-[#0A0F1E] flex flex-col items-center text-center shadow-[0_0_60px_rgba(201,168,76,0.3)]">
                  <p className="text-xs font-black uppercase tracking-[0.3em] mb-4 opacity-80">Projected 1-Year Financial Recovery</p>
                  <p className="text-6xl md:text-8xl font-serif font-black tracking-tighter mb-6">
                    ${annualSavings.toLocaleString()}
                  </p>
                  <p className="text-sm font-bold uppercase tracking-widest bg-[#0A0F1E] text-[#C9A84C] px-6 py-2 rounded-full">
                    ⚡ {hoursPerWeek * 52} Hours Reclaimed Annually
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* GeniuzLab Done-For-You Agency Callout */}
        <section className="py-24 px-6 bg-[#1E3A5F] border-t border-b border-white/10">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
              <div className="lg:col-span-8 space-y-4">
                <div className="px-3 py-1 bg-[#C9A84C]/20 border border-[#C9A84C]/40 rounded-full inline-block">
                  <p className="text-[10px] font-mono text-[#C9A84C] font-black uppercase tracking-widest">WHITE-GLOVE IMPLEMENTATION</p>
                </div>
                <h3 className="text-4xl md:text-5xl font-serif font-bold text-white leading-tight">{guide.geniuzlab.headline}</h3>
                <p className="text-white/70 text-lg max-w-2xl">{guide.geniuzlab.body}</p>
              </div>

              <div className="lg:col-span-4 text-left lg:text-right">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=I'm interested in hiring GeniuzLab to build custom AI pipelines for my ${encodeURIComponent(professionInfo?.name || 'business')}.`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block px-10 py-5 bg-[#C9A84C] text-[#0A0F1E] text-base font-black uppercase tracking-widest rounded-lg hover:bg-[#D4B55B] transition-all shadow-[0_0_30px_rgba(201,168,76,0.3)]"
                >
                  {guide.geniuzlab.cta || 'Book Done-For-You Build →'}
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {guide.geniuzlab.services.map((service, i) => (
                <div key={i} className="p-8 rounded-xl bg-[#0A0F1E]/60 border border-white/10 backdrop-blur-sm">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h4 className="text-lg font-bold text-white mb-2">{service.name}</h4>
                  <p className="text-xs text-white/70 leading-relaxed">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer & Share Suite */}
        <footer className="py-20 px-6 border-t border-white/10 text-center">
          <div className="max-w-3xl mx-auto space-y-12">
            <h4 className="text-xl md:text-3xl font-serif italic text-white/80 leading-snug">
              &quot;{guide.closing.statement}&quot;
            </h4>
            
            <div className="flex flex-wrap justify-center gap-4">
              <button 
                onClick={() => {
                  const text = guide.closing.share_text;
                  const url = typeof window !== 'undefined' ? window.location.href : '';
                  window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
                }} 
                className="p-3.5 rounded-full bg-white/5 border border-white/10 hover:border-[#C9A84C]/50 transition-colors"
              >
                <Twitter className="w-5 h-5 opacity-60 text-white" />
              </button>
              <button 
                onClick={() => {
                  const url = typeof window !== 'undefined' ? window.location.href : '';
                  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
                }} 
                className="p-3.5 rounded-full bg-white/5 border border-white/10 hover:border-[#C9A84C]/50 transition-colors"
              >
                <Linkedin className="w-5 h-5 opacity-60 text-white" />
              </button>
              <button 
                onClick={() => window.print()} 
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:border-[#C9A84C]/50 transition-colors"
              >
                <Download className="w-4 h-4 text-[#C9A84C]" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">Download Executive PDF</span>
              </button>
            </div>

            <button 
              onClick={() => router.push('/')}
              className="text-sm font-mono font-bold text-[#C9A84C] uppercase tracking-widest hover:tracking-[0.2em] transition-all flex items-center gap-2 mx-auto pt-4"
            >
              Return to Catalog HQ <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
}
