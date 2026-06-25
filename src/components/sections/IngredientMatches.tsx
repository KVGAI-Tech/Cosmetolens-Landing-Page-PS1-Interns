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
  { name: "Matrixyl® 3000", tag: "Renew", image: "/images/matrixyl.png" },
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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const item = ing.items[active];
  const isHovering = hoveredIndex !== null;

  return (
    <Section surface="soft">
      <Reveal
        className={cn(
          "mb-10 flex items-end justify-between transition-all duration-300",
          isHovering && "scale-[0.99] opacity-50",
        )}
      >
        <div className="max-w-2xl">
          <div className="mb-4 text-eyebrow uppercase text-primary">{ing.eyebrow}</div>
          <h2 className="text-display-xl">
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
        <div className="flex flex-col items-end gap-2">
          <div
            className="text-display-sm italic text-primary"
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
        <div className="relative overflow-hidden rounded-xl border border-hairline bg-canvas px-8 py-10">
          <svg
            className="pointer-events-none absolute left-8 right-8 top-[4.25rem] z-0 h-36 w-[calc(100%-4rem)] overflow-visible"
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
          <div className="relative z-10 grid grid-cols-5 gap-4">
            {banner.map((b, i) => (
              <div
                key={b.name}
                className="group flex flex-col items-center gap-3 rounded-lg px-3 py-6 text-center transition-all duration-300 hover:bg-primary/5"
              >
                <div
                  className="relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-primary/5 transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:bg-primary/10 group-hover:shadow-soft"
                  style={{
                    animation: `ingredient-float 4s ease-in-out ${i * 0.3}s infinite`,
                  }}
                >
                  <img
                    src={b.image}
                    alt={b.name}
                    className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-150"
                  />
                </div>
                <div>
                  <div className="text-title-sm text-ink">{b.name}</div>
                  <div className="mt-0.5 text-caption-uppercase uppercase text-muted opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {b.tag}
                  </div>
                </div>
              </div>
            ))}
          </div>
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
      <Reveal className="grid grid-cols-12 gap-8">
        <ul className="col-span-5 space-y-2">
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
                    setHoveredIndex(i);
                  }}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => setActive(i)}
                  className={cn(
                    "relative flex w-full items-center gap-4 rounded-lg border px-5 py-4 text-left transition-all duration-200",
                    hovered
                      ? "scale-105 border-primary bg-primary shadow-soft"
                      : selected
                        ? "border-primary bg-canvas shadow-soft"
                        : "border-hairline bg-transparent hover:bg-canvas/60",
                  )}
                >
                  <span
                    className={cn(
                      "font-serif text-title-lg",
                      hovered ? "text-canvas" : selected ? "text-primary" : "text-muted",
                    )}
                  >
                    {it.symbol}
                  </span>
                  <span
                    className={cn(
                      "flex-1 text-title-sm",
                      hovered ? "text-canvas" : "text-ink",
                    )}
                  >
                    {it.name}
                  </span>
                  <ArrowRight
                    className={cn(
                      "h-4 w-4 transition-all",
                      hovered
                        ? "text-canvas opacity-100"
                        : selected
                          ? "text-primary opacity-100"
                          : "opacity-0",
                    )}
                  />
                </button>
              </li>
            );
          })}
        </ul>

        {/* Detail panel */}
        <div
          className="relative col-span-7 overflow-hidden rounded-xl border border-hairline bg-canvas p-10 shadow-soft transition-all duration-300"
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
          <div className="pointer-events-none absolute -bottom-10 -right-10 text-primary/10">
            {(() => {
              const Icon = getIngredientIcon(item.name);
              return <Icon className="h-64 w-64" strokeWidth={1} />;
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
              <h3 className="text-display-sm text-ink">{item.name}</h3>
            </div>
            <p className="mt-6 max-w-md text-body-lg text-muted">{item.body}</p>

            {/* Skin match ring, placed below the description */}
            <div className="mt-8 flex items-center gap-6">
              <ProgressRing pct={item.pct} size={144} stroke={10} />
              <div
                className="text-display-sm italic text-primary"
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