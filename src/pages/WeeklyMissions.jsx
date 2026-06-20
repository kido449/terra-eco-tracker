import { motion } from 'framer-motion';
import useStore from '../context/useStore';
import PageHeader from '../components/PageHeader';
import GlassCard from '../components/GlassCard';
import ProgressBar from '../components/ProgressBar';
import missions from '../data/missions';

export default function WeeklyMissions() {
  const completedMissions = useStore((s) => s.completedMissions);
  const completeMission = useStore((s) => s.completeMission);
  const ecoScore = useStore((s) => s.ecoScore);

  return (
    <div>
      <PageHeader
        title="Weekly Missions"
        description="Complete actionable eco-missions each week to build habits and earn score boosts."
      >
        <div className="hidden sm:block text-right">
          <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Current Score</p>
          <p className="text-xl font-bold text-mint tabular-nums">{ecoScore}</p>
        </div>
      </PageHeader>

      <div className="max-w-2xl mx-auto space-y-6">
        <GlassCard delay={0.1} className="p-8">
          <ProgressBar
            value={completedMissions.length}
            max={missions.length}
            label="Weekly Progress"
            className="mb-4"
          />
          <p className="font-mono text-[10px] uppercase tracking-widest text-[#525252] text-center">
            Complete all {missions.length} missions for a bonus badge!
          </p>
        </GlassCard>

        <div className="space-y-4">
          {missions.map((mission, i) => {
            const isCompleted = completedMissions.includes(mission.id);

            return (
              <motion.div
                key={mission.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 + 0.2, ease: [0.23, 1, 0.32, 1] }}
              >
                <div className={`relative overflow-hidden p-5 rounded-[20px] transition-all duration-300 border ${
                  isCompleted 
                    ? 'border-[var(--color-emerald)]/30 bg-[var(--color-emerald)]/5 shadow-[inset_0_0_20px_rgba(16,185,129,0.1)]' 
                    : 'border-white/5 bg-[#080808]/80 backdrop-blur-md hover:bg-white/5 hover:border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)]'
                }`}>
                  <div className="flex items-center gap-5">
                    {/* Checkbox */}
                    <button
                      onClick={() => completeMission(mission.id)}
                      disabled={isCompleted}
                      className={`shrink-0 flex items-center justify-center w-8 h-8 rounded-[10px] border-[2px] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-cyan)] ${
                        isCompleted
                          ? 'bg-[var(--color-emerald)] border-[var(--color-emerald)] text-[#080808] shadow-[0_0_10px_var(--color-emerald)]'
                          : 'border-white/20 bg-black/40 text-transparent hover:border-[var(--color-cyan)]/60'
                      }`}
                      aria-label={isCompleted ? 'Mission completed' : 'Mark mission as complete'}
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </button>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1.5">
                        <span className={`text-2xl filter drop-shadow-[0_0_5px_rgba(255,255,255,0.3)] ${isCompleted ? 'grayscale opacity-50' : ''}`}>{mission.icon}</span>
                        <h3 className={`text-lg font-display tracking-wide truncate transition-colors ${
                          isCompleted ? 'text-[#737373] line-through decoration-[#737373]' : 'text-white'
                        }`}>
                          {mission.title}
                        </h3>
                        <span className={`ml-auto shrink-0 font-mono text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${
                          isCompleted 
                            ? 'text-[#525252] border-white/5 bg-white/5' 
                            : 'text-[var(--color-cyan)] border-[var(--color-cyan)]/30 bg-[var(--color-cyan)]/10 shadow-[inset_0_0_8px_rgba(6,182,212,0.2)]'
                        }`}>
                          +{mission.points} pts
                        </span>
                      </div>
                      <p className={`text-sm leading-relaxed transition-colors ${
                        isCompleted ? 'text-[#525252]' : 'text-[#a3a3a3]'
                      }`}>
                        {mission.description}
                      </p>
                    </div>
                  </div>

                  {/* Confetti overlay when completed */}
                  {isCompleted && (
                    <motion.div
                      initial={{ opacity: 1, scale: 0.8 }}
                      animate={{ opacity: 0, scale: 1.1 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="absolute inset-0 pointer-events-none flex items-center justify-center"
                    >
                      <div className="w-full h-full bg-gradient-to-r from-transparent via-[var(--color-emerald)]/20 to-transparent" />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
