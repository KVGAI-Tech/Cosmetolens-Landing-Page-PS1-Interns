import { ArrowRight } from "lucide-react";
import { Section } from "../ui/Section";
import { Reveal } from "../ui/Reveal";
import { forBrands, knowledgeHub } from "../../data/content";

// ── Local images only — no external URLs ──────────────────────────────────
const feedbackImage = "/images/serum-hands.jpg";
const scienceImage  = "/images/ingredient-actives.png";

// ── Shared feature list used in both brand cards ──────────────────────────
function FeatureList({
  items,
  dark = false,
}: {
  items: readonly string[];
  dark?: boolean;
}) {
  return (
    <div className="mt-5 grid grid-cols-1 gap-2">
      {items.map((item, index) => (
        <div
          key={item}
          className={[
            "group/feature flex min-h-[48px] items-center justify-between gap-3",
            "rounded-xl border px-3.5 py-2.5",
            "transition-all duration-300 ease-out hover:-translate-y-0.5",
            dark
              ? "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
              : "border-hairline bg-surface-soft/70 hover:border-primary/25 hover:bg-canvas/80",
          ].join(" ")}
          style={{ transitionDelay: `${index * 35}ms` }}
        >
          <div className="flex min-w-0 items-center gap-3">
            <span
              className={`shrink-0 text-caption ${
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
          <span
            className={`shrink-0 transition-transform duration-300 group-hover/feature:translate-x-1 ${
              dark ? "text-white/30" : "text-primary/60"
            }`}
          >
            →
          </span>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

export function ForBrandsHub() {
  return (
    <Section surface="canvas">
      {/*
        Outer bento card:
        - grain applied directly on this element (correct ::after pseudo usage)
        - rounded-xl uses the design token radius (16px) — not a custom value
        - No radial-gradient blob — removed entirely
        - No hardcoded hex colors — all using design tokens
      */}
      <Reveal
        delay={0}
        className="grain relative overflow-hidden rounded-xl border border-hairline bg-surface-soft p-4 shadow-sm md:p-5"
      >
        <div className="relative z-10 grid grid-cols-1 gap-4 lg:grid-cols-12">

          {/* ── Header card ─────────────────────────────────────────────── */}
          <Reveal
            delay={80}
            className="rounded-xl border border-hairline bg-canvas/55 p-6 transition-all duration-500 ease-out hover:bg-canvas/75 md:p-8 lg:col-span-5"
          >
            <span className="mb-4 inline-block text-[10px] uppercase tracking-[0.2em] text-primary">
              Intelligence Layer
            </span>
            <h2 className="text-display-lg leading-none text-ink">
              Turning skincare feedback into product intelligence.
            </h2>
            <p className="mt-5 max-w-md text-body-md leading-relaxed text-muted">
              Cosmetolens connects consumer reports, skin context, ingredient
              data, and product outcomes to support better skincare decisions.
            </p>

            {/* Signal flow mini-list */}
            <div className="mt-7 border-t border-hairline pt-5">
              <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-primary">
                Signal Flow
              </p>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {[
                  "Consumer reports",
                  "Skin-type context",
                  "Ingredient patterns",
                  "Product intelligence",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="group/signal flex items-center justify-between gap-3 rounded-xl border border-hairline bg-surface-soft/70 px-3 py-2.5 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-primary/25 hover:bg-canvas/80"
                  >
                    <div className="flex min-w-0 items-center gap-2.5">
                      <span className="shrink-0 text-caption text-primary">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-body-sm leading-snug text-ink">
                        {item}
                      </span>
                    </div>
                    <span className="shrink-0 text-primary/50 transition-transform duration-300 group-hover/signal:translate-x-1">
                      →
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* ── Visual bento card ────────────────────────────────────────── */}
          <Reveal
            delay={160}
            className="grid min-h-[360px] grid-cols-1 gap-4 rounded-xl border border-hairline bg-canvas/55 p-4 transition-all duration-500 ease-out hover:bg-canvas/70 md:grid-cols-2 lg:col-span-7"
          >
            {/* Left: lifestyle image */}
            <div className="group relative min-h-[260px] overflow-hidden rounded-lg border border-hairline bg-canvas">
              <img
                src={feedbackImage}
                alt="Skincare serum"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-dark/80 via-surface-dark/25 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 transition-transform duration-500 ease-out group-hover:-translate-y-1">
                <span className="mb-2 inline-block text-[10px] uppercase tracking-[0.2em] text-white/60">
                  Input
                </span>
                <p className="max-w-xs text-display-sm leading-tight text-white">
                  Reports, reviews, routines, and reactions.
                </p>
              </div>
            </div>

            {/* Right: two stacked output panels */}
            <div className="grid grid-cols-1 gap-4">
              {/* Output panel 1 — light */}
              <div className="rounded-lg border border-hairline bg-surface-soft/80 p-6 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-canvas/85">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-primary">
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

              {/* Output panel 2 — dark, uses surface-dark token */}
              <div className="group/research relative overflow-hidden rounded-lg border border-hairline bg-surface-dark p-6 text-white transition-all duration-300 ease-out hover:-translate-y-0.5">
                <img
                  src={scienceImage}
                  alt="Ingredient actives"
                  className="absolute inset-0 h-full w-full object-cover opacity-15 transition-transform duration-700 ease-out group-hover/research:scale-105"
                />
                <div className="absolute inset-0 bg-surface-dark/80" />
                <div className="relative z-10 transition-transform duration-500 ease-out group-hover/research:-translate-y-1">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-white/60">
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

          {/* ── For Brands card — light with terracotta left border ───────── */}
          <Reveal
            delay={240}
            className="group/card relative flex h-full min-h-[520px] flex-col overflow-hidden rounded-xl border border-hairline bg-canvas/55 p-6 transition-all duration-500 ease-out hover:-translate-y-1 hover:bg-canvas/75 hover:shadow-lift md:p-7 lg:col-span-6"
          >
            <div className="absolute bottom-6 left-0 top-6 w-[3px] rounded-full bg-primary/60" />
            <div className="pl-4">
              <div className="mb-5 flex items-start justify-between gap-6">
                <div>
                  <span className="mb-3 inline-block text-[10px] uppercase tracking-[0.2em] text-primary">
                    For Brands
                  </span>
                  <h3 className="text-display-md leading-tight text-ink">
                    {forBrands.heading}
                  </h3>
                </div>
                <span className="hidden shrink-0 text-caption uppercase tracking-widest text-muted md:block">
                  01
                </span>
              </div>
              <p className="text-body-md leading-relaxed text-muted">
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

          {/* ── Knowledge Hub card — dark sage, uses surface-dark token ───── */}
          <Reveal
            delay={320}
            className="group/card relative flex h-full min-h-[520px] flex-col overflow-hidden rounded-xl border border-hairline bg-surface-dark p-6 transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-lift md:p-7 lg:col-span-6"
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
                  <span className="mb-3 inline-block text-[10px] uppercase tracking-[0.2em] text-white/50">
                    Knowledge Hub
                  </span>
                  <h3 className="text-display-md leading-tight text-white">
                    {knowledgeHub.heading}
                  </h3>
                </div>
                <span className="hidden shrink-0 text-caption uppercase tracking-widest text-white/30 md:block">
                  02
                </span>
              </div>
              <p className="text-body-md leading-relaxed text-white/65">
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
