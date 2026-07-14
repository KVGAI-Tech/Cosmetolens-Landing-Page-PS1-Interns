import {
  ArrowRight,
  Waypoints,
  Layers,
  Building2,
  BookOpen,
  Sparkles,
} from "lucide-react";
import { Reveal } from "../ui/Reveal";
import { forBrands, knowledgeHub } from "../../data/content";
const feedbackImage = "/images/serum-hands.jpg";

/* Icon-in-circle badge — matches the "🛡 Cosmetolens" badge style used
   elsewhere on the site, rather than a bare icon floating next to text. */
function Eyebrow({
  icon: Icon,
  children,
  dark = false,
}: {
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <span
        className={[
          "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border",
          dark
            ? "border-white/25 bg-white/10 text-white"
            : "border-primary/25 bg-primary/8 text-primary",
        ].join(" ")}
      >
        <Icon className="h-3.5 w-3.5" />
      </span>
      <p
        className={[
          "text-caption-uppercase uppercase",
          dark ? "text-white/80" : "text-primary",
        ].join(" ")}
      >
        {children}
      </p>
    </div>
  );
}

/* One consistent index pill carrying the section's single 01→04 narrative,
   instead of every card inventing its own counter. */
function IndexTag({ n, dark = false }: { n: string; dark?: boolean }) {
  return (
    <span
      className={[
        "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-caption tabular-nums",
        dark ? "bg-white/15 text-white" : "bg-primary/10 text-primary",
      ].join(" ")}
    >
      {n}
    </span>
  );
}

/* One row component used by every list in this section — Signal Flow,
   For Brands, and Knowledge Hub. Same background, same hover, same arrow,
   same real <a> tag. No more three different list styles doing the same job. */
function Row({
  index,
  label,
  dark = false,
}: {
  index?: string;
  label: string;
  dark?: boolean;
}) {
  return (
    <a
      href="#"
      className={[
        "group/row flex cursor-pointer items-center justify-between gap-5 rounded-xl px-4 py-3.5 transition-colors duration-300",
        dark
          ? "bg-white/12 hover:bg-white/20"
          : "bg-primary/6 hover:bg-primary/12",
      ].join(" ")}
    >
      <span className="flex min-w-0 items-center gap-4">
        {index && (
          <span
            className={[
              "shrink-0 text-caption tabular-nums",
              dark ? "text-white/60" : "text-primary/70",
            ].join(" ")}
          >
            {index}
          </span>
        )}
        <span
          className={[
            "text-body-sm leading-relaxed",
            dark ? "text-white/92" : "text-ink/85",
          ].join(" ")}
        >
          {label}
        </span>
      </span>
      <ArrowRight
        className={[
          "h-4 w-4 shrink-0 transition-transform duration-300 group-hover/row:translate-x-1",
          dark ? "text-white/70" : "text-primary/70",
        ].join(" ")}
      />
    </a>
  );
}

function FeatureList({
  items,
  dark = false,
}: {
  items: readonly string[];
  dark?: boolean;
}) {
  return (
    <div className="mt-7 flex flex-col gap-2.5">
      {items.map((item) => (
        <Row key={item} label={item} dark={dark} />
      ))}
    </div>
  );
}

function SignalFlow() {
  const steps = [
    "Consumer reports",
    "Skin-type context",
    "Ingredient patterns",
    "Product intelligence",
  ];
  return (
    <div className="mt-8">
      <p className="mb-5 text-caption-uppercase uppercase text-primary">
        Signal Flow
      </p>
      <div className="flex flex-col gap-2.5">
        {steps.map((item, index) => (
          <Row
            key={item}
            index={String(index + 1).padStart(2, "0")}
            label={item}
          />
        ))}
      </div>
    </div>
  );
}

