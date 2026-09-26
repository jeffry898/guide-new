'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { User, ShoppingBag } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 premium-blur border-b border-brand-gold/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-serif font-bold text-brand-gold tracking-[0.2em] uppercase">GUIDR EMPIRE</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <Link href="/risk-report" className="text-[11px] font-bold uppercase tracking-widest text-brand-gold hover:opacity-80 transition-all border-b border-brand-gold/30 pb-0.5 animate-pulse">Free Risk Report</Link>
          <Link href="/dashboard" className="text-[11px] font-bold uppercase tracking-widest hover:text-brand-gold transition-colors">Marketplace</Link>
          <Link href="/#professions" className="text-[11px] font-bold uppercase tracking-widest hover:text-brand-gold transition-colors">Case Studies</Link>
          <Link href="/#how-it-works" className="text-[11px] font-bold uppercase tracking-widest hover:text-brand-gold transition-colors">Elite Access</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/login">
            <span className="text-[11px] font-bold uppercase tracking-widest text-brand-gold hover:opacity-80 cursor-pointer">Login</span>
          </Link>
          <Link href="/dashboard">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-brand-gold text-brand-background px-6 py-3 rounded-[2px] text-[11px] font-bold uppercase tracking-widest shadow-lg shadow-brand-gold/10"
            >
              Request Custom Blueprint
            </motion.button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
