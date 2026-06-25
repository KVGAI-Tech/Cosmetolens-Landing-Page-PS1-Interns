import type { ReactNode } from "react";
import { cn } from "../../lib/cn";
import { Container } from "./Container";
import type { Surface } from "../../design/tokens";

/**
 * A major page band. `surface` drives the alternating cream/sage/dark rhythm —
 * never place two neighbouring sections with the same surface (DESIGN.md rule).
 */
const surfaceClass: Record<Surface, string> = {
  canvas: "bg-canvas text-body",
  soft: "bg-surface-soft text-body",
  card: "bg-surface-card text-body",
  dark: "bg-surface-dark text-on-dark",
  callout: "bg-primary text-on-primary", // terracotta full-bleed callout
};

export function Section({
  id,
  surface = "canvas",
  className,
  containerClassName,
  bare = false,
  children,
}: {
  id?: string;
  surface?: Surface;
  className?: string;
  containerClassName?: string;
  /** When true, skip the inner Container (caller manages width). */
  bare?: boolean;
  children: ReactNode;
}) {
  return (
    <section id={id} className={cn("py-section", surfaceClass[surface], className)}>
      {bare ? children : <Container className={containerClassName}>{children}</Container>}
    </section>
  );
}