export function ForBrandsHub() {
  return (
    <section className="relative w-full overflow-hidden border-y border-hairline bg-canvas">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 h-[520px] w-[520px] rounded-full bg-primary/8 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-[34%] h-[560px] w-[560px] rounded-full bg-surface-dark/8 blur-3xl"
      />
      <div className="relative mx-auto max-w-[1320px] px-6 py-16 md:px-10 md:py-20 lg:py-24">
        {/* Section heading */}
        <Reveal className="mx-auto mb-14 max-w-3xl text-center md:mb-16 lg:mb-20">
          <p className="mb-3 text-eyebrow uppercase text-primary">
            Intelligence Layer
          </p>
          <h2 className="mx-auto max-w-3xl text-display-md leading-[0.98] text-ink md:text-display-lg lg:text-display-lg">
            Turning skincare feedback into product intelligence.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-body-md leading-relaxed text-muted">
            Cosmetolens connects consumer reports, skin context, ingredient
            data, and product outcomes to support better skincare decisions.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8 lg:auto-rows-fr">
          {/* 01 — How it works — ivory */}
          <Reveal
            delay={80}
            className="relative flex flex-col overflow-hidden rounded-[1.5rem] border border-hairline bg-[#f4ecde]/90 p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg md:p-10 lg:col-span-5"
          >
            <div className="mb-5 flex items-center justify-between">
              <Eyebrow icon={Waypoints}>How it works</Eyebrow>
              <IndexTag n="01" />
            </div>
            <h3 className="max-w-md text-display-sm leading-tight text-ink md:text-display-md">
              How the signal moves.
            </h3>
            <p className="mt-4 max-w-md text-body-sm leading-relaxed text-muted">
              From what people report, to what brands and readers can act on.
            </p>
            <SignalFlow />
          </Reveal>

          {/* 02 — What you get — photo, ivory output panel, real green research panel */}
          <Reveal
            delay={120}
            className="grid grid-cols-1 overflow-hidden rounded-[1.5rem] border border-hairline shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg md:grid-cols-2 lg:col-span-7"
          >
            <div className="relative min-h-[320px] overflow-hidden md:min-h-full">
              <img
                src={feedbackImage}
                alt="Skincare serum"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/28 to-transparent" />
              <div className="absolute bottom-7 left-7 right-7">
                <p className="mb-3 text-caption-uppercase uppercase text-white/76">
                  Input
                </p>
                <h3 className="max-w-xs text-display-sm leading-tight text-white md:text-display-md">
                  Reports, reviews, routines, and reactions.
                </h3>
              </div>
            </div>
            <div className="grid grid-cols-1 divide-y divide-hairline">
              <div className="bg-[#f7efe3] p-7 md:p-8">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <Eyebrow icon={Layers}>Output</Eyebrow>
                  <IndexTag n="02" />
                </div>
                <h3 className="text-display-sm leading-tight text-ink">
                  Product intelligence for brands.
                </h3>
                <p className="mt-4 text-body-sm leading-relaxed text-muted">
                  Identify performance patterns and evidence gaps across real
                  skin contexts.
                </p>
              </div>
              {/* Real green panel, same family as the site's own dark-green
                  section — layered tones (base + lighter inset chip) for
                  depth, full-opacity white text for guaranteed contrast. */}
              <div className="bg-surface-dark p-7 text-white md:p-8">
                <Eyebrow icon={Sparkles} dark>
                  Research
                </Eyebrow>
                <h3 className="mt-5 text-display-sm leading-tight text-white">
                  Skincare science, simplified.
                </h3>
                <p className="mt-4 text-body-sm leading-relaxed text-white/90">
                  Clear explanations for ingredients, conditions, claims,
                  and clinical evidence.
                </p>
              </div>
            </div>
          </Reveal>

          {/* 03 — For Brands — ivory */}
          <Reveal
            delay={160}
            className="group/card relative flex cursor-pointer flex-col overflow-hidden rounded-[1.5rem] border border-hairline bg-[#f7efe3]/90 p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg md:p-10 lg:col-span-6"
          >
            <div className="mb-6 flex items-start justify-between gap-6">
              <Eyebrow icon={Building2}>For Brands</Eyebrow>
              <IndexTag n="03" />
            </div>
            <h3 className="max-w-xl text-display-md leading-tight text-ink">
              {forBrands.heading}
            </h3>
            <p className="mt-4 max-w-2xl text-body-md leading-relaxed text-muted">
              Brands gain access to skin-type specific performance data and
              evidence they can act on.
            </p>
            <FeatureList items={forBrands.benefits} />
            <a
              href="#"
              className="group mt-auto inline-flex items-center gap-2 pt-8 text-[15px] font-semibold text-primary transition-colors duration-300 hover:text-ink"
            >
              {forBrands.cta}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </Reveal>

          {/* 04 — Knowledge Hub — real green, paired with For Brands as light/dark twins */}
          <Reveal
            delay={200}
            className="group/card relative flex cursor-pointer flex-col overflow-hidden rounded-[1.5rem] border border-white/10 bg-surface-dark p-8 text-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:shadow-lg md:p-10 lg:col-span-6"
          >
            <div className="mb-6 flex items-start justify-between gap-6">
              <Eyebrow icon={BookOpen} dark>
                Knowledge Hub
              </Eyebrow>
              <IndexTag n="04" dark />
            </div>
            <h3 className="max-w-xl text-display-md leading-tight text-white">
              {knowledgeHub.heading}
            </h3>
            <p className="mt-4 max-w-2xl text-body-md leading-relaxed text-white/90">
              {knowledgeHub.body}
            </p>
            <FeatureList items={knowledgeHub.explore} dark />
            <a
              href="#"
              className="group mt-auto inline-flex items-center gap-2 pt-8 text-[15px] font-semibold text-white transition-colors duration-300 hover:text-white/75"
            >
              {knowledgeHub.cta}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
