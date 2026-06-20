import { useMemo } from 'react';
import { motion } from 'framer-motion';
import useStore from '../context/useStore';
import PageHeader from '../components/PageHeader';
import GlassCard from '../components/GlassCard';

export default function MyEcoStory() {
  const actionHistory = useStore((s) => s.actionHistory);
  const quizCompleted = useStore((s) => s.quizCompleted);
  const quizArchetype = useStore((s) => s.quizArchetype);
  const unlockedBadges = useStore((s) => s.unlockedBadges);
  const totalCO2Saved = useStore((s) => s.totalCO2Saved);
  const streak = useStore((s) => s.streak);

  const timeline = useMemo(() => {
    const entries = [];

    actionHistory.forEach((action) => {
      const labels = { transit: 'Took Transit', vegan: 'Ate Vegan', ac: 'Turned Off AC' };
      entries.push({
        type: 'action',
        icon: action.category === 'transport' ? '🚌' : action.category === 'diet' ? '🌱' : '⚡',
        title: labels[action.type] || action.type,
        detail: `Saved ${action.saving} kg CO₂`,
        date: action.timestamp,
        category: action.category,
      });
    });

    if (quizCompleted) {
      entries.push({
        type: 'quiz',
        icon: '🧬',
        title: 'Discovered Eco Personality',
        detail: `You are "${quizArchetype ? quizArchetype.charAt(0).toUpperCase() + quizArchetype.slice(1) : ''}" archetype`,
        date: new Date().toISOString(),
        category: 'milestone',
      });
    }

    unlockedBadges.forEach((badgeId) => {
      entries.push({
        type: 'badge',
        icon: '🏆',
        title: 'Badge Unlocked',
        detail: badgeId.replace('badge-', '').replace(/-/g, ' '),
        date: new Date().toISOString(),
        category: 'milestone',
      });
    });

    entries.sort((a, b) => new Date(b.date) - new Date(a.date));

    return entries;
  }, [actionHistory, quizCompleted, quizArchetype, unlockedBadges]);

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatTime = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div>
      <PageHeader
        title="My Eco Story"
        description="Your auto-generated sustainability journey timeline."
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        <div className="bg-[#080808]/80 backdrop-blur-md rounded-[24px] border border-white/5 p-8 text-center shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
          <p className="text-5xl font-bold text-[var(--color-cyan)] tracking-tight font-display drop-shadow-[0_0_10px_rgba(6,182,212,0.4)]">{totalCO2Saved.toFixed(1)}</p>
          <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#737373] mt-3">Total kg CO₂ Saved</p>
        </div>
        <div className="bg-[#080808]/80 backdrop-blur-md rounded-[24px] border border-white/5 p-8 text-center shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
          <p className="text-5xl font-bold text-[#f59e0b] tracking-tight font-display drop-shadow-[0_0_10px_rgba(245,158,11,0.4)]">{streak}</p>
          <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#737373] mt-3">Current Streak (days)</p>
        </div>
        <div className="bg-[#080808]/80 backdrop-blur-md rounded-[24px] border border-white/5 p-8 text-center shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
          <p className="text-5xl font-bold text-[var(--color-violet)] tracking-tight font-display drop-shadow-[0_0_10px_rgba(139,92,246,0.4)]">{actionHistory.length}</p>
          <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#737373] mt-3">Total Actions Logged</p>
        </div>
      </div>

      {timeline.length === 0 ? (
        <GlassCard className="text-center py-16">
          <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6 shadow-[inset_0_0_15px_rgba(0,0,0,0.5)]">
            <span className="text-4xl block filter drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]">📖</span>
          </div>
          <p className="font-mono text-[12px] font-bold uppercase tracking-widest text-[#737373]">Your story is just beginning. Start logging eco-actions to build your timeline.</p>
        </GlassCard>
      ) : (
        <div className="relative max-w-2xl mx-auto">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-[var(--color-violet)]/30 shadow-[0_0_10px_var(--color-violet)]" />

          <div className="space-y-8">
            {timeline.map((entry, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05, ease: [0.23, 1, 0.32, 1] }}
                className="relative pl-14"
              >
                {/* Dot on timeline */}
                <div className={`absolute left-[20px] top-8 w-3 h-3 rounded-full border border-[var(--color-dark)] shadow-[0_0_10px_var(--color-cyan)] ${
                  entry.type === 'milestone' || entry.type === 'badge'
                    ? 'bg-[var(--color-cyan)]'
                    : 'bg-[var(--color-violet)]'
                }`} />

                <div className="rounded-[24px] border border-white/5 bg-[#080808]/80 backdrop-blur-md p-6 shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:border-[var(--color-cyan)]/30 hover:shadow-[0_0_25px_-5px_rgba(6,182,212,0.2)] transition-all duration-300">
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 rounded-[16px] bg-white/5 flex items-center justify-center text-2xl shrink-0 filter drop-shadow-[0_0_5px_rgba(255,255,255,0.3)] border border-white/5">
                      {entry.icon}
                    </div>
                    <div className="flex-1 mt-1">
                      <p className="text-xl font-display text-white leading-none">{entry.title}</p>
                      <p className="text-sm font-normal text-[#a3a3a3] mt-2">{entry.detail}</p>
                    </div>
                    <div className="text-right shrink-0 mt-1">
                      <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#737373]">{formatDate(entry.date)}</p>
                      <p className="font-mono text-[10px] uppercase tracking-widest text-[#525252] mt-1.5">{formatTime(entry.date)}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
