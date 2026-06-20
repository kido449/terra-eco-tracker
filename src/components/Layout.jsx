import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import TopNav from './TopNav';
import MetricsTicker from './MetricsTicker';
import Footer from './Footer';
import useStore from '../context/useStore';

export default function Layout() {
  const location = useLocation();
  const performDailyReset = useStore((s) => s.performDailyReset);

  // Run daily reset on mount
  useEffect(() => {
    performDailyReset();
  }, [performDailyReset]);

  return (
    <div className="min-h-screen bg-[var(--color-dark)] text-white flex flex-col font-sans selection:bg-[var(--color-violet)] selection:text-white overflow-x-hidden">
      <TopNav />

      {/* Ticker right below the floating nav or fixed at top? Let's put it at the very top */}
      <MetricsTicker />

      {/* Main content area */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-16 relative z-10 flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="flex-1 flex flex-col w-full"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
