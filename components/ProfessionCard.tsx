'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { Profession } from '@/lib/constants';
import { ArrowUpRight } from 'lucide-react';

interface ProfessionCardProps {
  profession: Profession;
}

export default function ProfessionCard({ profession }: ProfessionCardProps) {
  return (
    <Link href={`/product/${profession.slug}`}>
      <motion.div 
        whileHover={{ 
          y: -10,
          boxShadow: "0 30px 60px rgba(0,0,0,0.5), 0 0 20px rgba(201,168,76,0.1)",
          borderColor: "rgba(201,168,76,0.8)"
        }}
        className="group relative bg-[#0A0F1E] border border-[#C9A84C]/30 p-8 h-full flex flex-col transition-all duration-500 overflow-hidden"
      >
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
             style={{ backgroundImage: 'linear-gradient(#C9A84C 1px, transparent 1px), linear-gradient(90deg, #C9A84C 1px, transparent 1px)', backgroundSize: '15px 15px' }}>
        </div>

        {/* Corner Accents (Mini) */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#C9A84C]/50" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#C9A84C]/50" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#C9A84C]/50" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#C9A84C]/50" />

        {/* 2026 EDITION Small Stamp */}
        <div className="absolute top-4 left-6 border border-[#C9A84C]/20 px-2 py-0.5 -rotate-6">
          <span className="text-[7px] font-mono font-black text-[#C9A84C]/40 tracking-widest uppercase">2026 ISSUE</span>
        </div>

        {/* Risk Badge */}
        <div className="absolute top-4 right-4 bg-red-600 px-2 py-1 flex items-center gap-1 shadow-[0_0_15px_rgba(220,38,38,0.2)]">
          <span className="text-[8px] font-black font-mono text-white uppercase tracking-tighter">{profession.automation_risk}% RISK</span>
        </div>

        <div className="mt-12 flex flex-col items-center flex-grow">
          <div className="text-7xl mb-8 group-hover:scale-110 transition-transform duration-500 filter drop-shadow-[0_0_15px_rgba(201,168,76,0.3)]">
            {profession.icon || '💼'}
          </div>
          
          <h4 className="text-2xl font-serif font-bold text-[#F8F6F0] leading-tight text-center group-hover:text-[#C9A84C] transition-colors mb-3">
            {profession.name}
          </h4>
          
          <p className="text-[9px] text-[#C9A84C]/60 uppercase tracking-[0.3em] font-black text-center">
            INTELLIGENCE PROTOCOL
          </p>
        </div>

        <div className="mt-12 flex justify-between items-center pt-6 border-t border-[#C9A84C]/10">
          <span className="text-[10px] font-mono font-black text-[#C9A84C] tracking-[0.2em] group-hover:tracking-[0.3em] transition-all">DECRYPT REPORT</span>
          <ArrowUpRight className="w-4 h-4 text-[#C9A84C]/40 group-hover:text-[#C9A84C] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
        </div>

        {/* Hover Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </motion.div>
    </Link>
  );
}
