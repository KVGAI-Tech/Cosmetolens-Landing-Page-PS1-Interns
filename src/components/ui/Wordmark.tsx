import { Sprout } from "lucide-react";
import { cn } from "../../lib/cn";
import { brand } from "../../data/content";

/** Typeset Cosmetolens wordmark with a small botanical sprout mark. */
export function Wordmark({
  tone = "ink",
  className,
}: {
  tone?: "ink" | "onDark";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-serif text-display-sm leading-none",
        tone === "onDark" ? "text-on-dark" : "text-ink",
        className,
      )}
    >
      <Sprout className="h-5 w-5 text-accent-strong" strokeWidth={2} aria-hidden />
      <span>
        {brand.name}
        <span className="align-super text-[0.5em] text-muted-soft">{brand.trademark}</span>
      </span>
    </span>
  );
}
