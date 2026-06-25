import { useEffect, useState } from "react";
import { useInView, prefersReducedMotion } from "../../lib/useInView";

/**
 * Animates a number from 0 → `value` once it scrolls into view.
 * Respects prefers-reduced-motion (jumps straight to the value).
 */
export function CountUp({
  value,
  decimals = 0,
  suffix = "",
  duration = 1100,
  className,
}: {
  value: number;
  decimals?: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const dur = prefersReducedMotion() ? 0 : duration;
    let raf = 0;
    let start = 0;
    const tick = (t: number) => {
      if (!start) start = t;
      const p = dur <= 0 ? 1 : Math.min((t - start) / dur, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(value * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}
