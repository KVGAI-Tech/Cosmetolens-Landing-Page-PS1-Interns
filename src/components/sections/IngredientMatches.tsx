import { useState } from "react";
import {
  ArrowRight,
  Droplet,
  Shield,
  Sparkles,
  Zap,
  Leaf,
  Sun,
  type LucideIcon,
} from "lucide-react";
import { Section } from "../ui/Section";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { CountUp } from "../ui/CountUp";
import { cn } from "../../lib/cn";
import { ingredients as ing } from "../../data/content";

// Pick a representative icon for an ingredient based on its name/category.
// Falls back to a generic sparkle if nothing matches.
function getIngredientIcon(name: string): LucideIcon {
  const key = name.toLowerCase();
  if (key.includes("ceramide")) return Shield;
  if (key.includes("peptide")) return Zap;
  if (key.includes("hyaluronic") || key.includes("acid") && key.includes("hyal")) return Droplet;
  if (key.includes("niacinamide") || key.includes("b3")) return Sun;
  if (key.includes("retinol") || key.includes("retinoid")) return Sparkles;
  if (key.includes("azelaic")) return Leaf;
  return Sparkles;
}

// Standalone banner showcase — a separate set of 5 hero actives, each using
// its own product image from public/images/. Independent of the list/detail
// explorer below.
const banner = [
  { name: "Copper Tripeptide-1", tag: "Repair", image: "/images/copper.png" },
  { name: "Alpha Arbutin", tag: "Brighten", image: "/images/alpha.png" },
  { name: "Matrixyl 3000", tag: "Renew", image: "/images/matrixyl.png" },
  { name: "Vitamin E & C", tag: "Protect", image: "/images/vitamin.png" },
  { name: "Niacinamide", tag: "Even tone", image: "/images/niacinamide.png" },
];

// Circular progress ring that animates its sweep when `pct` changes,
// with the percentage value rendered in the center.
function ProgressRing({ pct, size = 96, stroke = 8 }: { pct: number; size?: number; stroke?: number }) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={stroke}
          className="stroke-hairline"
        />
        {/* Progress */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          className="stroke-primary transition-[stroke-dashoffset] duration-700 ease-out"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: offset,
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="font-serif text-display-sm text-ink">
          <CountUp value={pct} suffix="%" />
        </div>
      </div>
    </div>
  );
}

