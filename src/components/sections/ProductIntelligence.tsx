import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { ImageSlot } from "../ui/ImageSlot";
import { Reveal } from "../ui/Reveal";
import { CountUp } from "../ui/CountUp";
import { cn } from "../../lib/cn";
import { productIntelligence as p } from "../../data/content";

export function ProductIntelligence() {
  return (
    <section className="bg-canvas py-section">
      <Container className="grid grid-cols-12 items-center gap-16">
        {/* Lifestyle image */}
        <Reveal className="col-span-5">
          <ImageSlot
            src={p.image}
            alt="Skincare ritual"
            ratio="portrait"
            rounded="rounded-xl"
            className="border border-hairline shadow-lift"
            imgClassName="object-[50%_30%]"
          />
        </Reveal>

        {/* Intro + match cards */}
        <div className="col-span-7">
          <Reveal>
            <div className="mb-4 text-eyebrow uppercase text-primary">Product Intelligence</div>
            <h2 className="text-display-xl">{p.heading}</h2>
            <p className="mt-5 max-w-xl text-body-md text-muted">{p.body}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {p.shareFactors.map((f) => (
                <li key={f} className="rounded-pill bg-surface-card px-3 py-1 text-caption text-ink">
                  {f}
                </li>
              ))}
            </ul>
          </Reveal>

          <div className="mt-8 space-y-4">
            {p.products.map((product, i) => (
              <Reveal
                key={product.name}
                delay={i * 100}
                className={cn(
                  "hover-lift flex items-center gap-6 rounded-lg border p-6",
                  product.recommended
                    ? "border-hairline bg-surface-soft"
                    : "border-hairline/60 bg-canvas opacity-80",
                )}
              >
                {/* match dial */}
                <div
                  className={cn(
                    "flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-pill text-on-primary",
                    product.recommended ? "bg-primary" : "bg-muted",
                  )}
                >
                  <CountUp value={product.match} suffix="%" className="font-serif text-title-lg leading-none" />
                  <span className="text-[8px] uppercase tracking-wider">Match</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-title-md text-ink">{product.name}</h4>
                  <p className="text-caption-uppercase uppercase text-muted">{product.category}</p>
                  <p className="mt-1 text-body-sm text-muted">{product.note}</p>
                </div>
                {!product.recommended && (
                  <span className="text-caption-uppercase uppercase text-error">Avoid</span>
                )}
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-8">
            <Button variant="link">{p.cta}</Button>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
