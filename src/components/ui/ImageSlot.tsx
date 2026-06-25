import { useState, type ReactNode } from "react";
import { ImageIcon } from "lucide-react";
import { cn } from "../../lib/cn";

type Ratio = "square" | "portrait" | "video" | "auto";

const ratioClass: Record<Ratio, string> = {
  square: "aspect-square",
  portrait: "aspect-[4/5]",
  video: "aspect-video",
  auto: "",
};

/**
 * A swappable image slot. Drops a stand-in mock image into a fixed-ratio frame
 * while preserving the reference's spacing/effects (pass effect classes via
 * `imgClassName`, e.g. "grayscale group-hover:scale-105"). If `src` is missing
 * or fails to load, an on-brand placeholder renders in its place — so every
 * image is an obvious, marked swap-in point for real Cosmetolens assets.
 */
export function ImageSlot({
  src,
  alt,
  ratio = "square",
  fit = "cover",
  eager = false,
  className,
  imgClassName,
  rounded = "rounded-lg",
  children,
}: {
  src?: string;
  alt: string;
  ratio?: Ratio;
  /** How the image fills its frame. */
  fit?: "cover" | "contain";
  /** Load immediately (use for above-the-fold images). */
  eager?: boolean;
  className?: string;
  imgClassName?: string;
  rounded?: string;
  /** Overlay nodes (badges, scan UI) positioned over the image. */
  children?: ReactNode;
}) {
  const [failed, setFailed] = useState(false);
  const showImage = src && !failed;

  return (
    <div
      data-image-slot={alt}
      className={cn("relative overflow-hidden bg-surface-card", rounded, ratioClass[ratio], className)}
    >
      {showImage ? (
        <img
          src={src}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          onError={() => setFailed(true)}
          className={cn(
            "h-full w-full",
            fit === "contain" ? "object-contain" : "object-cover",
            imgClassName,
          )}
        />
      ) : (
        <Placeholder label={alt} />
      )}
      {children}
    </div>
  );
}

function Placeholder({ label }: { label: string }) {
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-soft"
      style={{
        background:
          "repeating-linear-gradient(135deg, #e7e9e1 0 14px, #dfe2d7 14px 28px)",
      }}
    >
      <ImageIcon className="h-7 w-7" strokeWidth={1.5} />
      <span className="px-4 text-center text-caption-uppercase uppercase">{label}</span>
    </div>
  );
}
