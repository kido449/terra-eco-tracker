import useStore from '../context/useStore';

export default function MetricsTicker() {
  const ecoScore = useStore((s) => s.ecoScore);
  const streak = useStore((s) => s.streak);
  const totalCO2Saved = useStore((s) => s.totalCO2Saved);
  const todaySaved = useStore((s) => s.todaySaved);
  const activeMissionsCount = useStore((s) => s.completedMissions.length); // Using completed as proxy for active for now

  const items = [
    { label: 'ECO SCORE', value: ecoScore, color: 'text-[var(--color-violet)]' },
    { label: 'CURRENT STREAK', value: `${streak} DAYS`, color: 'text-[var(--color-cyan)]' },
    { label: 'TODAY SAVED', value: `${todaySaved.toFixed(1)} KG`, color: 'text-[var(--color-emerald)]' },
    { label: 'TOTAL AVERTED', value: `${totalCO2Saved.toFixed(1)} KG`, color: 'text-white' },
    { label: 'MISSIONS CLEAR', value: activeMissionsCount, color: 'text-[var(--color-violet)]' },
  ];

  // Duplicate items to ensure smooth infinite scrolling
  const tickerItems = [...items, ...items, ...items, ...items];

  return (
    <div role="status" aria-label="Live metrics" className="w-full h-[60px] bg-black/40 border-y border-white/5 overflow-hidden flex items-center relative z-40">
      <div className="sr-only">
        Current metrics: Eco Score {ecoScore}, Streak {streak} days, Today Saved {todaySaved.toFixed(1)} kg, Total Averted {totalCO2Saved.toFixed(1)} kg, Missions Clear {activeMissionsCount}.
      </div>
      <div aria-hidden="true" className="flex w-[200%] animate-scroll-x whitespace-nowrap">
        {tickerItems.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2 px-8">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#737373]">{item.label}</span>
            <span className={`font-mono text-[12px] font-bold ${item.color}`}>{item.value}</span>
            <span className="mx-4 text-[#333]">/</span>
          </div>
        ))}
      </div>
    </div>
  );
}
