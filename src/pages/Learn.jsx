import { motion } from 'framer-motion';
import useStore from '../context/useStore';
import PageHeader from '../components/PageHeader';
import GlassCard from '../components/GlassCard';
import StatCard from '../components/StatCard';
import ModuleCard from '../components/ModuleCard';
import modules from '../data/modules';
import tips from '../data/tips';
import news from '../data/news';

export default function Learn() {
  const streak = useStore((s) => s.streak);
  const ecoScore = useStore((s) => s.ecoScore);

  // Filter modules for this category
  const learnModules = modules.filter((mod) => mod.section === 'LEARN');

  return (
    <div className="pb-8">
      <PageHeader 
        title="Learn & Explore" 
        description="Expand your knowledge, simulate the environmental impact of your lifestyle choices, and stay updated."
      />

      {/* Grid of learning statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Active Streak */}
        <GlassCard className="p-6 relative overflow-hidden flex flex-col justify-between min-h-[160px] hover:border-[var(--color-violet)]/30 transition-all duration-300">
          <div className="font-mono text-[10px] uppercase tracking-widest text-[#737373] mb-2">Learning Streak</div>
          <div>
            <h3 className="text-4xl font-display font-bold text-white tracking-tight leading-none mb-2">
              {streak} <span className="text-lg font-sans font-light text-[#737373]">{streak === 1 ? 'day' : 'days'}</span>
            </h3>
            <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--color-violet)]">
              {streak > 0 ? 'Streak Active!' : 'Build awareness daily to start your streak'}
            </p>
          </div>
          <div className="border-t border-white/5 pt-3 mt-3 flex justify-between items-center text-[10px] text-[#737373]">
            <span>Activity Tracker</span>
            <span className="text-[#a3a3a3]">🔥 Live</span>
          </div>
        </GlassCard>

        {/* Tip Library Size */}
        <GlassCard className="p-6 flex flex-col justify-between min-h-[160px] hover:border-[var(--color-violet)]/30 transition-all duration-300">
          <div className="font-mono text-[10px] uppercase tracking-widest text-[#737373] mb-2">Tips Library</div>
          <div>
            <h3 className="text-4xl font-display font-bold text-white tracking-tight leading-none mb-2">
              {tips.length} <span className="text-lg font-sans font-light text-[#737373]">guides</span>
            </h3>
            <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--color-cyan)]">
              Across 5 Categories
            </p>
          </div>
          <div className="border-t border-white/5 pt-3 mt-3 flex justify-between items-center text-[10px] text-[#737373]">
            <span>Resource Hub</span>
            <span className="text-[var(--color-emerald)] font-bold">✓ Active</span>
          </div>
        </GlassCard>

        {/* News & Insights */}
        <GlassCard className="p-6 flex flex-col justify-between min-h-[160px] hover:border-[var(--color-violet)]/30 transition-all duration-300">
          <div className="font-mono text-[10px] uppercase tracking-widest text-[#737373] mb-2">News Articles</div>
          <div>
            <h3 className="text-4xl font-display font-bold text-white tracking-tight leading-none mb-2">
              {news.length} <span className="text-lg font-sans font-light text-[#737373]">published</span>
            </h3>
            <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#737373]">
              Curated daily articles
            </p>
          </div>
          <div className="border-t border-white/5 pt-3 mt-3 flex justify-between items-center text-[10px] text-[#737373]">
            <span>Insights Feed</span>
            <span className="text-[var(--color-emerald)] font-bold">✓ Updated</span>
          </div>
        </GlassCard>
      </div>

      {/* Modules List Grid */}
      <h2 className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#737373] mb-6">Learning Modules</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {learnModules.map((mod, i) => (
          <ModuleCard
            key={mod.id}
            icon={mod.icon}
            title={mod.title}
            description={mod.description}
            route={mod.route}
            status={mod.status}
            delay={0.1 + i * 0.1}
          />
        ))}
      </div>
    </div>
  );
}
