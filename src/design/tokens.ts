/**
 * TS mirror of the design tokens — the single source of truth for any JS/TS that
 * needs raw values (the rest of the app should prefer Tailwind utility classes).
 * Keep in sync with tailwind.config.ts and DESIGN-TOKENS.md.
 * Palette: warm cream canvas + terracotta accent + dark-sage surfaces (sage/alabaster support).
 */

export const colors = {
  canvas: "#faf8f3", // warm cream
  surfaceSoft: "#f4efe6",
  surfaceCard: "#ece4d5", // warm cream card
  surfaceCardStrong: "#e3d8c4",
  alabaster: "#d1d3c6",
  surfaceDark: "#4e5e47", // dark sage
  surfaceDarkSoft: "#445239",
  surfaceDarkElevated: "#5a6b52",

  primary: "#c0623f", // terracotta
  primaryActive: "#a44e30",
  primaryTint: "#e6c8b6",
  accent: "#b6c1a6", // sage
  accentStrong: "#88997a",

  ink: "#221d16",
  body: "#4a4034",
  muted: "#8a7f6f",
  mutedSoft: "#a89c89",
  hairline: "#e7ddcc",
  onPrimary: "#ffffff",
  onDark: "#f7f3ea",
  onDarkSoft: "#c2c6b4",

  success: "#6f8f5f",
  warning: "#c79a3e",
  error: "#b4453c",
} as const;

/** Surface modes for the alternating band rhythm (no two neighbours alike). */
export type Surface = "canvas" | "soft" | "card" | "dark" | "callout";

export const radius = {
  xs: 4,
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  pill: 9999,
} as const;

export const spacing = {
  section: 96,
  cardPadding: 32,
  contentMax: 1200,
} as const;
