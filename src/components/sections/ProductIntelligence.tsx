"use client";

import { useState } from "react";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { ImageSlot } from "../ui/ImageSlot";
import { Reveal } from "../ui/Reveal";
import { cn } from "../../lib/cn";
import { productIntelligence as p } from "../../data/content";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */

const filters = [
  { id: "all",         label: "All"          },
  { id: "moisturise",  label: "Moisturisers" },
  { id: "serum",       label: "Serums"       },
  { id: "spf",         label: "SPF"          },
  { id: "cleanser",    label: "Cleansers"    },
  { id: "eye",         label: "Eye Care"     },
  { id: "treatment",   label: "Treatments"   },
];

type Verdict = "Highly Compatible" | "Well Matched" | "Use Caution" | "Avoid";

interface Product {
  name: string;
  brand: string;
  category: string;
  filterId: string;
  concern: string;          // what skin concern it targets
  texture: string;          // lightweight / rich / gel etc.
  match: number;
  note: string;
  recommended: boolean;
  keyIngredients: string[]; // array so we can render each as its own tag
  verdict: Verdict;
  bestFor: string;          // e.g. "Dry · Sensitive"
}

const products: Product[] = [
  {
    name: "Cicaplast Baume B5+",
    brand: "La Roche-Posay",
    category: "Barrier Repair",
    filterId: "moisturise",
    concern: "Redness & Irritation",
    texture: "Rich Balm",
    match: 94,
    note: "Restores the skin barrier with panthenol and madecassoside. Works well on reactive, post-procedure, and sensitised skin.",
    recommended: true,
    keyIngredients: ["Panthenol B5", "Madecassoside", "Ceramides"],
    verdict: "Highly Compatible",
    bestFor: "Dry · Sensitive · Reactive",
  },
  {
    name: "Tranexamic Acid 1% Serum",
    brand: "Paula's Choice",
    category: "Pigmentation Control",
    filterId: "serum",
    concern: "Dark Spots & Uneven Tone",
    texture: "Lightweight Fluid",
    match: 88,
    note: "Clinically studied brightening agent. Gentler than hydroquinone and suitable for long-term use on darker skin tones.",
    recommended: true,
    keyIngredients: ["Tranexamic Acid", "Niacinamide", "Resorcinol"],
    verdict: "Well Matched",
    bestFor: "All Types · Post-Inflammatory",
  },
  {
    name: "Isntree Hyaluronic Acid Toner",
    brand: "Isntree",
    category: "Deep Hydration",
    filterId: "moisturise",
    concern: "Dehydration & Tightness",
    texture: "Water Toner",
    match: 91,
    note: "Five molecular weights of hyaluronic acid draw and lock moisture at every skin layer. Fragrance-free and minimal formula.",
    recommended: true,
    keyIngredients: ["5× HA", "Beta-Glucan", "Allantoin"],
    verdict: "Highly Compatible",
    bestFor: "Dehydrated · Combo · Oily",
  },
  {
    name: "Heliocare 360° Fluid SPF 50",
    brand: "Heliocare",
    category: "Broad-Spectrum Protection",
    filterId: "spf",
    concern: "UV & Blue-Light Damage",
    texture: "Ultra-Light Fluid",
    match: 89,
    note: "Fernblock antioxidant complex alongside mineral and chemical filters. No white cast — suited to daily urban wear.",
    recommended: true,
    keyIngredients: ["Fernblock®", "Zinc Oxide", "Tinosorb S"],
    verdict: "Well Matched",
    bestFor: "All Types · Daily Use",
  },
  {
    name: "Naturium Vitamin C Complex Serum",
    brand: "Naturium",
    category: "Antioxidant Brightening",
    filterId: "serum",
    concern: "Dullness & Fine Lines",
    texture: "Serum",
    match: 76,
    note: "Contains multiple vitamin C derivatives for stability. Patch-test recommended if your skin is currently sensitised.",
    recommended: true,
    keyIngredients: ["Ascorbic Acid 5%", "THD Ascorbate", "Ferulic Acid"],
    verdict: "Well Matched",
    bestFor: "Normal · Resilient",
  },
  {
    name: "St. Ives Apricot Scrub",
    brand: "St. Ives",
    category: "Physical Exfoliant",
    filterId: "cleanser",
    concern: "Texture",
    texture: "Paste Scrub",
    match: 28,
    note: "Walnut shell particles are jagged under a microscope and create micro-tears on sensitised skin. Not recommended for your profile.",
    recommended: false,
    keyIngredients: ["Walnut Shell", "Fragrance", "SD Alcohol"],
    verdict: "Avoid",
    bestFor: "—",
  },
  {
    name: "Murad Retinol Youth Renewal Eye Serum",
    brand: "Murad",
    category: "Anti-Ageing",
    filterId: "eye",
    concern: "Fine Lines & Dark Circles",
    texture: "Eye Serum",
    match: 83,
    note: "Encapsulated retinol releases slowly to minimise sensitivity around the orbital bone. Pair with morning SPF.",
    recommended: true,
    keyIngredients: ["Encapsulated Retinol", "Tri-Active Retinol™", "Peptides"],
    verdict: "Well Matched",
    bestFor: "Mature · Dry · Normal",
  },
  {
    name: "Differin Adapalene 0.1% Gel",
    brand: "Differin",
    category: "Retinoid Treatment",
    filterId: "treatment",
    concern: "Acne & Pore Clarity",
    texture: "Clear Gel",
    match: 71,
    note: "Prescription-strength retinoid available OTC. Start twice weekly and increase slowly. Avoid with active barrier damage.",
    recommended: true,
    keyIngredients: ["Adapalene 0.1%"],
    verdict: "Use Caution",
    bestFor: "Acne-Prone · Oily",
  },
];

