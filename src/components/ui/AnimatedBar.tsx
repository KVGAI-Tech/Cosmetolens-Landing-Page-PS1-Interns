import { cn } from "../../lib/cn";
import { useInView } from "../../lib/useInView";

/**
 * A progress/score bar that grows its fill from 0 → `pct`% once in view.
 */
export function AnimatedBar({
  pct,
  trackClassName,
  fillClassName,
  duration = 1100,
}: {
  pct: number;
  trackClassName?: string;
  fillClassName?: string;
  duration?: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className={cn("h-1.5 w-full overflow-hidden rounded-pill bg-surface-card", trackClassName)}>
      <div
        className={cn("h-full rounded-pill bg-primary transition-[width] ease-out", fillClassName)}
        style={{ width: inView ? `${pct}%` : "0%", transitionDuration: `${duration}ms` }}
      />
    </div>
  );
}
