import { useState } from 'react';
import useStore from '../context/useStore';
import PageHeader from '../components/PageHeader';
import GlassCard from '../components/GlassCard';
import Heatmap from '../components/Heatmap';

export default function HabitTracker() {
  const logAction = useStore((s) => s.logAction);
  const habitLog = useStore((s) => s.habitLog);
  const todayBreakdown = useStore((s) => s.todayBreakdown);
  const streak = useStore((s) => s.streak);

  const [animatingBtn, setAnimatingBtn] = useState(null);

  const handleLog = (type, saving, category, id) => {
    logAction(type, saving, category);
    setAnimatingBtn(id);
    setTimeout(() => setAnimatingBtn(null), 1000);
  };

  const quickActions = [
    { id: 'transit', label: 'Took Transit', icon: '🚌', saving: 2.4, category: 'transport' },
    { id: 'bike', label: 'Biked/Walked', icon: '🚲', saving: 1.8, category: 'transport' },
    { id: 'vegan', label: 'Plant-Based Meal', icon: '🥗', saving: 1.5, category: 'diet' },
    { id: 'local', label: 'Bought Local', icon: '🛒', saving: 0.8, category: 'diet' },
    { id: 'ac', label: 'AC/Heat Off', icon: '⚡', saving: 0.6, category: 'energy' },
    { id: 'coldwash', label: 'Cold Wash', icon: '👕', saving: 0.4, category: 'energy' },
    { id: 'reusable', label: 'Used Reusables', icon: '☕', saving: 0.2, category: 'diet' },
    { id: 'compost', label: 'Composted', icon: '🍂', saving: 0.3, category: 'diet' },
  ];

  return (
    <div>
      <PageHeader
        title="Habit Tracker"
        description="Log your daily eco-actions to build streaks and visualize your consistency over time."
      >
        <div className="hidden sm:block text-right">
          <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Current Streak</p>
          <p className="text-xl font-bold text-orange-400 tabular-nums">{streak} 🔥</p>
        </div>
      </PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col: Logging */}
        <div className="lg:col-span-2 space-y-6">
          <GlassCard delay={0.1} className="p-8">
            <h3 className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#737373] mb-6">Quick Log</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {quickActions.map((action) => (
                <button
                  key={action.id}
                  onClick={() => handleLog(action.id, action.saving, action.category, action.id)}
                  className="relative overflow-hidden rounded-[16px] border border-white/5 bg-[var(--color-dark)] p-4 flex flex-col items-center justify-center text-center hover:border-[var(--color-cyan)]/50 hover:bg-white/5 transition-all duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-cyan)] shadow-sm hover:shadow-[0_0_15px_-3px_rgba(6,182,212,0.3)]"
                >
                  <span className="text-3xl mb-3 group-hover:scale-110 transition-transform filter drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]">{action.icon}</span>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-white mb-1.5">{action.label}</span>
                  <span className="text-[10px] font-bold text-[var(--color-cyan)]">-{action.saving} kg</span>
                  
                  {/* Click ripple animation */}
                  {animatingBtn === action.id && (
                    <span className="absolute inset-0 bg-[var(--color-cyan)]/20 animate-ping rounded-[16px] pointer-events-none" />
                  )}
                </button>
              ))}
            </div>
          </GlassCard>

          <GlassCard delay={0.2} className="p-8">
            <h3 className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#737373] mb-6">Consistency Heatmap</h3>
            <div className="overflow-x-auto pb-4">
              <Heatmap data={habitLog} className="min-w-[700px]" />
            </div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-[#525252] mt-4 text-center">
              1 square = 1 day. Darker color = more actions logged.
            </p>
          </GlassCard>
        </div>

        {/* Right Col: Today's Summary */}
        <div className="space-y-6">
          <div className="bg-[#080808]/90 backdrop-blur-xl border border-white/10 rounded-[24px] overflow-hidden shadow-[0_0_30px_-10px_rgba(0,0,0,0.8)]">
            <div className="h-12 border-b border-white/5 flex items-center px-5 justify-between bg-[#111111]/80">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56] opacity-60" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e] opacity-60" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f] opacity-60" />
              </div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-[#737373]">today-impact.json</div>
              <div className="w-4 h-4"></div>
            </div>
            <div className="p-6 sm:p-8 font-mono text-sm leading-relaxed overflow-x-auto text-[#a3a3a3]">
              <pre>
{`{`}
  <span className="text-[var(--color-violet)]">"breakdown"</span>: {`{`}
    <span className="text-[var(--color-violet)]">"transport"</span>: <span className="text-[var(--color-cyan)]">{todayBreakdown.transport}</span>,
    <span className="text-[var(--color-violet)]">"diet"</span>: <span className="text-[var(--color-cyan)]">{todayBreakdown.diet}</span>,
    <span className="text-[var(--color-violet)]">"energy"</span>: <span className="text-[var(--color-cyan)]">{todayBreakdown.energy}</span>
  {`}`},
  <span className="text-[var(--color-violet)]">"total_saved"</span>: <span className="text-[var(--color-emerald)]">{(todayBreakdown.transport + todayBreakdown.diet + todayBreakdown.energy).toFixed(1)}</span> <span className="text-[#525252]">{"// kg"}</span>
{`}`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
