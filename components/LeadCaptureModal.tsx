'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, X, ArrowRight, Lock, CheckCircle2, Sparkles, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Profession } from '@/lib/constants';

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  professions: Profession[];
}

export default function LeadCaptureModal({ isOpen, onClose, professions }: LeadCaptureModalProps) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [selectedSlug, setSelectedSlug] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (professions.length > 0 && !selectedSlug) {
      setSelectedSlug(professions[0].slug);
    }
  }, [professions, selectedSlug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !selectedSlug) return;

    setSubmitting(true);

    try {
      // Save lead to API
      const res = await fetch('/api/risk-report/save-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          profession_slug: selectedSlug,
          answers: { source: 'exit_intent_modal' }
        })
      });

      const data = await res.json();
      
      if (data.token) {
        sessionStorage.setItem('risk_report_profession', selectedSlug);
        router.push(`/risk-report/result/${data.token}`);
      } else {
        sessionStorage.setItem('risk_report_profession', selectedSlug);
        router.push('/risk-report/assess');
      }
    } catch (err) {
      console.error(err);
      sessionStorage.setItem('risk_report_profession', selectedSlug);
      router.push('/risk-report/assess');
    } finally {
      setSubmitting(false);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#060A14]/85 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-[#0A0F1E] border-2 border-[#C9A84C] rounded-2xl p-6 sm:p-8 shadow-[0_0_80px_rgba(201,168,76,0.3)] z-10 text-[#F8F6F0] space-y-6"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-full bg-white/5 border border-white/10 hover:border-[#C9A84C] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="space-y-3 text-center sm:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-950/60 border border-red-800/40 rounded text-[10px] font-mono font-bold text-red-400 uppercase tracking-widest">
                <ShieldAlert className="w-3.5 h-3.5" /> CONFIDENTIAL RISK REPORT
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#F8F6F0]">
                Calculate Your Profession&apos;s <br />
                <span className="text-[#C9A84C]">AI Replacement Index</span>
              </h3>

              <p className="text-xs text-gray-300 font-light leading-relaxed">
                Enter your work email to receive an instant 90-second task automation risk score & 2026 survival blueprint.
              </p>
            </div>

            {/* Lead Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest block mb-1.5">
                  SELECT YOUR PROFESSION:
                </label>
                <select
                  value={selectedSlug}
                  onChange={(e) => setSelectedSlug(e.target.value)}
                  className="w-full bg-[#060A14] border border-[#C9A84C]/40 rounded-lg p-3 text-xs font-mono font-bold text-[#F8F6F0] focus:outline-none focus:border-[#C9A84C]"
                >
                  {professions.map((p) => (
                    <option key={p.slug} value={p.slug} className="bg-[#060A14] text-white">
                      {p.name} ({p.automation_risk}% Risk)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest block mb-1.5">
                  YOUR WORK EMAIL ADDRESS:
                </label>
                <input 
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#060A14] border border-[#C9A84C]/40 rounded-lg p-3 text-sm font-mono text-[#F8F6F0] placeholder:text-gray-600 focus:outline-none focus:border-[#C9A84C]"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#C9A84C] hover:bg-[#E6C875] text-[#060A14] py-4 rounded-lg font-mono font-black text-xs uppercase tracking-widest shadow-2xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {submitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <span>GENERATE FREE REPORT INSTANTLY</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Security Guarantee */}
            <div className="flex items-center justify-center gap-4 text-[10px] font-mono text-gray-400 pt-2 border-t border-white/5">
              <span className="flex items-center gap-1">
                <Lock className="w-3 h-3 text-[#C9A84C]" /> 100% Confidential
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-[#C9A84C]" /> Zero Spam
              </span>
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#C9A84C]" /> WEF Datasets
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