/* ─────────────────────────────────────────────
   VERDICT CONFIG
───────────────────────────────────────────── */

const verdictConfig: Record<Verdict, { dot: string; text: string; bg: string }> = {
  "Highly Compatible": { dot: "bg-emerald-500",  text: "text-emerald-700", bg: "bg-emerald-50"  },
  "Well Matched":      { dot: "bg-sky-500",       text: "text-sky-700",    bg: "bg-sky-50"      },
  "Use Caution":       { dot: "bg-amber-500",     text: "text-amber-700",  bg: "bg-amber-50"    },
  "Avoid":             { dot: "bg-rose-500",       text: "text-rose-700",   bg: "bg-rose-50"     },
};

/* ─────────────────────────────────────────────
   MATCH BAR — replaces the fake circle dial
───────────────────────────────────────────── */

function MatchBar({ value, recommended }: { value: number; recommended: boolean }) {
  const color =
    value >= 85
      ? "bg-emerald-500"
      : value >= 70
      ? "bg-sky-500"
      : value >= 50
      ? "bg-amber-400"
      : "bg-rose-400";

  return (
    <div className="flex flex-col gap-1 shrink-0 w-14 sm:w-16">
      <span
        className={cn(
          "font-serif text-2xl leading-none text-center",
          recommended ? "text-ink" : "text-muted"
        )}
      >
        {value}
        <span className="text-sm">%</span>
      </span>
      <div className="h-1 w-full rounded-full bg-hairline overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all duration-700", color)}
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="text-[9px] uppercase tracking-widest text-muted text-center">
        Match
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PRODUCT CARD
───────────────────────────────────────────── */

