import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageHeader from '../components/PageHeader';
import GlassCard from '../components/GlassCard';
import tips from '../data/tips';

const categories = ['All', 'Water', 'Energy', 'Transport', 'Diet', 'Waste'];

const categoryColors = {
  Water: 'bg-white border-[var(--color-hairline)] text-[var(--color-forest)]',
  Energy: 'bg-[var(--color-gold)]/10 border-[var(--color-hairline)] text-[var(--color-forest)]',
  Transport: 'bg-[var(--color-mint)]/10 border-[var(--color-hairline)] text-[var(--color-forest)]',
  Diet: 'bg-[var(--color-coral)]/10 border-[var(--color-hairline)] text-[var(--color-forest)]',
  Waste: 'bg-black/5 border-[var(--color-hairline)] text-[var(--color-forest)]',
};

export default function LearningHub() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = useMemo(() => {
    return tips.filter((tip) => {
      const matchesCategory = activeCategory === 'All' || tip.category === activeCategory;
      const matchesSearch =
        search === '' ||
        tip.title.toLowerCase().includes(search.toLowerCase()) ||
        tip.tip.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  return (
    <div>
      <PageHeader
        title="Learning Hub"
        description="Browse actionable sustainability tips backed by research. Filter by category or search for specific topics."
      />

      <div className="mb-10 space-y-6">
        <div>
          <label className="block font-mono text-[10px] font-bold uppercase tracking-widest text-[#737373] mb-3">Search Library</label>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tips..."
            className="w-full max-w-md px-6 py-4 rounded-full bg-[var(--color-dark)]/50 border border-white/10 text-sm text-white placeholder-[#525252] focus:outline-none focus:border-[var(--color-cyan)] focus:ring-1 focus:ring-[var(--color-cyan)] shadow-[inset_0_0_10px_rgba(0,0,0,0.5)] transition-all"
          />
        </div>
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full font-mono text-[10px] font-bold uppercase tracking-widest transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-cyan)] shadow-sm ${
                activeCategory === cat
                  ? 'border border-[var(--color-cyan)] bg-[var(--color-cyan)]/10 text-[var(--color-cyan)] shadow-[inset_0_0_12px_rgba(6,182,212,0.2)]'
                  : 'border border-white/10 bg-[var(--color-dark)] text-[#737373] hover:border-[var(--color-violet)]/40 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filtered.map((tip) => (
            <motion.div
              key={tip.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="bg-[#080808]/80 backdrop-blur-md rounded-[24px] border border-white/5 p-8 h-full flex flex-col shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:border-[var(--color-cyan)]/30 hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.15)] transition-all duration-300 group"
            >
              <span className="self-start rounded-full px-4 py-1.5 border border-[var(--color-violet)]/30 bg-[var(--color-violet)]/10 font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--color-violet)] mb-6 shadow-[inset_0_0_8px_rgba(139,92,246,0.2)]">
                {tip.category}
              </span>
              <h3 className="text-xl font-display text-white mb-3 leading-snug group-hover:text-[var(--color-cyan)] transition-colors">{tip.title}</h3>
              <p className="text-sm text-[#a3a3a3] leading-relaxed flex-1 mb-6">{tip.tip}</p>
              <p className="font-mono text-[10px] uppercase tracking-widest text-[#525252]">📎 {tip.source}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <GlassCard className="text-center py-16 mt-8">
          <p className="font-mono text-[12px] font-bold uppercase tracking-widest text-[#737373]">No tips match your search. Try a different keyword or category.</p>
        </GlassCard>
      )}
    </div>
  );
}
