import { useState, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
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
import type { ComponentType, CSSProperties } from "react";
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

/** Tooltip width in px — must match the w-72 class (18rem = 288px). */
const TOOLTIP_W = 288;
const GAP = 16; // gap between text content edge and tooltip

/**
 * Single marker row.
 *
 * The tooltip is rendered into document.body via createPortal with
 * position:fixed, so it:
 *   - Never pushes surrounding content or adds a scrollbar
 *   - Floats above all other elements (z-index 9999)
 *   - Anchors to the right edge of the TEXT (not the full row width)
 *     so it always appears to the right of the label on any screen size
 */
function MarkerItem({ marker }: { marker: string }) {
  const [open, setOpen] = useState(false);
  const [style, setStyle] = useState<CSSProperties>({});
  const rowRef = useRef<HTMLLIElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const meta = MARKER_META[marker];
  const Icon = meta.icon;

  const calcPosition = useCallback(() => {
    if (!meta) return null;
    if (!rowRef.current || !textRef.current) return;
    const row = rowRef.current.getBoundingClientRect();
    const txt = textRef.current.getBoundingClientRect();
    const vw = window.innerWidth;

    // Anchor to the RIGHT edge of the label text, not the row's right edge.
    // The <li> spans the full column width, but the text content is much
    // narrower — so there's always empty space to its right to float into.
    const rawLeft = txt.right + GAP;

    // Clamp so the tooltip never overflows the viewport (position:fixed means
    // no scrollbar is ever added regardless).
    const left = Math.min(rawLeft, vw - TOOLTIP_W - 8);

    // If even the clamped position overlaps the text, fall back to below.
    if (left + TOOLTIP_W < txt.left || vw < 480) {
      // Very small screen — show below the row
      setStyle({
        position: "fixed",
        left: Math.max(8, Math.min(row.left, vw - TOOLTIP_W - 8)),
        top: row.bottom + GAP,
        width: Math.min(TOOLTIP_W, vw - 16),
      });
    } else {
      // Right of the text content, vertically centred on the row
      setStyle({
        position: "fixed",
        left,
        top: row.top + row.height / 2,
        transform: "translateY(-50%)",
        width: Math.min(TOOLTIP_W, vw - left - 8),
      });
    }
  }, []);

  const handleOpen = () => {
    calcPosition();
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <>
      {/* ── Row ── */}
      <li
        ref={rowRef}
        className="group relative flex items-center gap-4 py-3.5 cursor-default"
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}
        onFocus={handleOpen}
        onBlur={handleClose}
      >
        {/* Icon bubble */}
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-tint transition-colors duration-200 group-hover:bg-primary/20">
          <Icon className="h-4 w-4 text-primary" strokeWidth={1.75} />
        </div>

        {/* Label + short description — textRef marks where the content ends
            so the tooltip can anchor to the right of this, not the row edge */}
        <div
          ref={textRef}
          className="transition-transform duration-200 group-hover:translate-x-0.5"
        >
          <div className="text-title-md text-ink">{marker}</div>
          <p className="mt-0.5 text-body-sm leading-5 text-muted">
            {meta.description}
          </p>
        </div>
      </li>

      {/*
        ── Portal tooltip ──
        Rendered directly into <body> with position:fixed so it is completely
        decoupled from the document layout. No overflow, no scrollbar, ever.
      */}
      {typeof document !== "undefined" &&
        createPortal(
          <div
            role="tooltip"
            aria-hidden={!open}
            style={style}
            className={[
              "z-[9999] rounded-xl border border-hairline/60 bg-canvas/95",
              "px-4 py-3.5 shadow-lift backdrop-blur-md",
              "transition-all duration-200 ease-out",
              open
                ? "pointer-events-auto translate-x-0 opacity-100"
                : "pointer-events-none -translate-x-2 opacity-0",
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
          </div>,
          document.body,
        )}
    </>
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

        {/* Right: text + feature list */}
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

          {/* Feature list — tooltips are portalled, so overflow is irrelevant */}
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
