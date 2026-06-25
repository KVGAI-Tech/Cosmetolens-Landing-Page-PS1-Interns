import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

type Variant = "primary" | "secondary" | "onDark" | "inverted" | "outline" | "text" | "link";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-sans transition-all duration-150 select-none";

const variantClass: Record<Variant, string> = {
  // Terracotta CTA — subtle gradient + tinted shadow + hover lift for premium depth.
  primary:
    "rounded-md bg-gradient-to-b from-[#c86a47] to-[#b2582f] text-on-primary shadow-btn hover:-translate-y-0.5 hover:brightness-[1.04] hover:shadow-btn-lg active:translate-y-0 active:brightness-95",
  secondary:
    "rounded-md bg-canvas text-ink border border-hairline shadow-soft hover:-translate-y-0.5 hover:border-primary hover:bg-surface-soft active:translate-y-0",
  onDark: "rounded-md bg-surface-dark-elevated text-on-dark hover:opacity-90",
  inverted:
    "rounded-md bg-canvas text-primary shadow-soft hover:-translate-y-0.5 hover:bg-surface-soft hover:shadow-lift active:translate-y-0",
  // Light outline for use on dark / coloured (terracotta) bands.
  outline:
    "rounded-md border border-white/55 text-white hover:-translate-y-0.5 hover:bg-white/10 active:translate-y-0",
  text: "text-ink hover:opacity-70",
  link: "text-primary border-b border-primary pb-0.5 rounded-none hover:opacity-80",
};

const sizeClass: Record<Size, string> = {
  md: "h-10 px-5",
  lg: "h-12 px-8",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  uppercase = false,
  href,
  className,
  onClick,
}: {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  uppercase?: boolean;
  href?: string;
  className?: string;
  onClick?: () => void;
}) {
  const padless = variant === "text" || variant === "link";
  const classes = cn(
    base,
    // Inline link CTAs are enlarged; all other buttons keep the standard label size.
    variant === "link" ? "text-[16px]" : "text-button",
    variantClass[variant],
    !padless && sizeClass[size],
    uppercase && "uppercase tracking-[0.12em]",
    className,
  );

  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={classes} onClick={onClick}>
      {children}
    </button>
  );
}
