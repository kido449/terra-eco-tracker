import { motion } from 'framer-motion';
import useStore from '../context/useStore';
import PageHeader from '../components/PageHeader';
import GlassCard from '../components/GlassCard';
import StatCard from '../components/StatCard';
import ModuleCard from '../components/ModuleCard';
import modules from '../data/modules';
import { archetypes } from '../data/quiz';
import { Link } from 'react-router-dom';

export default function Assess() {
  const ecoScore = useStore((s) => s.ecoScore);
  const quizCompleted = useStore((s) => s.quizCompleted);
  const quizArchetype = useStore((s) => s.quizArchetype);
  const calculatorResults = useStore((s) => s.calculatorResults);
  const blindSpotsViewed = useStore((s) => s.blindSpotsViewed);

  // Filter modules for this category
  const assessModules = modules.filter((mod) => mod.section === 'ASSESS');
  const archetypeInfo = quizCompleted && quizArchetype ? archetypes[quizArchetype] : null;

  return (
    <div className="pb-8">
      <PageHeader 
        title="Assess Your Impact" 
        description="Establish your baseline, find blind spots in your habits, and understand your carbon footprint profile."
      />

      {/* Grid of assessment statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Eco Score & Tier */}
        <GlassCard className="p-6 relative overflow-hidden flex flex-col justify-between min-h-[160px] hover:border-[var(--color-violet)]/30 transition-all duration-300">
          <div className="font-mono text-[10px] uppercase tracking-widest text-[#737373] mb-2">Sustainability Level</div>
          <div>
            <h3 className="text-4xl font-display font-bold text-white tracking-tight leading-none mb-2">
              {ecoScore} <span className="text-lg font-sans font-light text-[#737373]">/ 100</span>
            </h3>
            <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--color-cyan)]">
              Tier: {useStore.getState().getTier()}
            </p>
          </div>
          <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mt-4">
            <div 
              className="bg-gradient-to-r from-[var(--color-violet)] to-[var(--color-cyan)] h-full rounded-full" 
              style={{ width: `${ecoScore}%` }}
            />
          </div>
        </GlassCard>

        {/* Archetype Card */}
        <GlassCard className="p-6 flex flex-col justify-between min-h-[160px] hover:border-[var(--color-violet)]/30 transition-all duration-300">
          <div className="font-mono text-[10px] uppercase tracking-widest text-[#737373] mb-2">Eco Personality</div>
          {quizCompleted && archetypeInfo ? (
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-[12px] bg-[var(--color-violet)]/10 flex items-center justify-center text-3xl shrink-0 shadow-[inset_0_0_12px_rgba(139,92,246,0.2)]">
                {archetypeInfo.emoji}
              </div>
              <div>
                <h4 className="font-display text-2xl text-white tracking-tight leading-none mb-1">{archetypeInfo.name}</h4>
                <p className="font-mono text-[8px] uppercase tracking-wider text-[#a3a3a3] line-clamp-1">{archetypeInfo.tagline}</p>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-sm text-[#a3a3a3] leading-relaxed mb-3">Your Eco Personality is unknown. Build awareness by discovering your archetype.</p>
              <Link 
                to="/assess/personality" 
                className="inline-block font-mono text-[9px] uppercase tracking-widest font-bold text-[var(--color-violet)] hover:text-white transition-colors"
              >
                Take Quiz →
              </Link>
            </div>
          )}
          <div className="border-t border-white/5 pt-3 mt-3 flex justify-between items-center text-[10px] text-[#737373]">
            <span>Archetype Quiz</span>
            <span className={quizCompleted ? 'text-[var(--color-emerald)] font-bold' : 'text-[#737373]'}>
              {quizCompleted ? '✓ Completed' : 'Pending'}
            </span>
          </div>
        </GlassCard>

        {/* Carbon Footprint Card */}
        <GlassCard className="p-6 flex flex-col justify-between min-h-[160px] hover:border-[var(--color-violet)]/30 transition-all duration-300">
          <div className="font-mono text-[10px] uppercase tracking-widest text-[#737373] mb-2">Annual Carbon Footprint</div>
          {calculatorResults ? (
            <div>
              <h3 className="text-4xl font-display font-bold text-white tracking-tight leading-none mb-1">
                {(calculatorResults.total / 1000).toFixed(1)}
                <span className="text-sm font-sans font-light text-[#737373] ml-1.5">tonnes CO₂</span>
              </h3>
              <p className="font-mono text-[8px] uppercase tracking-wider text-[var(--color-emerald)]">
                {calculatorResults.total < 5000 ? 'Low Footprint' : calculatorResults.total < 12000 ? 'Moderate' : 'High Footprint'}
              </p>
            </div>
          ) : (
            <div>
              <p className="text-sm text-[#a3a3a3] leading-relaxed mb-3">Your footprint is unknown. Take the first step toward awareness by calculating your baseline.</p>
              <Link 
                to="/assess/calculator" 
                className="inline-block font-mono text-[9px] uppercase tracking-widest font-bold text-[var(--color-cyan)] hover:text-white transition-colors"
              >
                Calculate Now →
              </Link>
            </div>
          )}
          <div className="border-t border-white/5 pt-3 mt-3 flex justify-between items-center text-[10px] text-[#737373]">
            <span>Calculator</span>
            <span className={calculatorResults ? 'text-[var(--color-emerald)] font-bold' : 'text-[#737373]'}>
              {calculatorResults ? '✓ Calculated' : 'Pending'}
            </span>
          </div>
        </GlassCard>
      </div>

      {/* Modules List Grid */}
      <h2 className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#737373] mb-6">Assessment Modules</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {assessModules.map((mod, i) => (
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
