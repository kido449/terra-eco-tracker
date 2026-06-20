import { useEffect, useRef, useState } from 'react';

/**
 * Animated count-up number component.
 * Smoothly transitions from previous value to new value using requestAnimationFrame.
 */
export default function AnimatedNumber({ value, duration = 600, decimals = 1, className = '' }) {
  const [display, setDisplay] = useState(value);
  const prevValue = useRef(value);
  const rafId = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setDisplay(value);
      prevValue.current = value;
      return;
    }

    const start = prevValue.current;
    const diff = value - start;
    if (Math.abs(diff) < 0.01) {
      setDisplay(value);
      prevValue.current = value;
      return;
    }

    const startTime = performance.now();

    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = start + diff * eased;
      setDisplay(current);

      if (progress < 1) {
        rafId.current = requestAnimationFrame(tick);
      } else {
        prevValue.current = value;
      }
    }

    rafId.current = requestAnimationFrame(tick);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [value, duration]);

  return (
    <span className={className}>
      {typeof display === 'number' ? display.toFixed(decimals) : display}
    </span>
  );
}
