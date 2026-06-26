import { ArrowRight } from "lucide-react";
import { Section } from "../ui/Section";
import { Reveal } from "../ui/Reveal";
import { forBrands, knowledgeHub } from "../../data/content";

const feedbackImage =
  "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=1200";
const scienceImage =
  "https://images.unsplash.com/photo-1511174511562-5f7f18b874f8?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=900";

function FeatureList({ items, dark = false }: { items: string[]; dark?: boolean }) {
  return (
    <div className="mt-5 grid grid-cols-1 gap-2">
      {items.map((item, index) => (
        <div
          key={item}
          className={`
            group/feature flex min-h-[48px] items-center justify-between gap-3
            rounded-xl border px-3.5 py-2.5
            transition-all duration-300 ease-out hover:-translate-y-0.5
            ${dark
              ? "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
              : "border-hairline bg-surface-soft/70 hover:border-primary/25 hover:bg-canvas/80"
            }
          `}
          style={{ transitionDelay: `${index * 35}ms` }}
        >
          <div className="flex min-w-0 items-center gap-3">
            <span className={`shrink-0 text-caption ${dark ? "text-white/40" : "text-primary"}`}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className={`text-body-sm leading-snug ${dark ? "text-white/80" : "text-ink"}`}>
              {item}
            </span>
          </div>
          <span className={`shrink-0 transition-transform duration-300 group-hover/feature:translate-x-1 ${dark ? "text-white/30" : "text-primary/60"}`}>
            →
          </span>
        </div>
      ))}
    </div>
  );
}

