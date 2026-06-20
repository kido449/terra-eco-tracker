import { useEffect } from 'react';
import { motion } from 'framer-motion';
import useStore from '../context/useStore';
import PageHeader from '../components/PageHeader';
import GlassCard from '../components/GlassCard';
import Badge from '../components/Badge';
import challenges from '../data/challenges';

export default function EcoChallenges() {
  const unlockedBadges = useStore((s) => s.unlockedBadges);
  const badgeProgress = useStore((s) => s.badgeProgress);
  const totalActionsLogged = useStore((s) => s.totalActionsLogged);
  const totalCO2Saved = useStore((s) => s.totalCO2Saved);
  const streak = useStore((s) => s.streak);
  const updateBadgeProgress = useStore((s) => s.updateBadgeProgress);
  const unlockBadge = useStore((s) => s.unlockBadge);

  // Auto-evaluate badge progress on mount/update
  useEffect(() => {
    challenges.forEach((badge) => {
      if (unlockedBadges.includes(badge.id)) return;

      let current = 0;
      switch (badge.type) {
        case 'action':
          current = totalActionsLogged;
          break;
        case 'saving':
          current = totalCO2Saved;
          break;
        case 'streak':
          current = streak;
          break;
        default:
          current = 0;
      }

      if (current >= badge.target) {
        unlockBadge(badge.id);
      } else {
        updateBadgeProgress(badge.id, current);
      }
    });
  }, [totalActionsLogged, totalCO2Saved, streak, unlockedBadges, unlockBadge, updateBadgeProgress]);

  const categories = [...new Set(challenges.map((c) => c.category))];

  return (
    <div>
      <PageHeader
        title="Eco Challenges"
        description="Earn badges by reaching sustainability milestones. Badges boost your overall Eco Score."
      />

      <div className="space-y-10 max-w-4xl">
        {categories.map((category, catIndex) => {
          const categoryBadges = challenges.filter((c) => c.category === category);

          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: catIndex * 0.1, ease: [0.23, 1, 0.32, 1] }}
            >
              <h2 className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#737373] mb-6 px-2">
                {category}
              </h2>
              <GlassCard delay={0} className="p-8">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-y-10 gap-x-4">
                  {categoryBadges.map((badge) => {
                    const isUnlocked = unlockedBadges.includes(badge.id);
                    const progress = isUnlocked ? badge.target : (badgeProgress[badge.id] || 0);

                    return (
                      <div key={badge.id} className="relative group flex justify-center">
                        <Badge
                          icon={badge.icon}
                          name={badge.name}
                          isUnlocked={isUnlocked}
                          progress={progress}
                          required={badge.target}
                        />

                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-48 p-4 rounded-[16px] bg-[#080808]/95 backdrop-blur-md border border-white/10 text-center opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 transition-all z-20 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.8)]">
                          <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-white mb-2">{badge.name}</p>
                          <p className="text-xs text-[#a3a3a3] mb-4 leading-relaxed">{badge.description}</p>
                          <div className={`font-mono text-[10px] font-bold uppercase tracking-widest py-1.5 rounded-full ${isUnlocked ? 'bg-[var(--color-emerald)]/10 text-[var(--color-emerald)] shadow-[inset_0_0_8px_rgba(16,185,129,0.2)]' : 'bg-white/5 text-[#737373]'}`}>
                            {isUnlocked ? 'Unlocked!' : `${Math.floor(progress)} / ${badge.target}`}
                          </div>
                          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-4 border-transparent border-t-white/10" />
                          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[2px] border-4 border-transparent border-t-[#080808]" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
