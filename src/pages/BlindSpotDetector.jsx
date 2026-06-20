import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from '../context/useStore';
import PageHeader from '../components/PageHeader';
import GlassCard from '../components/GlassCard';
import blindspots from '../data/blindspots';

export default function BlindSpotDetector() {
  const [revealedCount, setRevealedCount] = useState(0);
  const markBlindSpotsViewed = useStore((s) => s.markBlindSpotsViewed);
  const blindSpotsViewed = useStore((s) => s.blindSpotsViewed);

  const revealNext = () => {
    if (revealedCount < blindspots.length) {
      setRevealedCount(revealedCount + 1);
      if (revealedCount + 1 === blindspots.length) {
        markBlindSpotsViewed();
      }
    }
  };

  const totalImpact = blindspots
    .slice(0, revealedCount)
    .reduce((sum, b) => sum + b.annualImpact, 0);

  return (
    <div>
      <PageHeader
        title="Blind Spot Detector"
        description="Discover hidden high-carbon habits that fly under the radar. Click below to reveal each one."
      />

      <div className="max-w-2xl mx-auto">
        {revealedCount < blindspots.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-10 flex justify-center"
          >
            <div className="relative p-[1px] rounded-full overflow-hidden group inline-block">
              <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0%,transparent_40%,var(--color-violet)_50%,var(--color-cyan)_60%,transparent_100%)] animate-[spin_4s_linear_infinite]" />
              <button
                onClick={revealNext}
                className="relative block px-10 py-4 bg-[#0a0a0a] rounded-full font-mono text-[12px] uppercase tracking-widest font-bold text-white transition-colors group-hover:bg-[#151515] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-cyan)]"
              >
                {revealedCount === 0 ? 'Reveal First Blind Spot' : `Reveal Next (${revealedCount}/${blindspots.length})`}
              </button>
            </div>
          </motion.div>
        )}

        <div className="space-y-6">
          <AnimatePresence>
            {blindspots.slice(0, revealedCount).map((spot, i) => (
              <motion.div
                key={spot.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              >
                <GlassCard className="p-6 sm:p-8 hover:border-[var(--color-violet)]/30 transition-colors">
                  <div className="flex flex-col sm:flex-row items-start gap-6">
                    <div className="w-16 h-16 rounded-[16px] bg-[var(--color-violet)]/10 border border-white/5 flex items-center justify-center text-3xl shrink-0 shadow-[inset_0_0_12px_rgba(139,92,246,0.2)]">
                      <span className="filter drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">{spot.icon}</span>
                    </div>
                    <div className="flex-1 w-full">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                        <h3 className="text-2xl font-display text-white tracking-tight leading-none">{spot.habit}</h3>
                        <span className="font-mono text-[10px] uppercase tracking-widest font-bold px-3 py-1 border border-[#d97706]/30 bg-[#d97706]/10 text-[#d97706] rounded-full self-start">
                          ~{spot.annualImpact} {spot.unit}
                        </span>
                      </div>
                      <p className="text-sm text-[#a3a3a3] leading-relaxed mb-6">{spot.description}</p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="border border-white/10 bg-[var(--color-dark)]/50 rounded-[16px] p-5 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
                          <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#737373] mb-3">Why it&apos;s hidden</p>
                          <p className="text-xs text-[#a3a3a3] leading-relaxed">{spot.hiddenReason}</p>
                        </div>

                        <div className="border border-[var(--color-cyan)]/20 bg-[var(--color-cyan)]/5 rounded-[16px] p-5 shadow-[inset_0_0_20px_rgba(6,182,212,0.05)] relative overflow-hidden">
                          <div className="absolute top-0 left-0 w-1 h-full bg-[var(--color-cyan)]/50" />
                          <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--color-cyan)] mb-3">What you can do</p>
                          <p className="text-xs text-white leading-relaxed">{spot.fix}</p>
                        </div>
                      </div>

                      <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#525252] mt-2">Source: {spot.source}</p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {revealedCount === blindspots.length && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="mt-10 bg-[#080808]/90 backdrop-blur-xl border border-[var(--color-violet)]/30 rounded-[24px] overflow-hidden shadow-[0_0_30px_-10px_rgba(139,92,246,0.2)]"
          >
            <div className="h-12 border-b border-white/5 flex items-center px-5 justify-between bg-[#111111]/80">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56] opacity-60" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e] opacity-60" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f] opacity-60" />
              </div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-[#737373]">hidden-impact.json</div>
              <div className="w-4 h-4"></div>
            </div>
            <div className="p-6 sm:p-8 font-mono text-sm leading-relaxed overflow-x-auto text-[#a3a3a3]">
              <pre>
{`{`}
  <span className="text-[var(--color-violet)]">"total_hidden_impact"</span>: <span className="text-[var(--color-cyan)]">{totalImpact}</span>, <span className="text-[#525252]">{"// kg CO₂/year"}</span>
  <span className="text-[var(--color-violet)]">"equivalent_tonnes"</span>: <span className="text-[var(--color-cyan)]">{(totalImpact / 1000).toFixed(1)}</span>,
  <span className="text-[var(--color-violet)]">"status"</span>: <span className="text-[#d97706]">"Needs Attention"</span>
{`}`}
              </pre>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
