import useStore from '../context/useStore';

export default function Header() {
  const userName = useStore((s) => s.userName);
  const hour = new Date().getHours();
  
  let greeting = 'GOOD EVENING';
  if (hour < 12) greeting = 'GOOD MORNING';
  else if (hour < 18) greeting = 'GOOD AFTERNOON';

  return (
    <header className="flex items-center justify-between px-6 pt-14 pb-4">
      <div className="flex flex-col">
        <span className="text-[12px] uppercase font-bold tracking-widest text-[var(--color-graygreen)] mb-1">
          {greeting}
        </span>
        <h1 className="text-[30px] font-black text-[var(--color-charcoal)] leading-none">
          {userName}
        </h1>
      </div>

      <div className="relative">
        <div className="w-12 h-12 rounded-full border-2 border-white bg-white overflow-hidden shadow-sm flex items-center justify-center text-xl">
          🌱
        </div>
        {/* Notification Badge */}
        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[var(--color-red)] rounded-full border-2 border-[var(--color-offwhite)]" />
      </div>
    </header>
  );
}
