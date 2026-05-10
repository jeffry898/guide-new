'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { createClientComponentClient } from '@/lib/supabase';
import { Github, Mail, Shield, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const supabase = createClientComponentClient();

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL || location.origin}/dashboard` },
    });
    setLoading(false);
    if (error) setMessage(error.message);
    else setMessage('Check your email for the magic link!');
  };

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${process.env.NEXT_PUBLIC_APP_URL || location.origin}/dashboard` },
    });
  };

  return (
    <div className="min-h-screen bg-brand-background flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-gold/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full relative z-10"
      >
        <div className="text-center mb-12">
          <Link href="/" className="inline-flex items-center gap-2 mb-8">
            <span className="text-4xl font-serif font-black text-brand-gold tracking-tighter">GUIDR</span>
            <span className="text-[10px] font-mono uppercase tracking-[0.4em] opacity-40 mt-2">Empire</span>
          </Link>
          <h1 className="text-3xl font-black mb-2">SECURE ACCESS</h1>
          <p className="text-brand-light/60 font-mono text-[10px] uppercase tracking-widest">Protocol Sync Authorized Personnel Only</p>
        </div>

        <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-10 backdrop-blur-xl shadow-2xl">
          <button 
            onClick={signInWithGoogle}
            className="w-full flex items-center justify-center gap-4 py-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all font-bold mb-8 group"
          >
            <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
              <span className="text-brand-background text-[10px] font-black">G</span>
            </div>
            Sign in with Google
          </button>

          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5" />
            </div>
            <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest text-brand-light/20 bg-brand-background px-4 inline-block mx-auto transform translate-x-[150px]">
              Or Magic Link
            </div>
          </div>

          <form onSubmit={handleMagicLink} className="space-y-6">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-brand-gold mb-2 block">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="identity@sector.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-brand-gold transition-colors font-mono text-sm"
                required
              />
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full gold-gradient text-brand-background py-4 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 group"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>SEND PROTOCOL KEY <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>}
            </button>
          </form>

          {message && (
            <p className="mt-6 text-center text-xs font-mono text-brand-gold">{message}</p>
          )}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-white/5 bg-white/[0.02]">
            <Shield className="w-4 h-4 text-brand-gold" />
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">256-Bit Protocol Encryption Active</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
