'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Loader2, ShieldCheck, Lock, CheckCircle2 } from 'lucide-react';

interface StripeButtonProps {
  priceId?: string;
  professionSlug: string;
  price: number;
  className?: string;
  customLabel?: string;
}

export default function StripeButton({ professionSlug, price, className, customLabel }: StripeButtonProps) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleCheckout = async () => {
    if (!email || !email.includes('@')) {
      setError('Please enter a valid business email address.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const response = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          packageSlug: professionSlug, 
          professionSlug, 
          userEmail: email,
          price
        }),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || 'Failed to initialize checkout session.');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setError('System error initializing session. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const defaultButtonClass = "w-full bg-[#C9A84C] hover:bg-[#E6C875] text-[#060A14] py-5 px-6 rounded-lg text-lg font-black shadow-[0_0_30px_rgba(201,168,76,0.3)] hover:shadow-[0_0_40px_rgba(201,168,76,0.5)] flex items-center justify-center gap-3 group uppercase tracking-widest transition-all duration-300";

  return (
    <div className="space-y-4 w-full">
      <div className="space-y-2">
        <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#C9A84C] flex items-center gap-1.5">
          <Lock className="w-3 h-3" /> Secure Access Delivery Email
        </label>
        <input 
          type="email"
          placeholder="your.name@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleCheckout()}
          className="w-full bg-[#060A14] border border-[#C9A84C]/30 rounded-lg px-4 py-4 font-mono text-sm text-[#F8F6F0] placeholder:text-gray-600 focus:outline-none focus:border-[#C9A84C] transition-colors"
        />
        {error && (
          <p className="text-red-400 text-xs font-mono font-semibold pt-1">
            ⚠️ {error}
          </p>
        )}
      </div>

      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={handleCheckout}
        disabled={loading}
        id="purchase"
        className={className || defaultButtonClass}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>SECURE ENCRYPTING...</span>
          </span>
        ) : (
          <>
            <span>{customLabel || `ACTIVATE PROTOCOL — £${price}`}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </motion.button>

      {/* Trust Badges */}
      <div className="pt-2 flex items-center justify-between text-[10px] font-mono text-gray-400 border-t border-white/5">
        <span className="flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-[#C9A84C]" /> 256-bit SSL Encrypted
        </span>
        <span className="flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A84C]" /> Instant Access
        </span>
      </div>
    </div>
  );
}