export function IngredientMatches() {
  const [active, setActive] = useState(0);
  const [mobileDeselected, setMobileDeselected] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const item = ing.items[active] ?? ing.items[0];
  const isHovering = hoveredIndex !== null;

  return (
    <Section surface="soft">
      <Reveal
        className={cn(
          "mb-8 flex flex-col gap-4 transition-all duration-300 sm:mb-10 sm:flex-row sm:items-end sm:justify-between",
          isHovering && "scale-[0.99] opacity-50",
        )}
      >
        <div className="max-w-2xl">
          <div className="mb-3 text-eyebrow uppercase text-primary sm:mb-4">{ing.eyebrow}</div>
          <h2 className="text-display-md sm:text-display-xl">
            {ing.heading.split(/(Your)/g).map((part, i) =>
              part === "Your" ? (
                <span key={i} className="text-primary">
                  {part}
                </span>
              ) : (
                <span key={i}>{part}</span>
              ),
            )}
          </h2>
        </div>
        <div className="flex flex-col items-start gap-2 sm:items-end">
          <div
            className="text-title-lg italic text-primary sm:text-display-sm"
            style={{ fontFamily: "'Caveat', 'Segoe Script', cursive" }}
          >
            Personalized for you
          </div>
          <Button variant="link">{ing.link}</Button>
        </div>
      </Reveal>

      {/* Molecule banner: product photos, lift + strong zoom on hover */}
      {/* Molecule banner: product photos connected by a simple atom chain */}
      <Reveal
        className={cn(
          "mb-12 transition-all duration-300",
          isHovering && "scale-[0.99] opacity-50",
        )}
      >
        <div className="relative overflow-hidden rounded-xl border border-hairline bg-canvas px-4 py-5 sm:px-8 sm:py-10">
          {/* Chain only makes sense against the 5-across desktop layout;
              hidden below md where the grid wraps to 2/3 columns instead. */}
          <svg
            className="pointer-events-none absolute left-8 right-8 top-[4.25rem] z-0 hidden h-36 w-[calc(100%-4rem)] overflow-visible md:block"
            aria-hidden="true"
          >
            {[
              ["10%", "50%", "20%", "14%"],
              ["20%", "14%", "30%", "50%"],
              ["30%", "50%", "40%", "86%"],
              ["40%", "86%", "50%", "50%"],
              ["50%", "50%", "60%", "14%"],
              ["60%", "14%", "70%", "50%"],
              ["70%", "50%", "80%", "86%"],
              ["80%", "86%", "90%", "50%"],
            ].map(([x1, y1, x2, y2], index) => (
              <line
                key={index}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="rgba(196,90,53,0.78)"
                strokeWidth="3"
                strokeLinecap="round"
              />
            ))}

            {[
              { cx: "20%", cy: "14%" },
              { cx: "40%", cy: "86%" },
              { cx: "60%", cy: "14%" },
              { cx: "80%", cy: "86%" },
            ].map((atom) => (
              <circle
                key={`${atom.cx}-${atom.cy}`}
                cx={atom.cx}
                cy={atom.cy}
                r="6"
                fill="rgba(196,90,53,0.95)"
              />
            ))}
          </svg>
          {/* Mobile layout: 3-row pyramid (1 hero + 2×2) — hidden at sm and above */}
          <div className="relative z-10 flex flex-col items-center gap-2 sm:hidden">
            {/* Row 1: Copper hero — faint terracotta bg matching its ring */}
            <div
              className="group flex w-full flex-col items-center gap-2 rounded-lg px-2 py-3 text-center transition-all duration-300"
              style={{ backgroundColor: "rgba(196,90,53,0.07)" }}
            >
              <div
                className="relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-primary/5 ring-2 ring-primary/40 ring-offset-2 ring-offset-canvas transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:bg-primary/10 group-hover:shadow-soft"
                style={{ animation: `ingredient-float 4s ease-in-out 0s infinite` }}
              >
                <img
                  src={banner[0].image}
                  alt={banner[0].name}
                  className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-150"
                />
              </div>
              <div>
                <div className="text-body-sm text-ink">{banner[0].name}</div>
                <div className="mt-0.5 text-caption-uppercase uppercase text-primary opacity-100">
                  {banner[0].tag}
                </div>
              </div>
            </div>

            {/* Row 2 & 3: remaining 4 in a 2×2 grid, each half gets its own faint bg */}
            {(() => {
              const ringColors = [
                "rgba(180,200,210,0.9)",  // Alpha Arbutin — pearlescent icy blue
                "rgba(196,140,60,0.85)",  // Matrixyl® 3000 — golden amber
                "rgba(200,210,190,0.9)",  // Vitamin E & C — soft sage
                "rgba(160,185,200,0.9)",  // Niacinamide — cool silver-blue
              ];
              const bgColors = [
                "rgba(180,200,210,0.10)",  // Alpha Arbutin
                "rgba(196,140,60,0.09)",   // Matrixyl® 3000
                "rgba(200,210,190,0.10)",  // Vitamin E & C
                "rgba(160,185,200,0.10)",  // Niacinamide
              ];
              return (
                <div className="grid w-full grid-cols-2 gap-2">
                  {banner.slice(1).map((b, i) => (
                    <div
                      key={b.name}
                      className="group flex flex-col items-center gap-2 rounded-lg px-2 py-3 text-center transition-all duration-300"
                      style={{ backgroundColor: bgColors[i] }}
                    >
                      <div
                        className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-primary/5 ring-2 ring-offset-2 ring-offset-canvas transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:bg-primary/10 group-hover:shadow-soft"
                        style={{
                          animation: `ingredient-float 4s ease-in-out ${(i + 1) * 0.3}s infinite`,
                          boxShadow: `0 0 0 2px ${ringColors[i]}`,
                        }}
                      >
                        <img
                          src={b.image}
                          alt={b.name}
                          className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-150"
                        />
                      </div>
                      <div>
                        <div className="text-body-sm text-ink">{b.name}</div>
                        <div className="mt-0.5 text-caption-uppercase uppercase text-muted opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          {b.tag}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>

          {/* Desktop/tablet layout: original 5-across grid — hidden below sm */}
          {(() => {
            const desktopRings = [
              "rgba(196,90,53,0.7)",    // Copper Tripeptide-1 — terracotta
              "rgba(180,200,210,0.9)",  // Alpha Arbutin — icy blue
              "rgba(196,140,60,0.85)",  // Matrixyl® 3000 — golden amber
              "rgba(200,210,190,0.9)",  // Vitamin E & C — soft sage
              "rgba(160,185,200,0.9)",  // Niacinamide — cool silver-blue
            ];
            return (
              <div className="relative z-10 hidden grid-cols-3 gap-3 sm:grid sm:grid-cols-3 sm:gap-4 md:grid-cols-5">
                {banner.map((b, i) => (
                  <div
                    key={b.name}
                    className="group flex flex-col items-center gap-2 rounded-lg px-2 py-4 text-center transition-all duration-300 hover:bg-primary/5 sm:gap-3 sm:px-3 sm:py-6"
                  >
                    <div
                      className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-primary/5 transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:bg-primary/10 group-hover:shadow-soft sm:h-24 sm:w-24 md:h-28 md:w-28"
                      style={{
                        animation: `ingredient-float 4s ease-in-out ${i * 0.3}s infinite`,
                        boxShadow: `0 0 0 2px ${desktopRings[i]}`,
                      }}
                    >
                      <img
                        src={b.image}
                        alt={b.name}
                        className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-150"
                      />
                    </div>
                    <div>
                      <div className="text-body-sm text-ink sm:text-title-sm">{b.name}</div>
                      <div className="mt-0.5 text-caption-uppercase uppercase text-muted opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        {b.tag}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}
        </div>

        <style>{`
          @keyframes ingredient-float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-6px); }
          }
          @media (prefers-reduced-motion: reduce) {
            [style*="ingredient-float"] { animation: none !important; }
          }
        `}</style>
      </Reveal>
      {/* Interactive explorer: selectable list <-> animated detail */}
      <Reveal className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8">
        <ul className="space-y-2 md:col-span-5">
          {ing.items.map((it, i) => {
            const selected = i === active;
            const hovered = i === hoveredIndex;
            return (
              <li
                key={it.name}
                className={cn(
                  "relative transition-all duration-300",
                  isHovering && !hovered && "scale-[0.98] opacity-40",
                )}
                style={{ zIndex: hovered ? 30 : "auto" }}
              >
                <button
                  type="button"
                  onMouseEnter={() => {
                    setActive(i);
                    setMobileDeselected(false);
                    setHoveredIndex(i);
                  }}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => {
                    if (i === active && !mobileDeselected) {
                      setMobileDeselected(true);
                    } else {
                      setActive(i);
                      setMobileDeselected(false);
                    }
                  }}
                  className={cn(
                    "relative flex w-full items-center gap-4 rounded-lg border px-5 py-4 text-left transition-all duration-200",
                    hovered
                      ? "scale-105 border-primary bg-primary shadow-soft"
                      : selected && !mobileDeselected
                        ? "border-primary bg-primary shadow-soft sm:bg-canvas"
                        : selected
                          ? "border-primary bg-canvas shadow-soft"
                          : "border-hairline bg-transparent hover:bg-canvas/60",
                  )}
                >
                  <span
                    className={cn(
                      "font-serif text-title-lg",
                      hovered
                        ? "text-canvas"
                        : selected && !mobileDeselected
                          ? "text-canvas sm:text-primary"
                          : selected
                            ? "text-primary"
                            : "text-muted",
                    )}
                  >
                    {it.symbol}
                  </span>
                  <span
                    className={cn(
                      "flex-1 text-title-sm",
                      hovered
                        ? "text-canvas"
                        : selected && !mobileDeselected
                          ? "text-canvas sm:text-ink"
                          : "text-ink",
                    )}
                  >
                    {it.name}
                  </span>
                  {/* Arrow: hidden on mobile */}
                  <ArrowRight
                    className={cn(
                      "hidden h-4 w-4 transition-all sm:block",
                      hovered
                        ? "text-canvas opacity-100"
                        : selected
                          ? "text-primary opacity-100"
                          : "opacity-0",
                    )}
                  />
                </button>

                {/* Mobile-only: inline detail panel directly below the active row */}
                {selected && (
                  <div className="relative mt-2 overflow-hidden rounded-xl border border-hairline bg-canvas p-5 shadow-soft sm:hidden">
                    <div
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(196,90,53,0.16) 0%, rgba(196,90,53,0.08) 35%, transparent 70%)",
                      }}
                    />
                    <div className="pointer-events-none absolute -bottom-4 -right-4 text-primary/10">
                      {(() => {
                        const Icon = getIngredientIcon(it.name);
                        return <Icon className="h-32 w-32" strokeWidth={1} />;
                      })()}
                    </div>
                    <div className="relative">
                      <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                        {(() => {
                          const Icon = getIngredientIcon(it.name);
                          return <Icon className="h-4 w-4" strokeWidth={2} />;
                        })()}
                      </div>
                      <h3 className="text-title-lg text-ink">{it.name}</h3>
                      <p className="mt-3 text-body-md text-muted">{it.body}</p>
                      <div className="mt-5 flex items-center gap-4">
                        <ProgressRing pct={it.pct} size={88} stroke={7} />
                        <div
                          className="text-title-lg italic text-primary"
                          style={{ fontFamily: "'Caveat', 'Segoe Script', cursive" }}
                        >
                          Skin Match
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        {/* Detail panel — desktop/tablet only */}
        <div
          className="relative hidden overflow-hidden rounded-xl border border-hairline bg-canvas p-6 shadow-soft transition-all duration-300 sm:block sm:p-10 md:col-span-7"
          style={{ zIndex: isHovering ? 30 : "auto" }}
        >
          {/* Orange wash: darker on the left, fading out toward the bottom-right
              so the watermark icon there stays clearly visible. */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(196,90,53,0.16) 0%, rgba(196,90,53,0.08) 35%, transparent 70%)",
            }}
          />

          {/* Subtle watermark icon, tucked in the open lower-right space
              where the wash above fades out. */}
          <div className="pointer-events-none absolute -bottom-6 -right-6 text-primary/10 sm:-bottom-10 sm:-right-10">
            {(() => {
              const Icon = getIngredientIcon(item.name);
              return <Icon className="h-40 w-40 sm:h-64 sm:w-64" strokeWidth={1} />;
            })()}
          </div>

          <div className="relative">
            <div>
              <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                {(() => {
                  const Icon = getIngredientIcon(item.name);
                  return <Icon className="h-5 w-5" strokeWidth={2} />;
                })()}
              </div>
              <h3 className="text-title-lg text-ink sm:text-display-sm">{item.name}</h3>
            </div>
            <p className="mt-4 max-w-md text-body-md text-muted sm:mt-6 sm:text-body-lg">{item.body}</p>

            {/* Skin match ring, placed below the description */}
            <div className="mt-6 flex flex-wrap items-center gap-4 sm:mt-8 sm:gap-6">
              <ProgressRing pct={item.pct} size={104} stroke={8} />
              <div
                className="text-title-lg italic text-primary sm:text-display-sm"
                style={{ fontFamily: "'Caveat', 'Segoe Script', cursive" }}
              >
                Skin Match
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}