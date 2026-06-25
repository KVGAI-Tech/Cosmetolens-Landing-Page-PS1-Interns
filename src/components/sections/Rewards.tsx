import { Star } from "lucide-react";
import { Section } from "../ui/Section";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { AnimatedBar } from "../ui/AnimatedBar";
import { rewards as r } from "../../data/content";

export function Rewards() {
  const b = r.balance;
  return (
    <Section surface="card">
      <div className="grid grid-cols-2 items-center gap-20">
        <Reveal>
          <div className="mb-4 text-eyebrow uppercase text-primary">Rewards</div>
          <h2 className="text-display-xl">{r.heading}</h2>
          <p className="mt-6 text-body-md text-muted">{r.body}</p>
          <ul className="mt-8 space-y-5">
            {r.earn.map((e, i) => (
              <li key={e} className="flex items-center gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-pill bg-accent text-caption font-sans font-semibold text-ink">
                  {i + 1}
                </span>
                <span className="text-title-sm text-ink">{e}</span>
              </li>
            ))}
          </ul>
          <Button variant="primary" size="lg" uppercase className="mt-10">
            {r.cta}
          </Button>
        </Reveal>

        {/* Balance card */}
        <Reveal delay={120} className="relative">
          <div className="absolute inset-0 scale-110 rounded-pill bg-primary/15 blur-3xl" />
          <div className="hover-lift relative rounded-xl border border-hairline bg-canvas p-12 shadow-lift">
            <div className="mb-8 flex items-center justify-between border-b border-hairline pb-8">
              <div>
                <div className="text-caption-uppercase uppercase text-primary">{b.label}</div>
                <div className="mt-1 font-serif text-display-md text-ink">{b.value}</div>
              </div>
              <Star className="h-10 w-10 text-primary" fill="currentColor" strokeWidth={0} />
            </div>
            <div className="flex justify-between text-caption-uppercase uppercase">
              <span className="text-muted">{b.nextTier}</span>
              <span className="text-primary">{b.toGo}</span>
            </div>
            <div className="mt-3">
              <AnimatedBar pct={b.pct} trackClassName="h-2" />
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
