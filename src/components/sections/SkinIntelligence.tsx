import { Droplets, Zap, Sun, Fingerprint, Wind, Layers, Shield, ScanLine } from "lucide-react";
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
};

const MARKER_META: Record<string, MarkerMeta> = {
  "Skin Type":                    { icon: Fingerprint, description: "Oily, dry, combination or normal" },
  "Pigmentation":                 { icon: Sun,         description: "Dark spots, melasma & uneven tone" },
  "Acne Tendencies":              { icon: Zap,         description: "Breakout patterns & congestion" },
  "Dryness":                      { icon: Droplets,    description: "Moisture barrier & hydration levels" },
  "Sensitivity":                  { icon: Wind,        description: "Redness, reactivity & irritation" },
  "Skin Texture":                 { icon: Layers,      description: "Smoothness, pores & fine lines" },
  "Fitzpatrick Skin Classification": { icon: Shield,   description: "UV response & treatment safety" },
};

export function SkinIntelligence() {
  return (
    <section className="bg-canvas py-section">
      <Container className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-20">

        {/* Left: portrait with scan overlay */}
        <Reveal>
          <div className="relative">
            {/* Soft premium glow behind image */}
            <div className="pointer-events-none absolute -inset-6 rounded-2xl bg-primary/10 blur-3xl" />
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
                <div className="text-caption-uppercase uppercase text-primary tracking-wider">{s.overlayLabel}</div>
                <div className="relative mt-2 h-1 w-32 overflow-hidden rounded-pill bg-surface-card/70">
                  <div className="absolute h-full w-1/2 bg-primary animate-scan" />
                </div>
              </div>

              {/* Glassmorphism stat card — bottom-right */}
              <div className="absolute bottom-6 right-5 rounded-lg border border-hairline/50 bg-canvas/55 px-4 py-3 shadow-soft backdrop-blur-md">
                <div className="flex items-center gap-2.5">
                  <ScanLine className="h-4 w-4 shrink-0 text-primary" strokeWidth={2} />
                  <div>
                    <div className="font-serif text-title-md leading-none text-ink">10,000+</div>
                    <div className="mt-0.5 text-caption-uppercase uppercase text-muted tracking-wider">Scans Done</div>
                  </div>
                </div>
              </div>
            </ImageSlot>
          </div>
        </Reveal>

        {/* Right: text + feature cards */}
        <Reveal delay={120} className="space-y-8">
          <div>
            <div className="mb-3 text-eyebrow uppercase text-primary tracking-widest">AI Skin Analysis</div>
            <h2 className="bg-gradient-to-br from-ink via-body to-primary bg-clip-text font-serif text-display-xl text-transparent leading-tight">
              {s.heading}
            </h2>
          </div>

          <p className="text-body-lg text-muted">{s.body}</p>

          {/* Feature list */}
          <ul className="divide-y divide-hairline">
            {s.markers.map((marker) => {
              const meta = MARKER_META[marker];
              if (!meta) return null;
              const Icon = meta.icon;
              return (
                <li
                  key={marker}
                  className="group flex items-center gap-4 py-3.5 transition-all duration-200"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-tint transition-colors duration-200 group-hover:bg-primary/20">
                    <Icon className="h-4 w-4 text-primary" strokeWidth={1.75} />
                  </div>
                  <div className="transition-transform duration-200 group-hover:translate-x-0.5">
                    <div className="text-title-sm text-ink">{marker}</div>
                    <p className="text-body-sm text-muted">{meta.description}</p>
                  </div>
                </li>
              );
            })}
          </ul>

          <Button variant="primary" size="lg" uppercase className="px-10">
            {s.cta}
          </Button>
        </Reveal>

      </Container>
    </section>
  );
}
