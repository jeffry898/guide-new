'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { ShieldAlert, ArrowRight, User, Sparkles } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="fixed top-0 w-full z-50 bg-[#060A14]/90 backdrop-blur-xl border-b border-[#C9A84C]/20 shadow-2xl">
      {/* Top Threat Ticker */}
      <div className="bg-[#DC2626]/10 border-b border-[#DC2626]/20 py-1 px-4 text-center">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 text-[10px] font-mono tracking-widest text-[#EF4444]">
          <span className="flex items-center gap-1 font-bold animate-pulse">
            <ShieldAlert className="w-3 h-3 text-[#EF4444]" /> LIVE 2026 INTELLIGENCE:
          </span>
          <span className="hidden sm:inline text-gray-300">
            WEF Reports 64% White-Collar Task Automation Risk Across USA, UK & Europe.
          </span>
          <Link href="/risk-report" className="underline font-bold text-[#F8F6F0] hover:text-[#C9A84C] transition-colors ml-1">
            CHECK YOUR RISK SCORE →
          </Link>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded bg-[#0A0F1E] border border-[#C9A84C] flex items-center justify-center shadow-[0_0_15px_rgba(201,168,76,0.3)] group-hover:border-[#E6C875] transition-colors">
            <Sparkles className="w-4 h-4 text-[#C9A84C]" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-serif font-bold text-[#F8F6F0] tracking-[0.15em] leading-none group-hover:text-[#C9A84C] transition-colors">
              GUIDR<span className="text-[#C9A84C]">.EMPIRE</span>
            </span>
            <span className="text-[8px] font-mono font-bold text-[#C9A84C]/60 tracking-[0.3em] uppercase">
              GENIUZLAB INTELLIGENCE
            </span>
          </div>
        </Link>
        
        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono font-bold tracking-widest text-gray-300">
          <Link href="/#professions" className="hover:text-[#C9A84C] transition-colors">
            PROTOCOLS
          </Link>
          <Link href="/risk-report" className="text-[#C9A84C] hover:text-[#E6C875] transition-colors flex items-center gap-1">
            <span>RISK ASSESSMENT</span>
            <span className="bg-red-600/80 text-white text-[8px] px-1.5 py-0.5 rounded font-black">FREE</span>
          </Link>
          <Link href="/dashboard" className="hover:text-[#C9A84C] transition-colors">
            MY VAULT
          </Link>
        </nav>

        {/* CTA Buttons */}
        <div className="flex items-center gap-3">
          <Link href="/login" className="hidden sm:block">
            <span className="text-xs font-mono font-bold tracking-widest text-[#C9A84C] hover:text-[#E6C875] transition-colors px-3 py-2">
              SIGN IN
            </span>
          </Link>

          <Link href="/risk-report">
            <motion.button 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="bg-[#C9A84C] hover:bg-[#E6C875] text-[#060A14] px-4 py-2 md:px-5 md:py-2.5 rounded text-xs font-mono font-black uppercase tracking-wider shadow-[0_0_20px_rgba(201,168,76,0.3)] transition-all flex items-center gap-1.5"
            >
              <span>ASSESS RISK</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </motion.button>
          </Link>
        </div>
      </div>
    </header>
  );
}
