import { Star } from "lucide-react";
import { Section } from "../ui/Section";
import { Reveal } from "../ui/Reveal";
import { CountUp } from "../ui/CountUp";
import { AnimatedBar } from "../ui/AnimatedBar";
import { problem } from "../../data/content";

export function ProblemComparison() {
  const { generic, precise } = problem;
  return (
    <Section surface="soft">
      <Reveal className="mx-auto mb-16 max-w-3xl text-center">
        <div className="mb-5 text-eyebrow uppercase text-primary">The Problem</div>
        <h2 className="text-display-xl">{problem.heading}</h2>
        <p className="mx-auto mt-6 max-w-2xl text-body-lg text-muted">{problem.body}</p>
      </Reveal>

      {/* One unified comparison panel */}
      <Reveal className="mx-auto grid max-w-5xl grid-cols-2 overflow-hidden rounded-xl border border-hairline bg-canvas shadow-soft">
        {/* Generic */}
        <div className="border-r border-hairline p-12">
          <div className="text-caption-uppercase uppercase text-muted">{generic.label}</div>
          <h3 className="mt-3 text-title-lg text-ink">{generic.title}</h3>
          <div className="mt-8 flex items-center gap-4">
            <div className="flex text-muted-soft">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star
                  key={i}
                  className="h-6 w-6"
                  strokeWidth={1.5}
                  fill={i < Math.floor(generic.rating) ? "currentColor" : "none"}
                />
              ))}
            </div>
            <CountUp value={generic.rating} decimals={1} className="font-serif text-display-md text-ink" />
          </div>
          <p className="mt-8 text-body-md italic text-muted">“{generic.note}”</p>
        </div>

        {/* Precise */}
        <div className="relative bg-primary-tint/30 p-12">
          <div className="absolute right-0 top-0 bg-primary px-4 py-2 text-caption-uppercase uppercase text-on-primary">
            {precise.tag}
          </div>
          <div className="text-caption-uppercase uppercase text-primary">{precise.label}</div>
          <h3 className="mt-3 text-title-lg text-ink">{precise.title}</h3>
          <div className="mt-8 space-y-7">
            {precise.bars.map((bar) => (
              <div key={bar.label}>
                <div className="mb-2 flex items-baseline justify-between">
                  <span className="text-caption-uppercase uppercase text-muted">{bar.label}</span>
                  <span
                    className={
                      "font-serif text-title-lg " +
                      (bar.tone === "primary" ? "text-primary" : "text-muted")
                    }
                  >
                    <CountUp value={bar.score} decimals={1} /> / 10
                  </span>
                </div>
                <AnimatedBar
                  pct={bar.pct}
                  fillClassName={bar.tone === "primary" ? "bg-primary" : "bg-accent-strong"}
                />
              </div>
            ))}
          </div>
          <p className="mt-8 text-body-md text-primary">{precise.note}</p>
        </div>
      </Reveal>
    </Section>
  );
}
