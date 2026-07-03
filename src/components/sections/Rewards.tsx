import { useEffect, useMemo, useRef, useState } from "react";
import { Star, Award } from "lucide-react";
import { Section } from "../ui/Section";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { rewards as r } from "../../data/content";

function XPCountUp({
  value,
  start = 1000,
  duration = 1400,
  animationKey,
}: {
  value: string | number;
  start?: number;
  duration?: number;
  animationKey: number;
}) {
  const target = useMemo(() => {
    const parsed = Number(String(value).replace(/[^\d]/g, ""));
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 2450;
  }, [value]);

  // ✅ Task: conflict resolved — kept upstream version, no setCount(start) in effect
  const [count, setCount] = useState(() => start);
  useEffect(() => {
    let frame = 0;
    let startedAt: number | null = null;
    const animate = (time: number) => {
      if (startedAt === null) startedAt = time;
      const progress = Math.min((time - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(start + (target - start) * eased));
      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [animationKey, duration, start, target]);

  return <>{count.toLocaleString()} XP</>;
}

export function Rewards() {
  const b = r.balance;
  const balanceCardRef = useRef<HTMLDivElement>(null);
  const wasVisibleRef = useRef(false);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    const el = balanceCardRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setAnimationKey((key) => key + 1);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !wasVisibleRef.current) {
          wasVisibleRef.current = true;
          setAnimationKey((key) => key + 1);
        }
        if (!entry.isIntersecting) {
          wasVisibleRef.current = false;
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Section surface="card">
      {/* ✅ Task: merged mobile + desktop into one responsive layout using lg: breakpoints */}
      <div className="grid grid-cols-1 items-start gap-x-20 lg:grid-cols-2 lg:grid-rows-[auto_auto]">

        {/* Heading */}
        <Reveal className="relative col-start-1 row-start-1 pb-8 lg:pb-12">
          {/* Small star decoration visible only on mobile */}
          <div className="pointer-events-none absolute -right-6 -top-6 text-accent-strong/10 lg:hidden">
            <Star className="h-28 w-28" fill="currentColor" strokeWidth={0} />
          </div>
          <div className="mb-3 text-eyebrow uppercase tracking-[0.18em] text-primary lg:mb-4">
            Rewards
          </div>
          {/* ✅ Task: removed redundant font-serif from h2 */}
          <h2 className="text-display-sm leading-tight text-ink sm:text-display-md lg:max-w-3xl lg:text-display-xl">
            {r.heading}
          </h2>
          <p className="mt-4 max-w-xl text-body-md leading-relaxed text-muted sm:text-body-lg lg:mt-7 lg:leading-[1.7]">
            {r.body}
          </p>
        </Reveal>

        {/* Large star decoration — desktop only */}
        <div className="pointer-events-none col-start-2 row-start-1 hidden items-center justify-end pr-4 text-accent-strong/10 lg:flex">
          <Star className="h-72 w-72" fill="currentColor" strokeWidth={0} />
        </div>

        {/* Earn list + CTA */}
        <Reveal className="col-start-1 row-start-2 mt-6 lg:mt-0">
          <ul className="space-y-4">
            {r.earn.map((e, i) => (
              <li
                key={e}
                className={
                  "group flex items-center gap-5 rounded-xl border border-hairline border-l-4 bg-canvas px-5 py-4 shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift sm:gap-6 sm:px-6 sm:py-5 lg:gap-6 lg:px-6 lg:py-5 " +
                  (i % 2 === 0 ? "border-l-primary/40" : "border-l-primary/80")
                }
              >
                <span className="shrink-0 font-serif text-display-sm font-medium text-primary/80 transition-transform duration-200 group-hover:scale-110 group-hover:text-primary">
                  {i + 1}
                </span>
                <span className="text-title-md font-medium text-ink">{e}</span>
              </li>
            ))}
          </ul>
          <Button variant="primary" size="lg" uppercase className="mt-6 w-full sm:w-auto lg:mt-10">
            {r.cta}
          </Button>
        </Reveal>

        {/* Balance card */}
        {/* ✅ Task: removed glow blob (absolute inset-0 scale-110 rounded-pill bg-primary/15 blur-3xl) */}
        <Reveal delay={120} className="relative col-start-1 row-start-3 mt-6 lg:col-start-2 lg:row-start-2 lg:mt-0">
          <div
            ref={balanceCardRef}
            className="hover-lift relative flex flex-col gap-6 rounded-xl border border-hairline bg-canvas p-6 shadow-lift lg:p-10"
          >
            <div className="flex items-start justify-between border-b border-hairline pb-6 lg:mb-5 lg:pb-5">
              <div>
                <div className="mb-3 inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-caption-uppercase uppercase text-primary lg:px-5 lg:py-2">
                  Elite
                </div>
                <div className="text-caption-uppercase uppercase text-primary">
                  {b.label}
                </div>
                <div className="mt-1 font-serif text-display-sm text-ink lg:text-display-md">
                  <XPCountUp value={b.value} animationKey={animationKey} />
                </div>
              </div>
              <div
                key={animationKey}
                className="rewards-star-pop relative flex h-12 w-12 items-center justify-center lg:h-14 lg:w-14"
              >
                <Star
                  className="relative z-10 h-9 w-9 text-primary drop-shadow-sm lg:h-10 lg:w-10"
                  fill="currentColor"
                  strokeWidth={0}
                />
                <span className="rewards-star-triangle-shine pointer-events-none absolute z-20 h-9 w-9 lg:h-10 lg:w-10" />
              </div>
            </div>
            <div className="flex items-center justify-between gap-4 text-caption-uppercase uppercase tracking-[0.16em]">
              <span className="flex items-center gap-2 text-muted">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/15">
                  <Award className="h-3.5 w-3.5 text-primary" strokeWidth={2.5} />
                </span>
                {b.nextTier}
              </span>
              <span className="shrink-0 text-primary">{b.toGo}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-caption-uppercase uppercase text-primary">
                Free shipping
              </span>
              <span className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-caption-uppercase uppercase text-primary">
                Early access
              </span>
            </div>
            <div className="flex h-2 w-full overflow-hidden rounded-pill bg-hairline/40">
              <div
                className="h-full shrink-0 rounded-l-pill bg-primary"
                style={{ width: `${b.pct}%` }}
              />
              <div className="relative h-full flex-1 overflow-hidden">
                <div
                  className="absolute inset-y-0 w-1/3 rounded-pill"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent 0%, rgba(196,90,53,0.45) 100%)",
                    animation: "rewards-remaining-sweep 1.6s ease-in-out infinite",
                  }}
                />
              </div>
            </div>
          </div>
        </Reveal>

      </div>
      {/* ✅ Task: deleted inline <style> tag — keyframes now live in index.css (moved by Siya) */}
    </Section>
  );
}
