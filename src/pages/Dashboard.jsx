import { useState, useCallback } from 'react';
import useStore from '../context/useStore';
import { getTier } from '../context/useStore';
import DashboardHero from '../components/DashboardHero';
import StatCard from '../components/StatCard';
import GlassCard from '../components/GlassCard';
import ModuleCard from '../components/ModuleCard';
import facts from '../data/facts';
import modules from '../data/modules';

export default function Dashboard() {
  const userName = useStore((s) => s.userName);
  const ecoScore = useStore((s) => s.ecoScore);
  const streak = useStore((s) => s.streak);
  const completedMissions = useStore((s) => s.completedMissions);
  const unlockedBadges = useStore((s) => s.unlockedBadges);
  const greeting = useStore((s) => s.greeting);

  const tier = getTier(ecoScore);

  const [factIndex, setFactIndex] = useState(() => Math.floor(Math.random() * facts.length));
  const currentFact = facts[factIndex];
  const [copied, setCopied] = useState(false);

  const nextFact = useCallback(() => {
    setFactIndex((prev) => (prev + 1) % facts.length);
    setCopied(false);
  }, []);

  const copyFact = useCallback(() => {
    navigator.clipboard.writeText(currentFact.fact).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [currentFact]);

  return (
    <div className="pb-8">
      <DashboardHero />

      {/* Stat Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        <StatCard icon="🌱" label="Eco Score" value={ecoScore} suffix={`/ 100`} delay={0.1} />
        <StatCard icon="🔥" label="Streak" value={streak} suffix="days" delay={0.15} />
        <StatCard icon="🎯" label="Missions" value={completedMissions.length} suffix="done" delay={0.2} />
        <StatCard icon="🏆" label="Badges" value={unlockedBadges.length} suffix="unlocked" delay={0.25} />
      </div>

      <div className="flex flex-col gap-12">
        {/* Daily Eco Fact - Glass Block */}
        <div>
          <h2 className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#737373] mb-4">Daily Insight</h2>
          <div className="bg-[rgba(10,10,10,0.7)] backdrop-blur-[16px] border border-white/5 rounded-[24px] p-6 shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-[12px] bg-[var(--color-violet)]/10 flex items-center justify-center text-xl shrink-0 shadow-[inset_0_0_12px_rgba(139,92,246,0.2)]">
                  💡
                </div>
                <div>
                  <h3 className="font-display text-2xl text-white tracking-tight leading-none mb-1">{currentFact.category}</h3>
                  <p className="font-mono text-[10px] font-bold text-[#737373] uppercase tracking-widest">Source: {currentFact.source}</p>
                </div>
              </div>
              <button
                onClick={nextFact}
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center shrink-0 hover:bg-white hover:text-black hover:border-white transition-colors focus-visible:outline-none"
              >
                <svg className="w-5 h-5 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <p className="text-sm text-[#a3a3a3] leading-relaxed">{currentFact.fact}</p>
          </div>
        </div>

        {/* Explore Modules Grid */}
        <div id="explore-modules">
          <h2 className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#737373] mb-6">Explore Modules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((mod, i) => (
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
      </div>
    </div>
  );
}