function ProductCard({ product, index }: { product: Product; index: number }) {
  const vc = verdictConfig[product.verdict];

  return (
    <Reveal delay={index * 80}>
      {/* 
        Signature hover: a left-border "activates" on hover — 
        shifts from hairline to a coloured 3px line in the
        same hue as the verdict, giving a clinical-file feel.
      */}
      <div
        className={cn(
          "group relative flex flex-col sm:flex-row gap-5 rounded-lg border p-5",
          "transition-all duration-300 cursor-default",
          "hover:shadow-[0_4px_24px_rgba(0,0,0,0.07)]",
          "border-l-[3px]",
          product.verdict === "Highly Compatible" && "border-l-emerald-400 hover:border-l-emerald-500",
          product.verdict === "Well Matched"      && "border-l-sky-400    hover:border-l-sky-500",
          product.verdict === "Use Caution"       && "border-l-amber-400  hover:border-l-amber-500",
          product.verdict === "Avoid"             && "border-l-rose-400   hover:border-l-rose-500",
          product.recommended ? "border-hairline bg-surface-soft" : "border-hairline/50 bg-canvas"
        )}
      >
        {/* Left: match bar */}
        <div className="flex sm:flex-col items-center sm:items-center justify-between sm:justify-start gap-3 sm:gap-0">
          <MatchBar value={product.match} recommended={product.recommended} />
        </div>

        {/* Divider (desktop) */}
        <div className="hidden sm:block w-px bg-hairline self-stretch shrink-0" />

        {/* Right: content */}
        <div className="flex-1 min-w-0 flex flex-col gap-2">

          {/* Top row: brand + verdict badge */}
          <div className="flex items-start justify-between gap-2 flex-wrap">
            <div>
              <p className="text-[9px] uppercase tracking-[0.15em] text-muted mb-0.5">
                {product.brand}
              </p>
              <h4 className="text-title-md text-ink leading-snug group-hover:text-primary transition-colors duration-200">
                {product.name}
              </h4>
            </div>

            <span
              className={cn(
                "shrink-0 flex items-center gap-1.5 rounded-full px-3 py-1 text-[9px] uppercase tracking-[0.12em]",
                vc.bg, vc.text
              )}
            >
              <span className={cn("h-1.5 w-1.5 rounded-full", vc.dot)} />
              {product.verdict}
            </span>
          </div>

          {/* Meta row */}
          <div className="flex flex-wrap gap-x-4 gap-y-0.5">
            <span className="text-[10px] uppercase tracking-widest text-muted">
              {product.category}
            </span>
            <span className="text-[10px] text-muted">·</span>
            <span className="text-[10px] uppercase tracking-widest text-muted">
              {product.texture}
            </span>
            <span className="text-[10px] text-muted">·</span>
            <span className="text-[10px] uppercase tracking-widest text-muted">
              {product.concern}
            </span>
          </div>

          {/* Note */}
          <p className="text-body-sm text-muted leading-relaxed">{product.note}</p>

          {/* Bottom row: ingredients + best-for */}
          <div className="flex flex-wrap items-center gap-2 mt-1">
            <span className="text-[9px] uppercase tracking-[0.15em] text-muted">
              Actives:
            </span>
            {product.keyIngredients.map((ing) => (
              <span
                key={ing}
                className="border border-hairline rounded-full px-2.5 py-0.5 text-[10px] text-ink tracking-wide"
              >
                {ing}
              </span>
            ))}
            {product.bestFor !== "—" && (
              <>
                <span className="text-[10px] text-muted ml-1">·</span>
                <span className="text-[9px] uppercase tracking-[0.12em] text-muted">
                  Best for {product.bestFor}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* ─────────────────────────────────────────────
   MAIN SECTION
───────────────────────────────────────────── */

export function ProductIntelligence() {
  const [activeFilter, setActiveFilter] = useState("all");

  const visible =
    activeFilter === "all"
      ? products
      : products.filter((p) => p.filterId === activeFilter);

  return (
    <section className="bg-canvas py-section overflow-hidden">
      <Container>

        {/* ── Header ── */}
        <Reveal>
          <div className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-eyebrow uppercase tracking-[0.18em] text-primary mb-3 text-[10px]">
                Product Intelligence
              </p>
              <h2 className="text-display-xl max-w-lg leading-tight">
                {p.heading}
              </h2>
            </div>
            <p className="max-w-xs text-body-md text-muted md:text-right">
              {p.body}
            </p>
          </div>
        </Reveal>

        {/* ── Main Grid ── */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16 items-start">

          {/* ────── LEFT COLUMN ────── */}
          <div className="lg:col-span-4 flex flex-col gap-6">

            {/* Image */}
            <Reveal>
              <ImageSlot
                src={p.image}
                alt="Skincare ritual"
                ratio="portrait"
                rounded="rounded-xl"
                className="border border-hairline shadow-lift"
                imgClassName="object-[50%_30%]"
              />
            </Reveal>

            {/* How your profile is built */}
            <Reveal>
              <div className="rounded-lg border border-hairline bg-surface-soft p-5 space-y-4">
                <p className="text-[9px] uppercase tracking-[0.18em] text-muted">
                  Your skin profile considers
                </p>
                <ul className="space-y-2.5">
                  {[
                    { icon: "◎", label: "Skin Type",         detail: "Dry, Oily, Combo, Sensitive" },
                    { icon: "◈", label: "Active Concerns",    detail: "Acne, Pigmentation, Ageing…" },
                    { icon: "◇", label: "Known Sensitivities",detail: "Fragrances, AHAs, Retinoids…" },
                    { icon: "◉", label: "Climate & Season",   detail: "Humidity, UV index, temperature" },
                    { icon: "◐", label: "Current Routine",    detail: "Products already in use" },
                    { icon: "◑", label: "Skin Photo Analysis",detail: "AI-read texture & tone map" },
                  ].map((item) => (
                    <li key={item.label} className="flex items-start gap-3">
                      <span className="mt-0.5 text-primary text-sm shrink-0">{item.icon}</span>
                      <div>
                        <p className="text-[11px] text-ink font-medium">{item.label}</p>
                        <p className="text-[10px] text-muted">{item.detail}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Compatibility legend */}
            <Reveal>
              <div className="rounded-lg border border-hairline bg-canvas p-5 space-y-3">
                <p className="text-[9px] uppercase tracking-[0.18em] text-muted">
                  Compatibility key
                </p>
                {(Object.entries(verdictConfig) as [Verdict, typeof verdictConfig[Verdict]][]).map(
                  ([label, cfg]) => (
                    <div key={label} className="flex items-center gap-2.5">
                      <span className={cn("h-2 w-2 rounded-full shrink-0", cfg.dot)} />
                      <span className="text-[11px] text-ink">{label}</span>
                    </div>
                  )
                )}
                <p className="text-[9px] text-muted pt-1 leading-relaxed border-t border-hairline mt-3">
                  Scores reflect ingredient safety, skin-type fit, and formulation quality — not brand sponsorship.
                </p>
              </div>
            </Reveal>
          </div>

          {/* ────── RIGHT COLUMN ────── */}
          <div className="lg:col-span-8 flex flex-col gap-6">

            {/* Filter bar */}
            <Reveal>
              {/*
                Hover animation pattern: each pill gets an underline
                scale-x that grows from left on hover — the same
                pattern used in other sections of this codebase via
                the group/after-content trick, adapted here inline.
              */}
              <div
                role="tablist"
                aria-label="Filter products by category"
                className="flex gap-1.5 flex-wrap"
              >
                {filters.map((f) => (
                  <button
                    key={f.id}
                    role="tab"
                    aria-selected={activeFilter === f.id}
                    onClick={() => setActiveFilter(f.id)}
                    className={cn(
                      "relative rounded-full border px-4 py-1.5 text-[10px] uppercase tracking-[0.14em]",
                      "transition-all duration-200 outline-none",
                      "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1",
                      /* hover: gentle lift + border darkens */
                      "hover:shadow-sm",
                      activeFilter === f.id
                        ? "border-ink bg-ink text-canvas"
                        : "border-hairline bg-canvas text-muted hover:border-ink/40 hover:text-ink"
                    )}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </Reveal>

            {/* Product count line */}
            <Reveal>
              <p className="text-[10px] uppercase tracking-[0.14em] text-muted -mt-2">
                Showing {visible.length} product{visible.length !== 1 ? "s" : ""}
                {activeFilter !== "all" &&
                  ` · ${filters.find((f) => f.id === activeFilter)?.label}`}
              </p>
            </Reveal>

            {/* Cards */}
            <div className="space-y-3">
              {visible.length > 0 ? (
                visible.map((product, i) => (
                  <ProductCard key={product.name} product={product} index={i} />
                ))
              ) : (
                <Reveal>
                  <div className="rounded-lg border border-hairline bg-surface-soft p-10 text-center">
                    <p className="text-body-sm text-muted">
                      No products in this category yet.
                    </p>
                  </div>
                </Reveal>
              )}
            </div>

            {/* CTA row */}
            <Reveal className="mt-2 flex flex-col sm:flex-row gap-3">
              <Button variant="primary">{p.cta}</Button>
              <Button variant="link">View Full Ingredient Report →</Button>
            </Reveal>

            {/* Trust footer line */}
            <Reveal>
              <p className="text-[9px] uppercase tracking-[0.16em] text-muted border-t border-hairline pt-4">
                Recommendations are built from your skin profile — never from paid placements or brand partnerships.
              </p>
            </Reveal>
          </div>

        </div>
      </Container>
    </section>
  );
}
