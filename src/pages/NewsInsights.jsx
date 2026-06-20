import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageHeader from '../components/PageHeader';
import GlassCard from '../components/GlassCard';
import news from '../data/news';

const categories = ['All', 'Policy', 'Energy', 'Diet', 'Waste', 'Technology', 'Health', 'Transport', 'Biodiversity'];

export default function NewsInsights() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredNews = useMemo(() => {
    if (activeCategory === 'All') return news;
    return news.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <div>
      <PageHeader
        title="News & Insights"
        description="Stay updated with the latest breakthroughs, policy changes, and trends in global sustainability."
      />

      <div className="flex flex-wrap gap-3 mb-10">
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

      <div className="max-w-3xl space-y-6">
        <AnimatePresence mode="popLayout">
          {filteredNews.map((item, i) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, delay: i * 0.05, ease: [0.23, 1, 0.32, 1] }}
            >
              <div className="bg-[#080808]/80 backdrop-blur-md rounded-[24px] border border-white/5 p-6 shadow-[0_0_20px_rgba(0,0,0,0.5)] relative overflow-hidden group hover:border-[var(--color-cyan)]/30 hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.15)] transition-all duration-300">
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="sm:w-32 shrink-0">
                    <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#737373]">{new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                    <span className="inline-block mt-3 px-3 py-1 rounded-full border border-[var(--color-violet)]/30 bg-[var(--color-violet)]/10 font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--color-violet)] shadow-[inset_0_0_8px_rgba(139,92,246,0.2)]">
                      {item.category}
                    </span>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-display text-white mb-3 group-hover:text-[var(--color-cyan)] transition-colors">
                      {item.headline}
                    </h3>
                    <p className="text-sm text-[#a3a3a3] leading-relaxed mb-6">
                      {item.summary}
                    </p>
                    <div className="flex items-center justify-between border-t border-white/5 pt-4">
                      <p className="font-mono text-[10px] uppercase tracking-widest text-[#525252]">Source: {item.source}</p>
                      <a
                        href={item.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--color-cyan)] hover:text-white flex items-center gap-2 focus-visible:outline-none transition-colors"
                      >
                        Read Article
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredNews.length === 0 && (
          <GlassCard className="text-center py-16">
            <p className="font-mono text-[12px] font-bold uppercase tracking-widest text-[#737373]">No news articles found for this category.</p>
          </GlassCard>
        )}
      </div>
    </div>
  );
}
