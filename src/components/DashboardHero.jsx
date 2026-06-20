import { Link } from 'react-router-dom';
import LivingOrb from './LivingOrb';
import useStore from '../context/useStore';

export default function DashboardHero() {
  const todaySaved = useStore((s) => s.todaySaved);
  const streak = useStore((s) => s.streak);

  return (
    <div className="relative w-full overflow-hidden rounded-[32px] border border-white/5 bg-[var(--color-glass)] backdrop-blur-xl mb-12 flex flex-col md:flex-row items-center justify-between p-8 md:p-16 min-h-[500px]">
      
      {/* Background Radial Glows */}
      <div aria-hidden="true" className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[var(--color-violet)]/40 blur-[100px] rounded-full pointer-events-none" />
      <div aria-hidden="true" className="absolute top-1/2 left-[-10%] -translate-y-1/2 w-[400px] h-[400px] bg-[var(--color-cyan)]/20 blur-[120px] rounded-full pointer-events-none" />
      
      {/* Left Content */}
      <div className="flex-1 max-w-2xl z-10 flex flex-col items-start gap-6 relative">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display text-white leading-[0.9] tracking-tight">
          Understand your impact. <br />
          Change your <span className="animate-text-shimmer inline-block">habits.</span>
        </h1>
        
        <p className="text-lg text-[#a3a3a3] max-w-lg leading-relaxed font-sans font-light">
          Most of us are blind to our actual carbon footprint. Discover your baseline, uncover hidden impacts, and build sustainable habits.
        </p>

        <div className="flex items-center gap-6 mt-4">
          {/* Shiny Border Button CTA */}
          <div className="relative p-[1px] rounded-full overflow-hidden group">
            {/* Animated border gradient */}
            <div aria-hidden="true" className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0%,transparent_40%,var(--color-violet)_50%,var(--color-cyan)_60%,transparent_100%)] animate-[spin_4s_linear_infinite]" />
            
            {/* Button Content */}
            <Link to="/assess/calculator" className="relative block px-10 py-4 bg-[#0a0a0a] rounded-full font-mono text-[12px] uppercase tracking-widest font-bold text-white transition-colors group-hover:bg-[#151515] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-cyan)] focus-visible:ring-offset-2 focus-visible:ring-offset-black text-center">
              Calculate Your Footprint
            </Link>
          </div>

          {/* Secondary Action */}
          <button 
            onClick={() => document.getElementById('explore-modules')?.scrollIntoView({ behavior: 'smooth' })}
            aria-label="View Modules"
            className="font-mono text-[12px] uppercase tracking-widest font-bold text-[#737373] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-cyan)] focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-full px-4 py-2 cursor-pointer"
          >
            View Modules
          </button>
        </div>
      </div>

      {/* Right Visual: Living Orb */}
      <div className="relative z-10 mt-12 md:mt-0 flex-shrink-0 lg:mr-8 xl:mr-16">
        <div aria-hidden="true" className="absolute inset-0 bg-[var(--color-emerald)]/10 blur-[80px] rounded-full animate-float-orb" />
        <LivingOrb />
      </div>

    </div>
  );
}
