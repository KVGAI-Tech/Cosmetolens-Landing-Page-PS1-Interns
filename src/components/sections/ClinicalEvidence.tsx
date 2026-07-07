import { useState } from "react";
import {
  BadgeCheck,
  FlaskConical,
  ShieldCheck,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { clinicalEvidence as c } from "../../data/content";

const evidenceItems = [
  {
    title: "Key Ingredients",
    description: "Ingredient analysis & formulation insights",
    details: [
      "Identifies active skincare ingredients",
      "Highlights formulation quality",
      "Provides ingredient-level insights",
    ],
    icon: FlaskConical,
  },
  {
    title: "Product Claims",
    description: "Verified product claims and benefit validation",
    details: [
      "Checks marketing claims",
      "Matches claims with available evidence",
      "Highlights unsupported claims",
    ],
    icon: BadgeCheck,
  },
  {
    title: "Clinical Evidence Status",
    description: "Peer-reviewed evidence and expert evaluation",
    details: [
      "Clinical trials reviewed",
      "Evidence quality summarized",
      "Confidence level assessed",
    ],
    icon: ShieldCheck,
  },
  {
    title: "Scientific References",
    description: "Published research and trusted scientific sources",
    details: [
      "Research papers referenced",
      "Trusted journals considered",
      "Evidence linked to ingredients",
    ],
    icon: BookOpen,
  },
];

export function ClinicalEvidence() {
  // FIX 1: removed showEvidence toggle — cards always visible
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  return (
    <section className="bg-canvas py-section">
      <Container className="grid grid-cols-1 lg:grid-cols-2 items-start gap-16">
        <Reveal className="space-y-6">
          <div className="text-title-md font-semibold uppercase tracking-[0.12em] text-primary">
            Clinical Evidence
          </div>

          {/* FIX 2: removed redundant font-serif — already global in CSS */}
          <h2 className="text-display-xl text-ink">{c.heading}</h2>

          <p className="text-body-lg text-muted">{c.body}</p>

          {/* Evidence Highlights label */}
          <div className="inline-flex rounded-pill bg-primary-tint px-4 py-2 text-body-sm font-semibold text-primary">
            Evidence Highlights
          </div>

          {/* FIX 3: cards always visible — no toggle button, no conditional render */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {evidenceItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} delay={index * 120}>
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedCard(expandedCard === index ? null : index)
                    }
                    className="group w-full rounded-lg border border-hairline bg-canvas p-5 text-left shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:shadow-lift"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-tint text-primary transition-all duration-200 group-hover:bg-primary group-hover:text-on-primary">
                      <Icon className="h-6 w-6" strokeWidth={1.8} />
                    </div>

                    <h3 className="mt-5 text-title-md text-ink">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-body-sm text-muted">
                      {item.description}
                    </p>

                    <div className="mt-5 flex justify-end">
                      <ArrowRight
                        className={`h-5 w-5 text-primary transition-all duration-300 ${
                          expandedCard === index ? "rotate-90" : ""
                        }`}
                      />
                    </div>

                    <div
                      className={`overflow-hidden transition-all duration-500 ${
                        expandedCard === index
                          ? "max-h-40 opacity-100 mt-4"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <ul className="space-y-2">
                        {item.details.map((detail) => (
                          <li
                            key={detail}
                            className="flex items-center gap-2 text-body-sm text-muted"
                          >
                            <BadgeCheck className="h-4 w-4 text-primary shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </button>
                </Reveal>
              );
            })}
          </div>

          {/* CTA — now just navigates, no toggle */}
          <Button variant="primary" size="lg" uppercase>
            {c.cta}
          </Button>

        </Reveal>

        <Reveal delay={150} className="h-full">
          <div className="rounded-xl border border-hairline bg-surface-soft p-10 shadow-soft transition-all duration-300 hover:shadow-lift">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-canvas shadow-md">
              <BadgeCheck className="h-12 w-12 text-primary" strokeWidth={1.5} />
            </div>

            <div className="mt-6 text-center">
              <div className="text-caption-uppercase uppercase tracking-wider text-accent-strong">
                VERIFIED
              </div>

              {/* FIX 4: 98% now in text-ink, not text-primary (terracotta) */}
              {/* FIX 5: removed redundant font-serif */}
              <h3 className="mt-3 text-display-xl text-ink">98%</h3>

              <p className="mt-2 text-title-md text-ink">
                Clinical Evidence Coverage
              </p>
            </div>

            {/* FIX 6: added border-hairline to all three rows for consistency */}
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3 rounded-lg border border-hairline bg-canvas px-4 py-3">
                <BadgeCheck className="h-5 w-5 text-primary" />
                <span className="text-body-md">Peer Reviewed</span>
              </div>

              <div className="flex items-center gap-3 rounded-lg border border-hairline bg-canvas px-4 py-3">
                <BadgeCheck className="h-5 w-5 text-primary" />
                <span className="text-body-md">Evidence Based</span>
              </div>

              <div className="flex items-center gap-3 rounded-lg border border-hairline bg-canvas px-4 py-3">
                <BadgeCheck className="h-5 w-5 text-primary" />
                <span className="text-body-md">Dermatologist Verified</span>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