export function ForBrandsHub() {
  return (
    <Section surface="canvas">
      <Reveal
        delay={0}
        className="relative overflow-hidden rounded-[1.75rem] border border-hairline bg-surface-soft p-4 shadow-sm md:p-5"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(192,98,63,0.10),transparent_30%),radial-gradient(circle_at_90%_15%,rgba(78,94,71,0.12),transparent_34%)]" />
        <div className="pointer-events-none absolute inset-0 grain opacity-20" />

        <div className="relative z-10 grid grid-cols-1 gap-4 lg:grid-cols-12">

          {/* Header */}
          <Reveal delay={80} className="rounded-2xl border border-hairline bg-canvas/55 p-6 transition-all duration-500 ease-out hover:bg-canvas/75 md:p-8 lg:col-span-5">
            <span className="mb-4 inline-block text-caption uppercase tracking-[0.24em] text-primary">
              Intelligence Layer
            </span>
            <h2 className="text-display-lg leading-none text-ink">
              Turning skincare feedback into product intelligence.
            </h2>
            <p className="mt-5 max-w-md text-body-md leading-relaxed text-muted">
              Cosmetolens connects consumer reports, skin context, ingredient data, and product outcomes to support better skincare decisions.
            </p>
            <div className="mt-7 border-t border-hairline pt-5">
              <p className="mb-3 text-caption uppercase tracking-[0.22em] text-primary">Signal Flow</p>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {["Consumer reports", "Skin-type context", "Ingredient patterns", "Product intelligence"].map((item, index) => (
                  <div
                    key={item}
                    className="group/signal flex items-center justify-between gap-3 rounded-xl border border-hairline bg-surface-soft/70 px-3 py-2.5 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-primary/25 hover:bg-canvas/80"
                  >
                    <div className="flex min-w-0 items-center gap-2.5">
                      <span className="shrink-0 text-caption text-primary">{String(index + 1).padStart(2, "0")}</span>
                      <span className="text-body-sm leading-snug text-ink">{item}</span>
                    </div>
                    <span className="shrink-0 text-primary/50 transition-transform duration-300 group-hover/signal:translate-x-1">→</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Visual card */}
          <Reveal delay={160} className="grid min-h-[360px] grid-cols-1 gap-4 rounded-2xl border border-hairline bg-canvas/55 p-4 transition-all duration-500 ease-out hover:bg-canvas/70 md:grid-cols-2 lg:col-span-7">
            <div className="group relative min-h-[260px] overflow-hidden rounded-xl border border-hairline bg-canvas">
              <img src={feedbackImage} alt="Skincare serum close up" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1f241d]/80 via-[#1f241d]/25 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 transition-transform duration-500 ease-out group-hover:-translate-y-1">
                <span className="mb-2 inline-block text-caption uppercase tracking-widest text-white/60">Input</span>
                <p className="max-w-xs text-display-sm leading-tight text-white">Reports, reviews, routines, and reactions.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="rounded-xl border border-hairline bg-surface-soft/80 p-6 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-canvas/85">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-caption uppercase tracking-[0.22em] text-primary">Output</span>
                  <span className="text-caption text-muted">01</span>
                </div>
                <h3 className="text-display-sm leading-tight text-ink">Product intelligence for brands.</h3>
                <p className="mt-3 text-body-sm leading-relaxed text-muted">Identify performance patterns and evidence gaps across real skin contexts.</p>
              </div>
              <div className="group/research relative overflow-hidden rounded-xl border border-hairline bg-[#4e5e47] p-6 text-white transition-all duration-300 ease-out hover:-translate-y-0.5">
                <img src={scienceImage} alt="Clinical skincare research" className="absolute inset-0 h-full w-full object-cover opacity-20 transition-transform duration-700 ease-out group-hover/research:scale-105" />
                <div className="absolute inset-0 bg-[#4e5e47]/78" />
                <div className="relative z-10 transition-transform duration-500 ease-out group-hover/research:-translate-y-1">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-caption uppercase tracking-[0.22em] text-white/60">Research</span>
                    <span className="text-caption text-white/45">02</span>
                  </div>
                  <h3 className="text-display-sm leading-tight text-white"><span className="whitespace-nowrap">Skincare science</span>, simplified.</h3>
                  <p className="mt-3 text-body-sm leading-relaxed text-white/70">Clear explanations for ingredients, conditions, claims, and clinical evidence.</p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Brand card — light with terracotta left border */}
          <Reveal
            delay={240}
            className="group/card relative flex h-full min-h-[520px] flex-col overflow-hidden rounded-2xl border border-hairline bg-canvas/55 p-6 transition-all duration-500 ease-out hover:-translate-y-1 hover:bg-canvas/75 hover:shadow-xl md:p-7 lg:col-span-6"
          >
            <div className="absolute left-0 top-6 bottom-6 w-[3px] rounded-full bg-primary/60" />
            <div className="pl-4">
              <div className="mb-5 flex items-start justify-between gap-6">
                <div>
                  <span className="mb-3 inline-block text-caption uppercase tracking-[0.22em] text-primary">For Brands</span>
                  <h3 className="text-display-md leading-tight text-ink">{forBrands.heading}</h3>
                </div>
                <span className="hidden shrink-0 text-caption uppercase tracking-widest text-muted md:block">01</span>
              </div>
              <p className="text-body-md leading-relaxed text-muted">{forBrands.body}</p>
              <FeatureList items={forBrands.benefits} dark={false} />
              <a href="#" className="mt-7 inline-flex items-center gap-2 text-[15px] font-semibold text-primary transition-colors duration-300 hover:text-ink group/link">
                {forBrands.cta}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1.5" />
              </a>
            </div>
          </Reveal>

          {/* Knowledge Hub card — dark sage */}
          <Reveal
            delay={320}
            className="group/card relative flex h-full min-h-[520px] flex-col overflow-hidden rounded-2xl border border-[#4e5e47] bg-[#4e5e47] p-6 transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-xl md:p-7 lg:col-span-6"
          >
            <img src={scienceImage} alt="" className="absolute inset-0 h-full w-full object-cover opacity-10 transition-transform duration-700 group-hover/card:scale-105" />
            <div className="absolute inset-0 bg-[#4e5e47]/90" />
            <div className="relative z-10 flex flex-col h-full">
              <div className="mb-5 flex items-start justify-between gap-6">
                <div>
                  <span className="mb-3 inline-block text-caption uppercase tracking-[0.22em] text-white/50">Knowledge Hub</span>
                  <h3 className="text-display-md leading-tight text-white">{knowledgeHub.heading}</h3>
                </div>
                <span className="hidden shrink-0 text-caption uppercase tracking-widest text-white/30 md:block">02</span>
              </div>
              <p className="text-body-md leading-relaxed text-white/65">{knowledgeHub.body}</p>
              <FeatureList items={knowledgeHub.explore} dark={true} />
              <a href="#" className="mt-7 inline-flex items-center gap-2 text-[15px] font-semibold text-white transition-colors duration-300 hover:text-white/70 group/link">
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
