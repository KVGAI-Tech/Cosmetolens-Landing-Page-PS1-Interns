import { useState } from "react";
import {
  Droplets,
  Zap,
  Sun,
  Fingerprint,
  Wind,
  Layers,
  Shield,
  ScanLine,
} from "lucide-react";
import type { LucideProps } from "lucide-react";
import type { ComponentType } from "react";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { ImageSlot } from "../ui/ImageSlot";
import { Reveal } from "../ui/Reveal";
import { skinIntelligence as s } from "../../data/content";

type MarkerMeta = {
  icon: ComponentType<LucideProps>;
  description: string;
  detail: string;
};

const MARKER_META: Record<string, MarkerMeta> = {
  "Skin Type": {
    icon: Fingerprint,
    description: "Oily, dry, combination or normal",
    detail:
      "Our AI maps your T-zone, cheeks, and chin to classify your skin type with precision, enabling product recommendations that match your exact moisture and sebum balance.",
  },
  Pigmentation: {
    icon: Sun,
    description: "Dark spots, melasma & uneven tone",
    detail:
      "Deep-learning analysis detects subtle discolouration patterns invisible to the naked eye, tracking melanin distribution to target hyperpigmentation at its root.",
  },
  "Acne Tendencies": {
    icon: Zap,
    description: "Breakout patterns & congestion",
    detail:
      "By recognising recurring breakout zones and pore congestion signatures, Cosmetolens predicts flare-ups before they surface and tailors preventive care.",
  },
  Dryness: {
    icon: Droplets,
    description: "Moisture barrier & hydration levels",
    detail:
      "Infrared-like surface analysis estimates transepidermal water loss, helping you rebuild a compromised moisture barrier with targeted actives and occlusives.",
  },
  Sensitivity: {
    icon: Wind,
    description: "Redness, reactivity & irritation",
    detail:
      "Capillary mapping and redness pattern recognition reveal sensitivity hotspots so you can avoid triggers and choose calming, barrier-safe formulations.",
  },
  "Skin Texture": {
    icon: Layers,
    description: "Smoothness, pores & fine lines",
    detail:
      "High-resolution texture profiling grades pore size, surface roughness, and fine-line depth — giving you a clear roadmap for resurfacing and anti-ageing.",
  },
  "Fitzpatrick Skin Classification": {
    icon: Shield,
    description: "UV response & treatment safety",
    detail:
      "Accurate Fitzpatrick scoring ensures every recommended treatment — from chemical peels to laser guidance — is calibrated for your melanin density and UV sensitivity.",
  },
};

/** A single marker row with an absolutely-positioned, layout-safe hover popover. */
function MarkerItem({ marker }: { marker: string }) {
  const [open, setOpen] = useState(false);
  const meta = MARKER_META[marker];
  if (!meta) return null;
  const Icon = meta.icon;

  return (
    <li
      className="group relative flex items-center gap-4 py-3.5"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      {/* Icon bubble */}
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-tint transition-colors duration-200 group-hover:bg-primary/20">
        <Icon className="h-4 w-4 text-primary" strokeWidth={1.75} />
      </div>

      {/* Label + short description */}
      <div className="transition-transform duration-200 group-hover:translate-x-0.5">
        <div className="text-title-md text-ink">{marker}</div>
        <p className="mt-0.5 text-body-sm leading-5 text-muted">
          {meta.description}
        </p>
      </div>

      {/*
        Popover — absolutely positioned so it NEVER shifts surrounding content.
        Hidden: opacity-0, translate-y-1, pointer-events-none
        Visible: opacity-100, translate-y-0, pointer-events-auto
      */}
      <div
        role="tooltip"
        aria-hidden={!open}
        className={[
          "absolute left-0 top-[calc(100%+4px)] z-50 w-72 max-w-[calc(100vw-2rem)]",
          "rounded-xl border border-hairline/60 bg-canvas/90 px-4 py-3.5 shadow-lift backdrop-blur-md",
          "transition-all duration-200 ease-out",
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-1 opacity-0",
        ].join(" ")}
      >
        <div className="mb-1.5 flex items-center gap-2">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-tint">
            <Icon className="h-3.5 w-3.5 text-primary" strokeWidth={1.75} />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            {marker}
          </span>
        </div>
        <p className="text-body-sm leading-6 text-muted">{meta.detail}</p>
      </div>
    </li>
  );
}

export function SkinIntelligence() {
  return (
    <section className="bg-canvas py-section">
      <Container className="grid grid-cols-1 items-start gap-12 md:grid-cols-2 md:gap-20">
        {/* Left: portrait with scan overlay */}
        <Reveal>
          <div className="relative">
            <ImageSlot
              src={s.image}
              alt="AI skin analysis portrait"
              ratio="portrait"
              rounded="rounded-xl"
              className="relative border border-hairline shadow-lift"
              imgClassName="scale-[1.35] object-[50%_60%]"
            >
              {/* Glassmorphism scan card — top-left */}
              <div className="absolute left-5 top-8 rounded-lg border border-hairline/50 bg-canvas/55 p-4 shadow-soft backdrop-blur-md">
                <div className="text-caption-uppercase uppercase text-primary tracking-wider">
                  {s.overlayLabel}
                </div>
                <div className="relative mt-2 h-1 w-32 overflow-hidden rounded-pill bg-surface-card/70">
                  <div className="absolute h-full w-1/2 bg-primary animate-scan" />
                </div>
              </div>

              {/* Glassmorphism stat card — bottom-right */}
              <div className="absolute bottom-6 right-5 rounded-lg border border-hairline/50 bg-canvas/55 px-4 py-3 shadow-soft backdrop-blur-md">
                <div className="flex items-center gap-2.5">
                  <ScanLine
                    className="h-4 w-4 shrink-0 text-primary"
                    strokeWidth={2}
                  />
                  <div>
                    <div className="font-serif text-title-md leading-none text-ink">
                      10,000+
                    </div>
                    <div className="mt-0.5 text-caption-uppercase uppercase text-muted tracking-wider">
                      Scans Done
                    </div>
                  </div>
                </div>
              </div>
            </ImageSlot>
          </div>
        </Reveal>

        {/* Right: text + feature cards */}
        <Reveal delay={120} className="space-y-8">
          <div>
            <div className="mb-3 text-eyebrow uppercase text-primary">
              AI Skin Analysis
            </div>

            <h2 className=" font-serif text-display-xl leading-tight text-black">
              {s.heading}
            </h2>
          </div>

          <p className="max-w-xl text-body-lg leading-8 text-muted">{s.body}</p>

          {/* Feature list — each item manages its own hover popover */}
          <ul className="mt-8 divide-y divide-hairline">
            {s.markers.map((marker) => (
              <MarkerItem key={marker} marker={marker} />
            ))}
          </ul>

          <Button variant="primary" size="lg" uppercase className="mt-2 px-10">
            {s.cta}
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
