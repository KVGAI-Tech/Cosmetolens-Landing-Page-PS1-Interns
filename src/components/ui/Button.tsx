import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

type Variant = "primary" | "secondary" | "onDark" | "inverted" | "outline" | "text" | "link";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-sans transition-all duration-150 select-none";

const variantClass: Record<Variant, string> = {
  primary:
    "rounded-md bg-gradient-to-b from-[#c86a47] to-[#b2582f] text-on-primary shadow-btn hover:brightness-[1.04] hover:shadow-btn-lg active:brightness-95",
  secondary:
    "rounded-md bg-canvas text-ink border border-hairline shadow-soft hover:border-primary hover:bg-surface-soft hover:shadow-lift active:shadow-soft",
  onDark: "rounded-md bg-surface-dark-elevated text-on-dark hover:opacity-90",
  inverted:
    "rounded-md bg-canvas text-primary shadow-soft hover:bg-surface-soft hover:shadow-lift active:shadow-soft",
  outline:
    "rounded-md border border-white/55 text-white hover:bg-white/10 active:bg-white/5",
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