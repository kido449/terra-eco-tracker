import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function ModuleCard({ icon, title, description, route, status, delay = 0 }) {
  const statusColors = {
    Available: 'bg-[var(--color-mint)]/20 text-[var(--color-forest)]',
    New: 'bg-[var(--color-gold)]/20 text-[var(--color-forest)]',
    'Coming Soon': 'bg-black/5 text-[var(--color-forest)]/40',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: [0.23, 1, 0.32, 1] }}
    >
      <Link
        to={route}
        className="block bg-[rgba(10,10,10,0.7)] backdrop-blur-[16px] border border-white/5 rounded-[24px] p-8 group transition-all duration-300 hover:-translate-y-3 hover:border-[var(--color-violet)]/40 hover:bg-[rgba(20,20,20,0.8)] hover:shadow-[0_0_30px_-10px_var(--color-violet)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-cyan)]"
      >
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-[12px] bg-[var(--color-cyan)]/10 flex items-center justify-center text-2xl shrink-0 group-hover:bg-[var(--color-violet)]/20 group-hover:text-[var(--color-violet)] transition-colors shadow-[inset_0_0_12px_rgba(6,182,212,0.1)]">
              {icon}
            </div>
            {status && (
              <span className={`font-mono text-[10px] uppercase tracking-widest px-3 py-1 rounded-full border border-white/10 ${status === 'Available' ? 'text-[var(--color-emerald)] bg-[var(--color-emerald)]/10' : status === 'New' ? 'text-[var(--color-violet)] bg-[var(--color-violet)]/10' : 'text-[#737373] bg-white/5'}`}>
                {status}
              </span>
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-display text-3xl text-white tracking-tight mb-2 group-hover:text-[var(--color-violet)] transition-colors">{title}</h3>
            <p className="text-sm text-[#a3a3a3] leading-relaxed line-clamp-2">{description}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
