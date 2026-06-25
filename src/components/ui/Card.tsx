import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

type Tone = "white" | "soft" | "dark" | "outline";

const toneClass: Record<Tone, string> = {
  white: "bg-canvas border border-hairline text-body",
  soft: "bg-surface-soft text-body",
  dark: "bg-surface-dark-soft text-on-dark",
  outline: "bg-transparent border border-hairline text-body",
};

/** Content/product card. Radius lg (12px), 32px padding by default (DESIGN.md). */
export function Card({
  children,
  tone = "white",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <div className={cn("rounded-lg p-8", toneClass[tone], className)}>{children}</div>
  );
}
