export default function Badge({ icon, name, isUnlocked, progress = 0, required = 1, size = 'md' }) {
  const sizes = {
    sm: 'w-12 h-12 text-xl',
    md: 'w-16 h-16 text-2xl',
    lg: 'w-20 h-20 text-3xl',
  };

  const progressPct = Math.min((progress / required) * 100, 100);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative">
        <div
          className={`${sizes[size]} flex items-center justify-center rounded-[16px] transition-all duration-300
            ${isUnlocked
              ? 'bg-[var(--color-emerald)]/10 border border-[var(--color-emerald)]/30 shadow-[inset_0_0_15px_rgba(16,185,129,0.2)] opacity-100 filter drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]'
              : 'bg-white/5 border border-white/5 opacity-40 grayscale'
            }`}
        >
          <span className="filter drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">{icon}</span>
        </div>
        {isUnlocked && (
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-[var(--color-emerald)] rounded-full border-[2px] border-[#080808] flex items-center justify-center shadow-[0_0_10px_var(--color-emerald)] z-10">
            <svg className="w-3.5 h-3.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
      </div>

      <span className={`font-mono text-[10px] uppercase tracking-widest text-center leading-tight ${isUnlocked ? 'text-white font-bold' : 'text-[#737373] font-normal'}`}>
        {name}
      </span>
      
      {!isUnlocked && (
        <div className="w-full max-w-[60px] mt-1">
          <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full bg-[#525252] transition-all duration-300 rounded-full"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <span className="font-mono text-[9px] uppercase tracking-widest text-[#525252] mt-1 block text-center">
            {progress}/{required}
          </span>
        </div>
      )}
    </div>
  );
}
