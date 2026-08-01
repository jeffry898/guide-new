'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Sparkles, Check } from 'lucide-react';
import Navbar from '@/components/Navbar';

const STEPS = [
  {
    title: "The Trigger",
    question: "What is the biggest threat to your business in the next 12 months?",
    options: ["AI Competitors", "High Operation Costs", "Lead Generation Collapse", "Service Quality Decay"]
  },
  {
    title: "The Scale",
    question: "What is your current monthly revenue bracket?",
    options: ["$0 - $5k", "$5k - $20k", "$20k - $100k", "$100k+"]
  },
  {
    title: "The Vision",
    question: "How many hours per week do you want to reclaim using AI?",
    options: ["5-10 Hours", "10-25 Hours", "25-40 Hours", "Fully Autonomous"]
  }
];

export default function OnboardingClient() {
  const params = useParams();
  const session = Array.isArray(params.session) ? params.session[0] : params.session;
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSelect = (option: string) => {
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);
    
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      finishOnboarding(newAnswers);
    }
  };

  const finishOnboarding = async (finalAnswers: string[]) => {
    setLoading(true);
    try {
      let queryProfession = '';
      let queryEmail = '';
      if (typeof window !== 'undefined') {
        const searchParams = new URLSearchParams(window.location.search);
        queryProfession = searchParams.get('profession') || '';
        queryEmail = searchParams.get('email') || '';
      }

      const response = await fetch('/api/generate/guide', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: session,
          answers: finalAnswers,
          professionSlug: queryProfession,
          userEmail: queryEmail
        })
      });

      const data = await response.json();
      if (data.hash) {
        router.push(`/guide/${data.hash}`);
      } else {
        throw new Error(data.error || 'Generation failed');
      }
    } catch (error: any) {
      console.error('Onboarding finish error:', error);
      alert('Generation failed: ' + (error.message || 'Please contact support.'));
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-background">
      <Navbar />
      
      <main className="pt-32 px-6 flex flex-col items-center justify-center min-h-[80vh]">
        <div className="max-w-2xl w-full">
          <AnimatePresence mode="wait">
            {!loading ? (
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-12"
              >
                <div className="flex items-center gap-4">
                  <div className="text-sm font-mono text-brand-gold font-bold uppercase tracking-widest">
                    Phase {currentStep + 1} of {STEPS.length}
                  </div>
                  <div className="flex-grow h-[1px] bg-white/10">
                    <motion.div 
                      className="h-full bg-brand-gold"
                      initial={{ width: 0 }}
                      animate={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <h1 className="text-xs font-mono text-brand-gold uppercase tracking-[0.4em] mb-4">{STEPS[currentStep].title}</h1>
                  <h2 className="text-4xl md:text-5xl font-black leading-tight tracking-tighter">
                    {STEPS[currentStep].question}
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {STEPS[currentStep].options.map((option, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.02, x: 10 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSelect(option)}
                      className="p-6 rounded-2xl border border-white/10 bg-white/5 text-left text-xl font-bold hover:border-brand-gold/50 hover:bg-brand-gold/5 transition-all flex items-center justify-between group"
                    >
                      {option}
                      <ArrowRight className="w-6 h-6 text-brand-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center space-y-8 text-center"
              >
                <div className="relative">
                  <div className="w-24 h-24 rounded-full border-4 border-brand-gold/20 border-t-brand-gold animate-spin" />
                  <Sparkles className="w-10 h-10 text-brand-gold absolute inset-0 m-auto animate-pulse" />
                </div>
                <div>
                  <h2 className="text-3xl font-black mb-2">SYNCHRONIZING INTELLIGENCE</h2>
                  <p className="text-brand-light/60 font-mono text-xs uppercase tracking-widest">Accessing GeniuzLab Core Engine...</p>
                </div>
                <div className="w-full max-w-sm h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-brand-gold"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
