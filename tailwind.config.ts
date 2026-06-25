import type { Config } from "tailwindcss";

/**
 * Cosmetolens design tokens — warm editorial.
 * Structural DNA from .claude/DESIGN.md.
 * Palette: cream canvas #faf8f3 · terracotta accent #c0623f · dark-sage #4e5e47 ·
 * sage #b6c1a6 + alabaster #d1d3c6 supporting neutrals.
 * See frontend/DESIGN-TOKENS.md for the full mapping + deviation rationale.
 * Rule: reference these named tokens in markup — never inline hex/px.
 */
const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Surfaces — warm cream canvas + cream cards + dark-sage bands
        canvas: "#faf8f3", // warm off-white / light cream (page floor)
        "surface-soft": "#f4efe6", // soft cream band
        "surface-card": "#ece4d5", // warm cream card
        "surface-card-strong": "#e3d8c4", // emphasized cream
        alabaster: "#d1d3c6", // cool sage-gray neutral (used sparingly)
        "surface-dark": "#4e5e47", // dark-sage product/footer bands
        "surface-dark-soft": "#445239", // deeper inset on dark
        "surface-dark-elevated": "#5a6b52", // elevated card on dark

        // Brand accent — terracotta is the CTA/voltage colour
        primary: "#c0623f", // terracotta CTA
        "primary-active": "#a44e30", // pressed
        "primary-disabled": "#e6cdbf",
        "primary-tint": "#e6c8b6", // soft terracotta wash
        // Sage is the secondary/botanical accent
        accent: "#b6c1a6", // sage accent / badges
        "accent-strong": "#88997a", // stronger sage for dots/bars on cream

        // Text (warm neutrals)
        ink: "#221d16", // headlines (warm near-black)
        body: "#4a4034", // running text on cream
        muted: "#8a7f6f", // secondary
        "muted-soft": "#a89c89", // captions / fine print
        hairline: "#e7ddcc", // 1px borders on cream
        "hairline-soft": "#f0e9dc",
        "on-primary": "#ffffff",
        "on-dark": "#f7f3ea", // text on dark-sage
        "on-dark-soft": "#c2c6b4", // secondary on dark

        // Semantic
        success: "#6f8f5f",
        warning: "#c79a3e",
        error: "#b4453c",
      },
      fontFamily: {
        serif: ['"Playfair Display Variable"', '"Playfair Display"', "Georgia", "serif"],
        sans: [
          '"Manrope Variable"',
          "Manrope",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          "sans-serif",
        ],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      fontSize: {
        "display-2xl": ["76px", { lineHeight: "1.03", letterSpacing: "-1px", fontWeight: "500" }],
        "display-xl": ["60px", { lineHeight: "1.07", letterSpacing: "-0.5px", fontWeight: "500" }],
        "display-lg": ["48px", { lineHeight: "1.1", letterSpacing: "-0.5px", fontWeight: "500" }],
        "display-md": ["36px", { lineHeight: "1.15", letterSpacing: "-0.3px", fontWeight: "500" }],
        "display-sm": ["28px", { lineHeight: "1.2", letterSpacing: "0", fontWeight: "500" }],
        "title-lg": ["22px", { lineHeight: "1.3", fontWeight: "600" }],
        "title-md": ["18px", { lineHeight: "1.4", fontWeight: "600" }],
        "title-sm": ["16px", { lineHeight: "1.4", fontWeight: "600" }],
        "body-lg": ["18px", { lineHeight: "1.6", fontWeight: "400" }],
        "body-md": ["16px", { lineHeight: "1.55", fontWeight: "400" }],
        "body-sm": ["14px", { lineHeight: "1.55", fontWeight: "400" }],
        caption: ["13px", { lineHeight: "1.4", fontWeight: "500" }],
        "caption-uppercase": ["12px", { lineHeight: "1.4", letterSpacing: "1.5px", fontWeight: "600" }],
        // Enlarged section eyebrow label (e.g. "THE PROBLEM") — bigger than caption.
        eyebrow: ["15px", { lineHeight: "1.4", letterSpacing: "2px", fontWeight: "600" }],
        code: ["14px", { lineHeight: "1.6", fontWeight: "400" }],
        button: ["14px", { lineHeight: "1", fontWeight: "600" }],
        "nav-link": ["14px", { lineHeight: "1.4", fontWeight: "600" }],
      },
      borderRadius: {
        xs: "4px",
        sm: "6px",
        md: "8px", // buttons / inputs
        lg: "12px", // content / product cards
        xl: "16px", // hero container
        pill: "9999px",
      },
      spacing: {
        section: "96px", // between major bands
        gutter: "24px",
      },
      maxWidth: {
        content: "1200px",
      },
      boxShadow: {
        soft: "0 1px 3px rgba(34,29,22,0.08)",
        lift: "0 18px 44px rgba(34,29,22,0.12)",
        // Terracotta-tinted CTA depth (gives the primary button a premium "lift").
        btn: "0 6px 18px -5px rgba(192,98,63,0.5)",
        "btn-lg": "0 12px 26px -6px rgba(192,98,63,0.58)",
      },
      keyframes: {
        scan: {
          "0%": { left: "-100%" },
          "100%": { left: "100%" },
        },
        "reveal-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        scan: "scan 2.2s ease-in-out infinite",
        "reveal-up": "reveal-up 0.7s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
