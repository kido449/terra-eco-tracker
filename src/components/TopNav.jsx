import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function TopNav() {
  const location = useLocation();
  const path = location.pathname;

  const isActive = (route) => {
    if (route === '/') return path === '/';
    return path.startsWith(route);
  };

  return (
    <motion.div 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-2xl z-50"
    >
      <div className="bg-[rgba(10,10,10,0.7)] backdrop-blur-[16px] border border-white/10 rounded-full h-14 flex items-center justify-between px-2 shadow-2xl">
        
        {/* Left: Brand */}
        <Link to="/" className="flex items-center gap-3 pl-4 focus-visible:outline-none">
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[var(--color-violet)] to-[var(--color-cyan)] shadow-[0_0_10px_-2px_var(--color-cyan)]" />
          <span className="font-display text-2xl text-white tracking-tight -mb-1">Terra</span>
        </Link>

        {/* Center: Links */}
        <div className="hidden sm:flex items-center gap-6">
          <Link to="/" className={`text-[12px] uppercase font-bold tracking-widest transition-colors focus-visible:outline-none ${isActive('/') ? 'text-white' : 'text-[#a3a3a3] hover:text-white'}`}>
            Overview
          </Link>
          <Link to="/assess" className={`text-[12px] uppercase font-bold tracking-widest transition-colors focus-visible:outline-none ${isActive('/assess') ? 'text-white' : 'text-[#a3a3a3] hover:text-white'}`}>
            Assess
          </Link>
          <Link to="/learn" className={`text-[12px] uppercase font-bold tracking-widest transition-colors focus-visible:outline-none ${isActive('/learn') ? 'text-white' : 'text-[#a3a3a3] hover:text-white'}`}>
            Learn
          </Link>
          <Link to="/act" className={`text-[12px] uppercase font-bold tracking-widest transition-colors focus-visible:outline-none ${isActive('/act') ? 'text-white' : 'text-[#a3a3a3] hover:text-white'}`}>
            Act
          </Link>
        </div>

        {/* Right: CTA */}
        <Link to="/assess" className="h-10 px-5 bg-white rounded-full flex items-center justify-center text-[12px] font-bold text-black uppercase tracking-widest hover:bg-[#e5e5e5] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-cyan)]">
          <span className="hidden sm:inline">Assessment</span>
          <span className="sm:hidden">Start</span>
        </Link>
      </div>
    </motion.div>
  );
}
