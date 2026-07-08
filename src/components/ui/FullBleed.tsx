import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

/**
 * Photography band with an optional dark scrim + overlaid editorial copy.
 * - default: edge-to-edge full-bleed.
 * - `contained`: sits inside the 1200px content column (with side margins), so
 *   it reads as a smaller, framed figure. Combine with `rounded` for soft corners.
 */
export function FullBleed({
  src,
  alt,
  height = "h-[460px]",
  overlay = "left",
  position = "object-center",
  contained = false,
  rounded = "",
  className,
  children,
}: {
  src: string;
  alt: string;
  height?: string;
  overlay?: "left" | "center" | "none";
  position?: string;
  contained?: boolean;
  rounded?: string;
  className?: string;
  children?: ReactNode;
}) {
  const media = (
    <div className={cn("relative overflow-hidden", height, rounded)}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={cn("absolute inset-0 h-full w-full object-cover brightness-[0.85]", position)}
      />
      {overlay !== "none" && (
        <div
          className={cn(
            "absolute inset-0",
            overlay === "center"
              ? "bg-ink/50"
              : "bg-gradient-to-r from-ink/70 via-ink/35 to-transparent",
          )}
        />
      )}
      {children && (
        <div
          className={cn(
            "relative z-10 flex h-full items-center",
            contained ? "justify-center px-8" : "mx-auto max-w-content px-16",
          )}
        >
          <div className={cn(
            "max-w-xl [text-shadow:0_2px_12px_rgba(0,0,0,0.6)]",
            overlay === "center" && "text-center"
          )}>{children}</div>
        </div>
      )}
    </div>
  );

  if (contained) {
    return (
      <section className={cn("bg-canvas py-14", className)}>
        <div className="mx-auto max-w-content px-16">{media}</div>
      </section>
    );
  }
  return <section className={cn("relative w-full", className)}>{media}</section>;
}