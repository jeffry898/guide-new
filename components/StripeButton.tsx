'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Loader2 } from 'lucide-react';

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
      setError('Please enter a valid business email.');
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
        setError(data.error || 'Failed to initialize session.');
      }
    } catch (error) {
      console.error('Checkout failed:', error);
      setError('System error. Please contact GeniuzLab support.');
    } finally {
      setLoading(false);
    }
  };

  const defaultButtonClass = "w-full bg-[#C9A84C] text-[#0A0F1E] py-6 rounded-[2px] text-xl font-black shadow-2xl shadow-[#C9A84C]/20 flex items-center justify-center gap-4 group uppercase tracking-widest";

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-[10px] font-bold uppercase tracking-widest opacity-50 px-1">Delivery Destination</label>
        <input 
          type="email"
          placeholder="ENTER BUSINESS EMAIL..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-[2px] px-4 py-4 font-mono text-sm focus:outline-none focus:border-[#C9A84C]/50 transition-colors"
        />
        {error && <p className="text-red-500 text-[10px] font-bold uppercase px-1">{error}</p>}
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleCheckout}
        disabled={loading}
        id="purchase"
        className={className || defaultButtonClass}
      >
        {loading ? (
          <Loader2 className="w-6 h-6 animate-spin" />
        ) : (
          <>
            {customLabel || "GET INSTANT ACCESS"} <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </motion.button>
    </div>
  );
}
