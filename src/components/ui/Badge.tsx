import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

type Variant = "pill" | "accent" | "outline" | "onDark";

const variantClass: Record<Variant, string> = {
  pill: "bg-surface-card text-ink text-caption",
  accent: "bg-accent text-ink text-caption-uppercase uppercase",
  outline: "border border-hairline text-muted text-caption-uppercase uppercase",
  onDark: "bg-surface-dark-elevated text-on-dark text-caption-uppercase uppercase",
};

export function Badge({
  children,
  variant = "pill",
  className,
}: {
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill px-3 py-1 font-sans",
        variantClass[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
