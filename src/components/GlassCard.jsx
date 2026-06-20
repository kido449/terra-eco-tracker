import { motion } from 'framer-motion';

export default function GlassCard({ children, className = '', hover = true, delay = 0, colorAccent = null, ...props }) {
  // Optional left border accent
  const borderStyle = colorAccent ? { borderLeft: `4px solid var(--color-${colorAccent})` } : {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay, ease: "easeOut" }}
      className={`bento-panel ${className}`}
      style={borderStyle}
      {...props}
    >
      {children}
    </motion.div>
  );
}
