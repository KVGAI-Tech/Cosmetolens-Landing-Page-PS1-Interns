import { ShieldCheck, Activity } from "lucide-react";
import { Section } from "../ui/Section";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { cosmetovigilance as c } from "../../data/content";
export function Cosmetovigilance() {
  return (
    <Section surface="dark">
      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <Reveal>
          <div className="mb-5 flex items-center gap-3 text-eyebrow uppercase text-accent">
            <ShieldCheck className="h-5 w-5 shrink-0" strokeWidth={2} />
            <span>Cosmetolens</span>
          </div>
          <h2 className="font-serif text-display-lg leading-tight text-on-dark sm:text-display-xl">
            {c.heading}
          </h2>
          <p className="mt-6 max-w-xl text-body-lg leading-relaxed text-on-dark-soft">
            {c.body}
          </p>
          <div className="mt-8 border-l-2 border-accent bg-surface-dark-soft px-5 py-4">
            <p className="text-body-sm italic leading-relaxed text-on-dark-soft">
              “A comprehensive monitoring system for cosmetic safety.”
            </p>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="space-y-4">
            {c.reports.map((report) => (
              <div
                key={report}
                className="flex items-center justify-between gap-6 rounded-md border border-white/10 bg-surface-dark-elevated px-5 py-4 transition-colors hover:bg-surface-dark-soft sm:px-6 sm:py-5"
              >
                <span className="text-title-sm font-medium text-on-dark sm:text-title-md">
                  {report}
                </span>
                <Activity className="h-5 w-5 shrink-0 text-accent" strokeWidth={1.75} />
              </div>
            ))}
          </div>
          <Button variant="inverted" size="lg" uppercase className="mt-6 w-full">
            {c.cta}
          </Button>
        </Reveal>
      </div>
    </Section>
  );
}