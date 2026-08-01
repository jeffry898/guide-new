'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import ProfessionCard from '@/components/ProfessionCard';
import { Profession } from '@/lib/constants';
import { getProfessions } from '@/lib/professions-api';
import { Search, Loader2, Award, ArrowLeft, Grid, Filter } from 'lucide-react';
import Link from 'next/link';

export default function DirectoryClient() {
  const [professions, setProfessions] = useState<Profession[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  useEffect(() => {
    async function fetchProfessions() {
      try {
        const data = await getProfessions();
        setProfessions(data);
      } catch (err) {
        console.error('Error fetching professions:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchProfessions();
  }, []);

  const categories = ['ALL', 'FINANCE & LEGAL', 'TECH & DATA', 'SERVICES & RETAIL', 'CREATIVE & DESIGN'];

  const filteredProfessions = professions.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.slug.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (selectedCategory === 'FINANCE & LEGAL') {
      return ['accountant', 'lawyer', 'paralegal', 'financial-analyst', 'tax-consultant', 'insurance-broker', 'real-estate-agent'].includes(p.slug);
    }
    if (selectedCategory === 'TECH & DATA') {
      return ['software-engineer', 'data-scientist', 'project-manager', 'executive-assistant', 'hr-manager', 'translator'].includes(p.slug);
    }
    if (selectedCategory === 'SERVICES & RETAIL') {
      return ['hair-salon', 'restaurant-owner', 'hotel-owner', 'florist', 'plumber', 'electrician', 'chef', 'dentist', 'nurse', 'teacher', 'personal-trainer', 'virtual-assistant'].includes(p.slug);
    }
    if (selectedCategory === 'CREATIVE & DESIGN') {
      return ['freelance-designer', 'graphic-designer', 'copywriter', 'social-media-manager', 'photographer', 'architect', 'marketing-manager'].includes(p.slug);
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-[#060A14] text-[#F8F6F0] selection:bg-[#C9A84C] selection:text-[#060A14]">
      <Navbar />

      <main className="pt-32 pb-32 px-6 max-w-7xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-mono text-[#C9A84C] hover:underline mb-8">
          <ArrowLeft className="w-4 h-4" /> Return to Homepage
        </Link>

        {/* Directory Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#C9A84C]/10 border border-[#C9A84C]/30 rounded text-[10px] font-mono font-bold text-[#C9A84C] uppercase tracking-widest">
            <Award className="w-3.5 h-3.5" /> GLOBAL PROFESSION DIRECTORY
          </div>

          <h1 className="text-4xl md:text-6xl font-serif font-bold text-[#F8F6F0]">
            Browse All Professional AI Survival Protocols
          </h1>

          <p className="text-gray-300 text-sm font-light leading-relaxed">
            Search 50+ specialized industry protocols engineered to automate administrative workloads and secure white-collar careers against AI displacement.
          </p>

          {/* Search Input Box */}
          <div className="relative max-w-xl mx-auto pt-4">
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-[#C9A84C]" />
              <input 
                type="text"
                placeholder="Search by job title (e.g., Software Engineer, Accountant, Dentist)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0A0F1E] border-2 border-[#C9A84C]/40 rounded-xl py-4 pl-12 pr-4 text-sm font-mono text-[#F8F6F0] placeholder:text-gray-500 focus:outline-none focus:border-[#C9A84C] shadow-2xl"
              />
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-mono font-bold tracking-wider transition-all border ${
                  selectedCategory === cat
                    ? 'bg-[#C9A84C] text-[#060A14] border-[#C9A84C] shadow-[0_0_15px_rgba(201,168,76,0.3)]'
                    : 'bg-[#0A0F1E] text-gray-300 border-white/10 hover:border-[#C9A84C]/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Directory Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <Loader2 className="w-10 h-10 text-[#C9A84C] animate-spin" />
            <span className="text-xs font-mono text-[#C9A84C] uppercase tracking-widest">Loading Industry Database...</span>
          </div>
        ) : filteredProfessions.length === 0 ? (
          <div className="text-center py-16 bg-[#0A0F1E] border border-white/10 rounded-2xl p-8 max-w-md mx-auto space-y-3">
            <p className="text-lg font-serif">No protocols matching &quot;{searchQuery}&quot;</p>
            <p className="text-xs font-mono text-gray-400">Try searching for generic terms like &quot;Engineer&quot;, &quot;Manager&quot;, or &quot;Designer&quot;.</p>
            <button onClick={() => setSearchQuery('')} className="text-xs font-mono text-[#C9A84C] underline pt-2">
              Clear Search Query
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProfessions.map((prof) => (
              <ProfessionCard key={prof.id || prof.slug} profession={prof} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
