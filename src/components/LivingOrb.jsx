import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useStore from '../context/useStore';
import AnimatedNumber from './AnimatedNumber';

export default function LivingOrb() {
  const navigate = useNavigate();
  const ecoScore = useStore((s) => s.ecoScore);
  const actionHistory = useStore((s) => s.actionHistory);
  const todaySaved = useStore((s) => s.todaySaved);
  
  // Hovered action state for tooltip
  const [hoveredAction, setHoveredAction] = useState(null);

  // Determine orb color based on score
  const orbColor = useMemo(() => {
    if (ecoScore >= 800) return 'var(--color-emerald)';
    if (ecoScore >= 600) return 'var(--color-cyan)';
    if (ecoScore >= 400) return 'var(--color-violet)';
    return '#d97706'; // Amber for warning
  }, [ecoScore]);

  // Morphing blob paths
  const blobPaths = [
    "M 150 20 C 220 20, 280 80, 280 150 C 280 220, 220 280, 150 280 C 80 280, 20 220, 20 150 C 20 80, 80 20, 150 20 Z",
    "M 150 10 C 240 30, 290 90, 270 160 C 250 240, 190 290, 120 270 C 40 250, 10 180, 30 110 C 50 30, 110 10, 150 10 Z",
    "M 150 30 C 210 10, 290 70, 280 140 C 270 230, 220 270, 140 280 C 70 290, 20 220, 30 150 C 40 80, 90 30, 150 30 Z",
    "M 150 20 C 220 20, 280 80, 280 150 C 280 220, 220 280, 150 280 C 80 280, 20 220, 20 150 C 20 80, 80 20, 150 20 Z"
  ];

  // Daily budget progress
  const dailyTarget = 11;
  const progressPct = Math.min((todaySaved / dailyTarget) * 100, 100);
  const ringCircumference = 2 * Math.PI * 145;
  const ringOffset = ringCircumference - (progressPct / 100) * ringCircumference;

  return (
    <div className="relative w-[320px] h-[320px] flex items-center justify-center shrink-0">
      
      {/* SVG Canvas */}
      <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 300 300">
        
        {/* Progress Ring Background */}
        <circle cx="150" cy="150" r="145" fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="2" />
        
        {/* Progress Ring Fill */}
        <motion.circle 
          cx="150" cy="150" r="145" 
          fill="none" 
          stroke={orbColor} 
          strokeWidth="3" 
          strokeLinecap="round"
          strokeDasharray={ringCircumference}
          initial={{ strokeDashoffset: ringCircumference }}
          animate={{ strokeDashoffset: ringOffset }}
          transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
          className="transform -rotate-90 origin-center"
          style={{ filter: `drop-shadow(0 0 8px ${orbColor})` }}
        />

        {/* Morphing Blob */}
        <motion.path
          animate={{ d: blobPaths }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          fill={orbColor}
          opacity="0.8"
          onClick={() => navigate('/assess')}
          className="cursor-pointer"
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
          style={{ filter: `drop-shadow(0 0 20px ${orbColor})` }}
        />

        {/* Orbiting Particles */}
        {actionHistory.slice(0, 8).map((action, i) => {
          const radius = 100 + (i % 3) * 20; // varying radii
          const duration = 15 + (i % 4) * 5;
          const delay = -i * 2;
          
          return (
            <motion.g 
              key={action.id}
              animate={{ rotate: 360 }}
              transition={{ duration, repeat: Infinity, ease: "linear", delay }}
              style={{ originX: '150px', originY: '150px' }}
            >
              <circle 
                cx={150} cy={150 - radius} r="4" 
                fill="#ffffff" 
                className="cursor-pointer"
                style={{ filter: 'drop-shadow(0 0 4px #ffffff)' }}
                onMouseEnter={() => setHoveredAction(action)}
                onMouseLeave={() => setHoveredAction(null)}
              />
            </motion.g>
          );
        })}
      </svg>

      {/* Center Score */}
      <div className="relative z-10 text-center pointer-events-none flex flex-col items-center justify-center text-white">
        <p className="font-mono text-[10px] uppercase tracking-widest text-white/50 mb-1">ECO SCORE</p>
        <AnimatedNumber 
          value={ecoScore} 
          className="text-6xl font-display tracking-tight"
        />
      </div>

      {/* Tooltip */}
      {hoveredAction && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-[rgba(10,10,10,0.8)] backdrop-blur-md px-4 py-2 rounded-xl shadow-xl border border-white/10 z-20 pointer-events-none whitespace-nowrap">
          <p className="text-sm font-bold text-white">{hoveredAction.title}</p>
          <p className="text-[10px] uppercase tracking-widest text-[var(--color-cyan)]">{hoveredAction.impactKg}kg saved</p>
        </div>
      )}
    </div>
  );
}
