import { motion } from 'framer-motion';
import useStore from '../context/useStore';
import PageHeader from '../components/PageHeader';
import GlassCard from '../components/GlassCard';
import StatCard from '../components/StatCard';
import ModuleCard from '../components/ModuleCard';
import modules from '../data/modules';

export default function Act() {
  const streak = useStore((s) => s.streak);
  const completedMissions = useStore((s) => s.completedMissions);
  const totalCO2Saved = useStore((s) => s.totalCO2Saved);
  const unlockedBadges = useStore((s) => s.unlockedBadges);

  // Filter modules for this category
  const actModules = modules.filter((mod) => mod.section === 'ACT');

  return (
    <div className="pb-8">
      <PageHeader 
        title="Take Action" 
        description="Build sustainable daily habits, complete weekly eco-missions, unlock badges, and offset remaining emissions."
      />

      {/* Grid of action statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        {/* Carbon Offset/Savings */}
        <GlassCard className="p-6 flex flex-col justify-between min-h-[140px] hover:border-[var(--color-violet)]/30 transition-all duration-300">
          <div className="font-mono text-[10px] uppercase tracking-widest text-[#737373] mb-2">Total CO₂ Saved</div>
          <div>
            <h3 className="text-3xl font-display font-bold text-white tracking-tight leading-none mb-1">
              {totalCO2Saved} <span className="text-sm font-sans font-light text-[#737373]">kg</span>
            </h3>
            <p className="font-mono text-[8px] uppercase tracking-wider text-[var(--color-emerald)]">
              All-time savings
            </p>
          </div>
        </GlassCard>

        {/* Streak */}
        <GlassCard className="p-6 flex flex-col justify-between min-h-[140px] hover:border-[var(--color-violet)]/30 transition-all duration-300">
          <div className="font-mono text-[10px] uppercase tracking-widest text-[#737373] mb-2">Eco Streak</div>
          <div>
            <h3 className="text-3xl font-display font-bold text-white tracking-tight leading-none mb-1">
              {streak} <span className="text-sm font-sans font-light text-[#737373]">{streak === 1 ? 'day' : 'days'}</span>
            </h3>
            <p className="font-mono text-[8px] uppercase tracking-wider text-[#a3a3a3]">
              Active streak
            </p>
          </div>
        </GlassCard>

        {/* Missions Completed */}
        <GlassCard className="p-6 flex flex-col justify-between min-h-[140px] hover:border-[var(--color-violet)]/30 transition-all duration-300">
          <div className="font-mono text-[10px] uppercase tracking-widest text-[#737373] mb-2">Missions Done</div>
          <div>
            <h3 className="text-3xl font-display font-bold text-white tracking-tight leading-none mb-1">
              {completedMissions.length} <span className="text-sm font-sans font-light text-[#737373]">done</span>
            </h3>
            <p className="font-mono text-[8px] uppercase tracking-wider text-[var(--color-cyan)]">
              This week
            </p>
          </div>
        </GlassCard>

        {/* Badges Unlocked */}
        <GlassCard className="p-6 flex flex-col justify-between min-h-[140px] hover:border-[var(--color-violet)]/30 transition-all duration-300">
          <div className="font-mono text-[10px] uppercase tracking-widest text-[#737373] mb-2">Badges Unlocked</div>
          <div>
            <h3 className="text-3xl font-display font-bold text-white tracking-tight leading-none mb-1">
              {unlockedBadges.length} <span className="text-sm font-sans font-light text-[#737373]">badges</span>
            </h3>
            <p className="font-mono text-[8px] uppercase tracking-wider text-[var(--color-violet)]">
              Eco achievements
            </p>
          </div>
        </GlassCard>
      </div>

      {/* Modules List Grid */}
      <h2 className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#737373] mb-6">Action Modules</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {actModules.map((mod, i) => (
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
