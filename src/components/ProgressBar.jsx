import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

/**
 * ProgressBar
 * A horizontal progress bar tracking completion against a maximum value.
 */
export default function ProgressBar({ value, max = 100, label = '', showPercentage = true, className = '' }) {
  const pct = Math.min((value / max) * 100, 100);

  return (
    <div className={className}>
      {(label || showPercentage) && (
        <div className="flex items-center justify-between mb-2 font-mono text-[10px] font-bold uppercase tracking-widest">
          {label && <span className="text-[#737373]">{label}</span>}
          {showPercentage && <span className="text-[#a3a3a3]">{Math.round(pct)}%</span>}
        </div>
      )}
      <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className="h-full bg-[var(--color-cyan)] rounded-full shadow-[0_0_10px_rgba(6,182,212,0.8)]"
        />
      </div>
    </div>
  );
}

ProgressBar.propTypes = {
  value: PropTypes.number.isRequired,
  max: PropTypes.number,
  label: PropTypes.string,
  showPercentage: PropTypes.bool,
  className: PropTypes.string
};
