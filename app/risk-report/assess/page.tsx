'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from '@/components/Navbar';
import { ArrowRight, Sparkles } from 'lucide-react';

const QUESTIONS = [
  {
    id: 'repetitive',
    question: "How much of your work is repetitive tasks?",
    options: ["Under 25%", "25-50%", "Over 50%"]
  },
  {
    id: 'ai_usage',
    question: "Are you currently using any AI tools?",
    options: ["None", "A few basic ones", "Regularly", "Extensively"]
  },
  {
    id: 'security',
    question: "How secure do you feel in your role?",
    options: ["Very secure", "Somewhat", "Worried", "Very worried"]
  }
];

export default function RiskReportAssessment() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [profession, setProfession] = useState<string | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('risk_report_profession');
    if (!stored) {
      router.push('/risk-report');
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProfession(stored);
    }
  }, [router]);

  const handleSelect = (option: string) => {
    const q = QUESTIONS[currentStep];
    const newAnswers = { ...answers, [q.id]: option };
    setAnswers(newAnswers);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      sessionStorage.setItem('risk_report_answers', JSON.stringify(newAnswers));
      router.push('/risk-report/generating');
    }
  };

  if (!profession) return null;

  return (
    <div className="min-h-screen bg-[#0A0F1E] text-[#F8F6F0]">
      <Navbar />
      
      <main className="pt-40 px-6 flex flex-col items-center justify-center min-h-[80vh]">
        <div className="max-w-2xl w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-12"
            >
              <div className="flex items-center gap-4">
                <div className="text-sm font-mono text-[#C9A84C] font-bold uppercase tracking-widest">
                  Assessment {currentStep + 1} of {QUESTIONS.length}
                </div>
                <div className="flex-grow h-[1px] bg-white/10">
                  <motion.div 
                    className="h-full bg-[#C9A84C]"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <h2 className="text-4xl md:text-5xl font-serif font-black leading-tight tracking-tighter">
                  {QUESTIONS[currentStep].question}
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {QUESTIONS[currentStep].options.map((option, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.02, x: 10 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelect(option)}
                    className="p-6 rounded-[2px] border border-white/10 bg-white/5 text-left text-xl font-bold hover:border-[#C9A84C]/50 hover:bg-[#C9A84C]/5 transition-all flex items-center justify-between group"
                  >
                    {option}
                    <ArrowRight className="w-6 h-6 text-[#C9A84C] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
