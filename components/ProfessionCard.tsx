'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { Profession } from '@/lib/constants';
import { ArrowUpRight, AlertTriangle } from 'lucide-react';

interface ProfessionCardProps {
  profession: Profession;
}

const getIconEmoji = (iconName: string) => {
  const map: Record<string, string> = {
    'Scissors': '✂️',
    'GraduationCap': '🎓',
    'Photographer': '📷',
    'Camera': '📷',
    'Palette': '🎨',
    'Utensils': '🍽️',
    'Calculator': '🧮',
    'Building': '🏢',
    'Stethoscope': '🩺',
    'Dumbbell': '🏋️‍♂️',
    'Hotel': '🏨',
    'Flower2': '💐',
    'Scale': '⚖️',
    'HeartPulse': '🩺',
    'Wrench': '🔧',
    'Zap': '⚡',
    'TrendingUp': '📈',
    'Bot': '🤖',
    'PenTool': '🖊️',
    'Share2': '📢',
    'ChefHat': '👨‍🍳',
    'BarChart3': '📊',
    'Code': '💻',
    'Database': '🗄️',
    'Users': '👥',
    'Compass': '📐',
    'Briefcase': '💼',
    'Kanban': '📋',
    'Globe': '🌐'
  };
  return map[iconName] || '💼';
};

export default function ProfessionCard({ profession }: ProfessionCardProps) {
  const imageSrc = `/images/guides/${profession.slug}.jpg`;
  const iconEmoji = getIconEmoji(profession.icon);

  return (
    <Link href={`/product/${profession.slug}`}>
      <motion.div 
        whileHover={{ 
          y: -8,
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.9), 0 0 30px rgba(201,168,76,0.25)",
          borderColor: "rgba(201,168,76,0.8)"
        }}
        className="group relative bg-[#060A14] border border-[#C9A84C]/30 rounded-xl overflow-hidden h-full flex flex-col transition-all duration-500 shadow-2xl"
      >
        {/* Cover Image Header */}
        <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#0A0F1E] border-b border-[#C9A84C]/20">
          <img 
            src={imageSrc} 
            alt={`AI Survival Guide for ${profession.name}`}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 filter contrast-[1.03]"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          
          {/* Subtle Top & Bottom Image Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#060A14] via-transparent to-black/40 opacity-70" />

          {/* Risk Badge */}
          <div className="absolute top-3 right-3 bg-red-600/90 backdrop-blur-md border border-red-400/40 px-2.5 py-1 rounded shadow-lg flex items-center gap-1.5 z-10">
            <AlertTriangle className="w-3 h-3 text-white" />
            <span className="text-[9px] font-black font-mono text-white uppercase tracking-wider">{profession.automation_risk}% RISK</span>
          </div>

          {/* 2026 ISSUE Stamp */}
          <div className="absolute top-3 left-3 bg-[#0A0F1E]/80 backdrop-blur-md border border-[#C9A84C]/40 px-2 py-0.5 rounded -rotate-3 z-10">
            <span className="text-[8px] font-mono font-bold text-[#C9A84C] tracking-widest uppercase">2026 ISSUE</span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 flex flex-col flex-grow relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl filter drop-shadow-[0_0_8px_rgba(201,168,76,0.4)]">{iconEmoji}</span>
            <span className="text-[9px] text-[#C9A84C] uppercase tracking-[0.25em] font-mono font-bold">
              SURVIVAL PROTOCOL
            </span>
          </div>

          <h4 className="text-xl font-serif font-bold text-[#F8F6F0] leading-tight group-hover:text-[#C9A84C] transition-colors mb-2">
            {profession.name}
          </h4>

          <p className="text-xs text-gray-400 line-clamp-2 mb-4 font-light leading-relaxed">
            {profession.headline || profession.subheadline || `Comprehensive AI survival guide and intelligence protocol.`}
          </p>

          <div className="mt-auto pt-4 border-t border-[#C9A84C]/15 flex justify-between items-center">
            <span className="text-xs font-mono font-bold text-[#C9A84C] tracking-wider group-hover:tracking-widest transition-all">
              VIEW BLUEPRINT
            </span>
            <ArrowUpRight className="w-4 h-4 text-[#C9A84C]/50 group-hover:text-[#C9A84C] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
          </div>
        </div>

        {/* Hover Highlight Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#C9A84C]/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </motion.div>
    </Link>
  );
}
