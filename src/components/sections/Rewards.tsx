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

  const [count, setCount] = useState(start);

  useEffect(() => {
    let frame = 0;
    let startedAt: number | null = null;

    setCount(start);

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
      {/* Mobile layout (below md): heading/body shrink to take fewer lines,
          the balance card follows immediately at its natural size (no
          height-matching), then the steps list at original size — fully
          separate from the desktop grid below to avoid disturbing its
          height-matching logic. */}
      <div className="relative block md:hidden">
        {/* Star watermark: sits in the space freed up by the narrower
            heading/body column to the left, echoing the desktop layout
            where the star occupies the unused space near the heading. */}
        <div className="pointer-events-none absolute -right-6 -top-6 text-[#6F8468]/10">
          <Star className="h-28 w-28" fill="currentColor" strokeWidth={0} />
        </div>

        <Reveal className="relative max-w-[68%]">
          <div className="mb-3 text-eyebrow uppercase text-primary">Rewards</div>
          <h2 className="text-title-lg">{r.heading}</h2>
          <p
            className="mt-3 text-body-md italic"
            style={{ fontFamily: "'Caveat', 'Segoe Script', cursive", color: "#6F8468" }}
          >
            {r.body}
          </p>
        </Reveal>

        <Reveal delay={120} className="relative mx-10 mt-6">
          <div className="absolute inset-0 scale-110 rounded-pill bg-primary/15 blur-3xl" />
          <div className="hover-lift relative flex flex-col gap-6 rounded-xl border border-hairline bg-canvas p-6 shadow-lift">
            <div className="flex items-start justify-between border-b border-hairline pb-6">
              <div>
                <div className="mb-3 inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-caption-uppercase uppercase tracking-wide text-primary">
                  Elite
                </div>
                <div className="text-caption-uppercase uppercase text-primary">{b.label}</div>
                <div className="mt-1 font-serif text-display-sm text-ink">
                  <XPCountUp value={b.value} animationKey={animationKey} />
                </div>
              </div>

              <div
                key={`mobile-${animationKey}`}
                className="rewards-star-pop relative flex h-12 w-12 items-center justify-center"
              >
                <Star
                  className="relative z-10 h-9 w-9 text-primary drop-shadow-sm"
                  fill="currentColor"
                  strokeWidth={0}
                />
                <span className="rewards-star-triangle-shine pointer-events-none absolute z-20 h-9 w-9" />
              </div>
            </div>

            <div className="flex items-center justify-between text-caption-uppercase uppercase">
              <span className="flex items-center gap-2 text-muted">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/15">
                  <Award className="h-3.5 w-3.5 text-primary" strokeWidth={2.5} />
                </span>
                {b.nextTier}
              </span>
              <span className="text-primary">{b.toGo}</span>
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

        <Reveal className="mx-[20%] mt-8">
          <ul className="space-y-4">
            {r.earn.map((e, i) => (
              <li
                key={e}
                className={
                  "group flex items-center gap-6 rounded-xl border-l-4 bg-canvas px-6 py-5 shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift " +
                  (i % 2 === 0 ? "border-primary/40" : "border-primary/80")
                }
              >
                <span className="shrink-0 font-serif text-display-sm font-medium text-primary/80 transition-transform duration-200 group-hover:scale-110 group-hover:text-primary">
                  {i + 1}
                </span>
                <span className="text-title-md text-ink">{e}</span>
              </li>
            ))}
          </ul>

          <Button variant="primary" size="lg" uppercase className="mt-6 w-full">
            {r.cta}
          </Button>
        </Reveal>
      </div>

      {/* Desktop/tablet layout (md and up): 2-col x 2-row grid.
          Row 1 left: heading + body. Row 1 right: empty.
          Row 2 left: steps + button. Row 2 right: card.
          Card top aligns exactly with top of step 1. */}
      <div className="hidden md:block">
        <div className="grid grid-cols-2 grid-rows-[auto_auto] items-start gap-x-20">
          {/* Row 1 left */}
          <Reveal className="col-start-1 row-start-1 pb-8">
            <div className="mb-4 text-eyebrow uppercase text-primary">Rewards</div>
            <h2 className="text-display-xl">{r.heading}</h2>
            <p className="mt-6 text-title-lg italic" style={{ fontFamily: "'Caveat', 'Segoe Script', cursive", color: "#6F8468" }}>
              {r.body}
            </p>
          </Reveal>

          {/* Row 1 right: watermark beside heading + body */}
          <div className="pointer-events-none col-start-2 row-start-1 flex items-center justify-end pr-4 text-[#6F8468]/10">
            <Star className="h-72 w-72" fill="currentColor" strokeWidth={0} />
          </div>

          {/* Row 2 left: steps + button */}
          <Reveal className="col-start-1 row-start-2">
            <ul className="space-y-4">
              {r.earn.map((e, i) => (
                <li
                  key={e}
                  className={
                    "group flex items-center gap-6 rounded-xl border-l-4 bg-canvas px-6 py-5 shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift " +
                    (i % 2 === 0 ? "border-primary/40" : "border-primary/80")
                  }
                >
                  <span className="shrink-0 font-serif text-display-sm font-medium text-primary/80 transition-transform duration-200 group-hover:scale-110 group-hover:text-primary">
                    {i + 1}
                  </span>
                  <span className="text-title-md text-ink">{e}</span>
                </li>
              ))}
            </ul>

            <Button variant="primary" size="lg" uppercase className="mt-10">
              {r.cta}
            </Button>
          </Reveal>

          {/* Row 2 right: card — top aligns with step 1 */}
          <Reveal delay={120} className="relative col-start-2 row-start-2">
            <div className="absolute inset-0 scale-110 rounded-pill bg-primary/15 blur-3xl" />

            <div
              ref={balanceCardRef}
              className="hover-lift relative rounded-xl border border-hairline bg-canvas p-12 shadow-lift"
            >
            <div className="mb-5 flex items-start justify-between border-b border-hairline pb-5">
              <div>
                <div className="mb-3 inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-5 py-2 text-title-sm uppercase tracking-wide text-primary">
                  Elite
                </div>
                <div className="text-caption-uppercase uppercase text-primary">{b.label}</div>
                <div className="mt-1 font-serif text-display-md text-ink">
                  <XPCountUp value={b.value} animationKey={animationKey} />
                </div>
              </div>

              <div
                key={animationKey}
                className="rewards-star-pop relative flex h-14 w-14 items-center justify-center"
              >
                <Star
                  className="relative z-10 h-10 w-10 text-primary drop-shadow-sm"
                  fill="currentColor"
                  strokeWidth={0}
                />
                <span className="rewards-star-triangle-shine pointer-events-none absolute z-20 h-10 w-10" />
              </div>
            </div>

            <div className="flex items-center justify-between text-caption-uppercase uppercase">
              <span className="flex items-center gap-2 text-muted">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/15">
                  <Award className="h-3.5 w-3.5 text-primary" strokeWidth={2.5} />
                </span>
                {b.nextTier}
              </span>
              <span className="text-primary">{b.toGo}</span>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-caption-uppercase uppercase text-primary">
                Free shipping
              </span>
              <span className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-caption-uppercase uppercase text-primary">
                Early access
              </span>
            </div>

            <div className="mt-6 flex h-2 w-full overflow-hidden rounded-pill bg-hairline/40">
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
        </div>{/* end grid */}
      </div>{/* end hidden md:block */}

      <style>{`
        @keyframes rewards-remaining-sweep {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }

        @keyframes rewards-star-reveal {
          0% {
            opacity: 0;
            transform: scale(0.35) rotate(-12deg);
            filter: brightness(1);
          }
          18% {
            opacity: 1;
            transform: scale(0.78) rotate(9deg);
            filter: brightness(1.15);
          }
          28% {
            transform: scale(0.82) rotate(-8deg) translateX(-1px);
          }
          38% {
            transform: scale(0.86) rotate(7deg) translateX(1px);
          }
          48% {
            transform: scale(0.9) rotate(-5deg);
          }
          58% {
            transform: scale(1.38) rotate(0deg);
            filter: brightness(1.8);
          }
          76% {
            transform: scale(0.94);
            filter: brightness(1.2);
          }
          100% {
            opacity: 1;
            transform: scale(1);
            filter: brightness(1);
          }
        }

        @keyframes rewards-triangle-shine-reveal {
          0%, 44% {
            opacity: 0;
            transform: scaleY(0.2) translateY(-4px);
          }
          58% {
            opacity: 0.8;
            transform: scaleY(1.08) translateY(0);
          }
          76% {
            opacity: 0.34;
            transform: scaleY(0.96) translateY(0);
          }
          100% {
            opacity: 0.28;
            transform: scaleY(1) translateY(0);
          }
        }

        .rewards-star-pop {
          animation: rewards-star-reveal 1.45s cubic-bezier(0.2, 0.8, 0.2, 1) both;
        }

        .rewards-star-triangle-shine {
          background: rgba(255,255,255,0.58);
          clip-path: polygon(50% 44%, 78% 92%, 62% 100%);
          filter: blur(0.2px);
          mix-blend-mode: screen;
          animation: rewards-triangle-shine-reveal 1.45s ease-out both;
        }

        @media (prefers-reduced-motion: reduce) {
          [style*="rewards-remaining-sweep"],
          .rewards-star-pop,
          .rewards-star-triangle-shine {
            animation: none !important;
          }

          .rewards-star-triangle-shine {
            opacity: 0.28;
          }
        }
      `}</style>
    </Section>
  );
}