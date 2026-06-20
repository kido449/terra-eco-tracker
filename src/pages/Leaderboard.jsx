import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import useStore from '../context/useStore';
import PageHeader from '../components/PageHeader';
import leaderboardUsers from '../data/leaderboard';

const filters = ['Global', 'Friends', 'This Week'];

const rankBadges = {
  1: { emoji: '🥇', color: 'text-[#f59e0b] filter drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]' },
  2: { emoji: '🥈', color: 'text-[#a3a3a3] filter drop-shadow-[0_0_8px_rgba(163,163,163,0.5)]' },
  3: { emoji: '🥉', color: 'text-[#b45309] filter drop-shadow-[0_0_8px_rgba(180,83,9,0.5)]' },
};

export default function Leaderboard() {
  const [activeFilter, setActiveFilter] = useState('Global');
  const todaySaved = useStore((s) => s.todaySaved);
  const userName = useStore((s) => s.userName);

  const currentUser = { id: 0, name: userName, avatar: '🌱', weeklyKg: todaySaved * 7, tier: 'You', isFriend: false };

  const filteredUsers = useMemo(() => {
    let users = [...leaderboardUsers];

    if (activeFilter === 'Friends') {
      users = users.filter((u) => u.isFriend);
    }

    if (activeFilter === 'This Week') {
      users = users.map((u) => ({ ...u, weeklyKg: +(u.weeklyKg * (0.8 + Math.random() * 0.4)).toFixed(1) }));
    }

    users.push(currentUser);
    users.sort((a, b) => b.weeklyKg - a.weeklyKg);

    return users;
  }, [activeFilter, todaySaved, userName]);

  return (
    <div>
      <PageHeader
        title="Community Leaderboard"
        description="See how your weekly carbon savings stack up against the community."
      />

      <div className="flex flex-wrap gap-3 mb-10">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-6 py-2.5 rounded-full font-mono text-[10px] font-bold uppercase tracking-widest transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-cyan)] shadow-sm ${
              activeFilter === f
                ? 'border border-[var(--color-cyan)] bg-[var(--color-cyan)]/10 text-[var(--color-cyan)] shadow-[inset_0_0_12px_rgba(6,182,212,0.2)]'
                : 'border border-white/10 bg-[var(--color-dark)] text-[#737373] hover:border-[var(--color-violet)]/40 hover:text-white'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="max-w-2xl space-y-4">
        {filteredUsers.map((user, i) => {
          const rank = i + 1;
          const isCurrentUser = user.id === 0;
          const badge = rankBadges[rank];

          return (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05, ease: [0.23, 1, 0.32, 1] }}
            >
              <div className={`flex items-center gap-4 px-6 py-5 rounded-[24px] border transition-all duration-300 hover:shadow-md ${
                isCurrentUser
                  ? 'border-[var(--color-cyan)]/40 bg-[var(--color-cyan)]/5 shadow-[inset_0_0_20px_rgba(6,182,212,0.15)] hover:border-[var(--color-cyan)]/60'
                  : 'border-white/5 bg-[var(--color-dark)]/50 backdrop-blur-md hover:border-white/10'
              }`}>
                <div className={`w-8 text-center font-bold font-mono text-lg ${badge ? badge.color : 'text-[#525252]'}`}>
                  {badge ? badge.emoji : `#${rank}`}
                </div>

                <div className="flex items-center justify-center w-12 h-12 rounded-[16px] bg-white/5 border border-white/5 text-xl shrink-0 filter drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]">
                  {user.avatar}
                </div>

                <div className="flex-1 min-w-0 ml-2">
                  <p className={`text-lg font-display tracking-wide truncate ${isCurrentUser ? 'text-white' : 'text-[#a3a3a3]'}`}>
                    {user.name} {isCurrentUser && <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--color-cyan)] ml-3 border border-[var(--color-cyan)]/30 bg-[var(--color-cyan)]/10 px-2 py-0.5 rounded-full shadow-[inset_0_0_8px_rgba(6,182,212,0.2)]">(You)</span>}
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-[#737373] mt-1.5">{user.tier}</p>
                </div>

                <div className="text-right shrink-0">
                  <p className={`text-xl font-bold tabular-nums tracking-tight ${isCurrentUser ? 'text-white' : 'text-[#a3a3a3]'}`}>
                    {user.weeklyKg.toFixed(1)} <span className="text-sm font-normal text-[#525252]">kg</span>
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-[#525252] mt-1.5">saved</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
