# Cosmetolens Design Tokens — Warm Editorial

This project follows the **structural DNA** of the global design system
(`../.claude/DESIGN.md` — serif display headlines, alternating surface bands, radius
hierarchy, 96px section rhythm, generous padding) and uses a warm **cream + terracotta +
sage** palette. The global `DESIGN.md` (cream/coral/navy) is a shared skill asset and is
intentionally **left untouched**; this file is the source-of-truth record for the palette.

Tokens live in two synced places:
- `tailwind.config.ts` — the named utility classes used in markup (`bg-canvas`, `text-ink`…).
- `src/design/tokens.ts` — a TS mirror for any value needed in JS.

**Rule:** reference named tokens in markup — never inline raw hex/px.

## Palette

| Token | Hex | Role |
|---|---|---|
| `canvas` | `#faf8f3` | warm cream / off-white page floor |
| `surface-soft` | `#f4efe6` | soft cream alt band |
| `surface-card` | `#ece4d5` | warm cream card |
| `primary` (terracotta) | `#c0623f` | **accent + CTA colour + callout band** |
| `primary-active` | `#a44e30` | pressed state |
| `primary-tint` | `#e6c8b6` | soft terracotta wash (e.g. verified panel) |
| `surface-dark` (dark-sage) | `#4e5e47` | dark bands, footer, headings-on-dark |
| `accent` (sage) | `#b6c1a6` | secondary/botanical accent — badges, numerals, dots |
| `accent-strong` | `#88997a` | stronger sage for bars |
| `alabaster` | `#d1d3c6` | cool sage-gray neutral (used sparingly) |

### Supporting neutrals
`ink #221d16` · `body #4a4034` · `muted #8a7f6f` · `muted-soft #a89c89` ·
`hairline #e7ddcc` · `on-dark #f7f3ea` · `on-dark-soft #c2c6b4` ·
`surface-dark-soft #445239` · `surface-dark-elevated #5a6b52`.
Semantic: `success #6f8f5f`, `warning #c79a3e`, `error #b4453c`.

## Surface band rhythm
Alternate so no two neighbours share a surface (`Section` `surface` prop = canvas | soft | card |
dark | callout; plus `FullBleed` image bands):
`hero(cream) → problem(soft) → image-band → how(dark) → intelligence(cream) → ingredients(soft) →
products(cream) → vigilance(dark) → evidence(cream) → rewards(soft) → brands+hub(cream) →
final-cta(terracotta) → footer(dark)`.

## Typography
- **Display = Playfair Display** (variable serif), weight 500. High-contrast, premium editorial.
- **Body/UI/buttons = Manrope** (variable sans), 400 / 600.
- **Mono = JetBrains Mono** (rare data labels).
- Self-hosted via `@fontsource-variable` — no runtime CDN. Heading scale is intentionally large
  (`display-2xl` 76px hero · `display-xl` 60px section heads · `display-lg` 48px …) so titles read at 100%.
- **Motion:** `Reveal` (scroll fade-in), `CountUp` (numbers 0→value), `AnimatedBar` (bar grows on view),
  `.hover-lift` on cards — all one-shot on in-view and respect `prefers-reduced-motion`
  (`src/lib/useInView.ts`).

## Radius & spacing
Radius `md 8px` (buttons/inputs) · `lg 12px` (cards) · `xl 16px` (hero/marquee/portrait) ·
`pill` (badges). Section rhythm `96px` (`py-section`); card padding `32px` (`p-8`);
content column max `1200px` (`max-w-content`). A faint paper-grain utility (`.grain`) warms key bands.

## Deviations from DESIGN.md (with rationale)
1. **Sage retained alongside terracotta.** The PM asked to *add* terracotta + a cream background; sage
   was the earlier brand choice and stays as the secondary/botanical accent. Result: cream + terracotta
   + dark-sage trinity (a documented superset of DESIGN.md's cream/coral/navy). Don't "fix" the green
   out or the terracotta in.
2. **Green dark surfaces** (DESIGN.md forbids a green fourth tone) — intentional brand choice.
3. **Image/hover effects** (floating stat tag, match dials, scan overlay, scroll-reveal, hover scale,
   grain) — beyond DESIGN.md's "default + pressed only"; kept per explicit user request.
4. **Illustrative stats are placeholders** — numbers absent from the source doc (98.4%, 12,400 reviews,
   ingredient %, 2nd product card, 2,450 XP) are flagged `placeholder` in `src/data/content.ts`.
5. **Imagery = brand-neutral stock + clean provided assets** — competitor-branded product photos were
   removed; swap in real Cosmetolens photography via `public/images/` + `src/data/content.ts`.
