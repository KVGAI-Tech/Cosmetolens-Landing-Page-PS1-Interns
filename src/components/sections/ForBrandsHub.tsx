import { ArrowRight } from "lucide-react";
import { Section } from "../ui/Section";
import { Reveal } from "../ui/Reveal";
import { forBrands, knowledgeHub } from "../../data/content";
// ── Local images only — no external URLs ──────────────────────────────────
const feedbackImage = "/images/serum-hands.jpg";
const scienceImage = "/images/ingredient-actives.png";
// ── Shared feature list ───────────────────────────────────────────────────
function FeatureList({
  items,
  dark = false,
}: {
  items: readonly string[];
  dark?: boolean;
}) {
  return (
    <div
      className={[
        "mt-5 divide-y",
        dark ? "divide-white/10" : "divide-hairline",
      ].join(" ")}
    >
      {items.map((item, index) => (
        <div
          key={item}
          className="group/feature flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
        >
          <div className="flex min-w-0 items-center gap-3">
            <span
              className={`shrink-0 text-caption tabular-nums ${
                dark ? "text-white/40" : "text-primary"
              }`}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <span
              className={`text-body-sm leading-snug ${
                dark ? "text-white/80" : "text-ink"
              }`}
            >
              {item}
            </span>
          </div>
          <ArrowRight
            className={`h-4 w-4 shrink-0 transition-transform duration-300 group-hover/feature:translate-x-1 ${
              dark ? "text-white/30" : "text-primary/50"
            }`}
          />
        </div>
      ))}
    </div>
  );
}
// ── Signal flow ───────────────────────────────────────────────────────────
// Mobile stays stacked. Desktop uses compact vertical pills so the card does
// not become awkwardly stretched or sparse inside the bento grid.
function SignalFlow() {
  const steps = [
    "Consumer reports",
    "Skin-type context",
    "Ingredient patterns",
    "Product intelligence",
  ];
  return (
    <div className="mt-6 border-t border-hairline pt-5">
      <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.2em] text-primary">
        Signal Flow
      </p>
      <div className="flex flex-col gap-2.5">
        {steps.map((item, index) => (
          <div
            key={item}
            className="group/step flex items-center justify-between gap-3 rounded-full border border-hairline bg-surface-soft/70 px-3 py-2"
          >
            <div className="flex min-w-0 items-center gap-2.5">
              <span className="shrink-0 text-caption tabular-nums text-primary">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0 text-body-sm leading-snug text-ink">
                {item}
              </span>
            </div>
            <ArrowRight className="h-3.5 w-3.5 shrink-0 text-primary/35 transition-transform duration-300 group-hover/step:translate-x-1" />
          </div>
        ))}
      </div>
    </div>
  );
}
// ─────────────────────────────────────────────────────────────────────────────
export function ForBrandsHub() {
  return (
    <Section surface="canvas">
      {/* Section heading */}
      <Reveal className="mx-auto mb-10 max-w-2xl text-center md:mb-12 lg:mb-14">
        <p className="mb-3 text-eyebrow uppercase text-primary">
          Intelligence Layer
        </p>
        <h2 className="text-display-md leading-tight text-ink md:text-display-xl lg:text-display-xl">
          Turning skincare feedback into product intelligence.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-body-md leading-relaxed text-muted md:mt-5">
          Cosmetolens connects consumer reports, skin context, ingredient data,
          and product outcomes to support better skincare decisions.
        </p>
      </Reveal>
      {/*
        Desktop fix:
        - max width prevents the bento from becoming oversized on large screens
        - compact desktop padding/gaps
        - removed oversized desktop min-heights from upper cards
      */}
      <Reveal
        delay={80}
        className="grain relative mx-auto mt-8 max-w-6xl overflow-hidden rounded-xl border border-hairline bg-surface-soft p-3 shadow-sm md:p-5 lg:p-6"
      >
        <div className="relative z-10 grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-5">
          {/* ── Signal flow card ────────────────────────────────────────── */}
          <Reveal
            delay={120}
            className="rounded-xl border border-hairline bg-canvas/55 p-5 transition-all duration-500 ease-out hover:bg-canvas/75 md:p-7 lg:col-span-5 lg:p-8"
          >
            <h3 className="text-display-sm leading-tight text-ink">
              How the signal moves.
            </h3>
            <p className="mt-3 max-w-md text-body-sm leading-relaxed text-muted">
              From what people report, to what brands and readers can act on.
            </p>
            <SignalFlow />
          </Reveal>
          {/* ── Visual bento card ────────────────────────────────────────── */}
          <Reveal
            delay={160}
            className="grid grid-cols-1 gap-3 rounded-xl border border-hairline bg-canvas/55 p-3 transition-all duration-500 ease-out hover:bg-canvas/70 md:grid-cols-2 md:gap-4 md:p-4 lg:col-span-7"
          >
            {/* Left: lifestyle image */}
            <div className="group relative min-h-[300px] overflow-hidden rounded-lg bg-canvas md:min-h-[360px] md:border md:border-hairline lg:min-h-[420px]">
              <img
                src={feedbackImage}
                alt="Skincare serum"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-dark/80 via-surface-dark/25 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 transition-transform duration-500 ease-out group-hover:-translate-y-1">
                <span className="mb-2 inline-block text-caption-uppercase uppercase text-white/60">
                  Input
                </span>
                <p className="max-w-xs text-display-sm leading-tight text-white">
                  Reports, reviews, routines, and reactions.
                </p>
              </div>
            </div>
            {/* Right: two stacked output panels */}
            <div className="grid grid-cols-1 gap-3 md:gap-4">
              <div className="rounded-lg bg-surface-soft/80 p-5 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-canvas/85 md:border md:border-hairline md:p-6">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-caption-uppercase uppercase text-primary">
                    Output
                  </span>
                  <span className="text-caption text-muted">01</span>
                </div>
                <h3 className="text-display-sm leading-tight text-ink">
                  Product intelligence for brands.
                </h3>
                <p className="mt-3 text-body-sm leading-relaxed text-muted">
                  Identify performance patterns and evidence gaps across real
                  skin contexts.
                </p>
              </div>
              <div className="group/research relative overflow-hidden rounded-lg bg-surface-dark p-5 text-white transition-all duration-300 ease-out hover:-translate-y-0.5 md:border md:border-hairline md:p-6">
                <img
                  src={scienceImage}
                  alt="Ingredient actives"
                  className="absolute inset-0 h-full w-full object-cover opacity-15 transition-transform duration-700 ease-out group-hover/research:scale-105"
                />
                <div className="absolute inset-0 bg-surface-dark/80" />
                <div className="relative z-10 transition-transform duration-500 ease-out group-hover/research:-translate-y-1">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-caption-uppercase uppercase text-white/60">
                      Research
                    </span>
                    <span className="text-caption text-white/40">02</span>
                  </div>
                  <h3 className="text-display-sm leading-tight text-white">
                    Skincare science, simplified.
                  </h3>
                  <p className="mt-3 text-body-sm leading-relaxed text-white/70">
                    Clear explanations for ingredients, conditions, claims, and
                    clinical evidence.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
          {/* ── For Brands card ─────────────────────────────────────────── */}
          <Reveal
            delay={240}
            className="group/card relative flex h-full flex-col overflow-hidden rounded-xl border border-hairline bg-canvas/55 p-5 transition-all duration-500 ease-out hover:-translate-y-1 hover:bg-canvas/75 hover:shadow-lift md:p-8 lg:col-span-6"
          >
            <div className="absolute bottom-8 left-0 top-8 w-[2px] rounded-full bg-primary/45 md:bottom-10 md:top-10" />
            <div className="pl-3 md:pl-4">
              <div className="mb-5 flex items-start justify-between gap-6">
                <div>
                  <span className="mb-3 inline-block text-caption-uppercase uppercase text-primary">
                    For Brands
                  </span>
                  <h3 className="max-w-xl text-display-md leading-tight text-ink">
                    {forBrands.heading}
                  </h3>
                </div>
                <span className="hidden shrink-0 text-caption uppercase tracking-widest text-muted md:block">
                  01
                </span>
              </div>
              <p className="max-w-2xl text-body-md leading-relaxed text-muted">
                {forBrands.body}
              </p>
              <FeatureList items={forBrands.benefits} dark={false} />
              <a
                href="#"
                className="group/link mt-7 inline-flex items-center gap-2 text-[15px] font-semibold text-primary transition-colors duration-300 hover:text-ink"
              >
                {forBrands.cta}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1.5" />
              </a>
            </div>
          </Reveal>
          {/* ── Knowledge Hub card ──────────────────────────────────────── */}
          <Reveal
            delay={320}
            className="group/card relative flex h-full flex-col overflow-hidden rounded-xl border border-hairline bg-surface-dark p-5 text-white transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-lift md:p-8 lg:col-span-6"
          >
            <img
              src={scienceImage}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover opacity-10 transition-transform duration-700 group-hover/card:scale-105"
            />
            <div className="absolute inset-0 bg-surface-dark/90" />
            <div className="relative z-10 flex h-full flex-col">
              <div className="mb-5 flex items-start justify-between gap-6">
                <div>
                  <span className="mb-3 inline-block text-caption-uppercase uppercase text-white/50">
                    Knowledge Hub
                  </span>
                  <h3 className="max-w-xl text-display-md leading-tight text-white">
                    {knowledgeHub.heading}
                  </h3>
                </div>
                <span className="hidden shrink-0 text-caption uppercase tracking-widest text-white/30 md:block">
                  02
                </span>
              </div>
              <p className="max-w-2xl text-body-md leading-relaxed text-white/65">
                {knowledgeHub.body}
              </p>
              <FeatureList items={knowledgeHub.explore} dark={true} />
              <a
                href="#"
                className="group/link mt-7 inline-flex items-center gap-2 text-[15px] font-semibold text-white transition-colors duration-300 hover:text-white/70"
              >
                {knowledgeHub.cta}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1.5" />
              </a>
            </div>
          </Reveal>
        </div>
      </Reveal>
    </Section>
  );
}