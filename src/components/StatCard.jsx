import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import AnimatedNumber from './AnimatedNumber';

/**
 * StatCard
 * Displays a single statistic metric with an icon, animated value, and optional label/suffix.
 */
export default function StatCard({ icon, label, value, suffix = '', decimals = 0, delay = 0, accentColor = 'forest' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.23, 1, 0.32, 1] }}
      className="bg-[rgba(10,10,10,0.7)] backdrop-blur-[16px] rounded-[24px] p-4 flex flex-col gap-3 relative overflow-hidden border border-white/10 shadow-sm"
    >
      <div className="font-mono text-[10px] uppercase tracking-widest text-[#737373]">
        {label}
      </div>
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-[12px] bg-[var(--color-cyan)]/10 text-[var(--color-cyan)] flex items-center justify-center shrink-0 text-lg shadow-[inset_0_0_12px_rgba(6,182,212,0.2)]">
          {icon}
        </div>
        <div className="flex items-baseline gap-1.5">
          <AnimatedNumber
            value={value}
            decimals={decimals}
            className="text-[20px] font-bold tabular-nums text-white tracking-tight"
          />
          {suffix && <span className="font-mono text-[10px] uppercase tracking-widest text-[#a3a3a3]">{suffix}</span>}
        </div>
      </div>
    </motion.div>
  );
}

StatCard.propTypes = {
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  suffix: PropTypes.string,
  decimals: PropTypes.number,
  delay: PropTypes.number,
  accentColor: PropTypes.string
};
