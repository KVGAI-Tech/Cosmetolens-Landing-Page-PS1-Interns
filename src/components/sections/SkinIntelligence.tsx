import { CheckCircle2 } from "lucide-react";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { ImageSlot } from "../ui/ImageSlot";
import { Reveal } from "../ui/Reveal";
import { skinIntelligence as s } from "../../data/content";

export function SkinIntelligence() {
  return (
    <section className="bg-canvas py-section">
      <Container className="grid grid-cols-2 items-center gap-20">
        {/* Left: portrait with scan overlay */}
        <Reveal>
          <ImageSlot
            src={s.image}
            alt="AI skin analysis portrait"
            ratio="portrait"
            className="border border-hairline"
            imgClassName="scale-[1.35] object-[50%_60%]"
          >
            <div className="absolute left-6 top-10 rounded-md border border-primary/20 bg-canvas/90 p-4 backdrop-blur">
              <div className="text-caption-uppercase uppercase text-primary">{s.overlayLabel}</div>
              <div className="relative mt-2 h-1 w-32 overflow-hidden rounded-pill bg-surface-card">
                <div className="absolute h-full w-1/2 bg-primary animate-scan" />
              </div>
            </div>
          </ImageSlot>
        </Reveal>

        {/* Right: markers */}
        <Reveal delay={120} className="space-y-8">
          <div>
            <div className="mb-4 text-eyebrow uppercase text-primary">AI Skin Analysis</div>
            <h2 className="text-display-xl">{s.heading}</h2>
          </div>
          <p className="text-body-lg text-muted">{s.body}</p>
          <ul className="flex flex-wrap gap-3">
            {s.markers.map((m) => (
              <li
                key={m}
                className="inline-flex items-center gap-2 rounded-pill border border-hairline bg-surface-soft px-4 py-2 text-body-sm text-body transition-colors duration-200 hover:border-primary"
              >
                <CheckCircle2 className="h-4 w-4 shrink-0 text-accent-strong" strokeWidth={2.5} />
                {m}
              </li>
            ))}
          </ul>
          <Button variant="primary" size="lg" uppercase>
            {s.cta}
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
