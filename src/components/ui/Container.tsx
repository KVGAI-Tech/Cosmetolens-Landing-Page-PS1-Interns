import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

/** Centered 1200px content column with desktop side margins. */
export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("mx-auto max-w-content px-16", className)}>{children}</div>;
}
