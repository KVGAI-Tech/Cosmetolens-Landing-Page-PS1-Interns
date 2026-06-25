import { ShieldCheck, Activity } from "lucide-react";
import { Section } from "../ui/Section";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { cosmetovigilance as c } from "../../data/content";

export function Cosmetovigilance() {
  return (
    <Section surface="dark">
      <div className="grid grid-cols-2 items-center gap-16">
        <Reveal>
          <div className="mb-5 flex items-center gap-3 text-eyebrow uppercase text-accent">
            <ShieldCheck className="h-5 w-5" strokeWidth={2} />
            Cosmetovigilance
          </div>
          <h2 className="text-display-xl text-on-dark">{c.heading}</h2>
          <p className="mt-6 max-w-lg text-body-lg text-on-dark-soft">{c.body}</p>
          <div className="mt-8 border-l-2 border-accent bg-surface-dark-soft p-4">
            <p className="text-body-sm italic text-on-dark-soft">
              “A comprehensive monitoring system for cosmetic safety.”
            </p>
          </div>
        </Reveal>

        <Reveal delay={120} className="space-y-3">
          {c.reports.map((report) => (
            <div
              key={report}
              className="flex items-center justify-between rounded-md border border-white/10 bg-surface-dark-elevated px-6 py-4 transition-colors hover:bg-surface-dark-soft"
            >
              <span className="text-title-sm text-on-dark">{report}</span>
              <Activity className="h-5 w-5 text-accent" strokeWidth={1.75} />
            </div>
          ))}
          <Button variant="inverted" size="lg" uppercase className="mt-3 w-full">
            {c.cta}
          </Button>
        </Reveal>
      </div>
    </Section>
  );
}
