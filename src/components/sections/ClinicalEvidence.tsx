import { BadgeCheck, FileText } from "lucide-react";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { clinicalEvidence as c } from "../../data/content";

export function ClinicalEvidence() {
  return (
    <section className="bg-canvas py-section">
      <Container className="grid grid-cols-2 items-center gap-16">
        <Reveal className="space-y-6">
          <div className="text-eyebrow uppercase text-primary">Clinical Evidence</div>
          <h2 className="text-display-xl">{c.heading}</h2>
          <p className="text-body-lg text-muted">{c.body}</p>
          <ul className="space-y-3">
            {c.view.map((v) => (
              <li key={v} className="flex items-center gap-3 text-body-md text-body">
                <FileText className="h-5 w-5 shrink-0 text-accent-strong" strokeWidth={1.75} />
                {v}
              </li>
            ))}
          </ul>
          <p className="font-serif text-display-sm text-ink">{c.kicker}</p>
          <Button variant="primary" size="lg" uppercase>
            {c.cta}
          </Button>
        </Reveal>

        {/* Badge visual */}
        <Reveal delay={120}>
          <div className="hover-lift rounded-xl border border-hairline bg-surface-soft p-12 text-center shadow-soft">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-pill bg-canvas shadow-soft">
              <BadgeCheck className="h-12 w-12 text-primary" strokeWidth={1.5} />
            </div>
            <div className="text-caption-uppercase uppercase text-accent-strong">Verified</div>
            <h4 className="mt-2 text-title-lg text-ink">{c.badge}</h4>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {c.view.map((v) => (
                <span
                  key={v}
                  className="rounded-pill bg-canvas px-3 py-1 text-caption text-muted"
                >
                  {v}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
