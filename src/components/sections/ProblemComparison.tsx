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
      <Reveal className="mx-auto mb-10 max-w-3xl text-center">
        <div className="mb-3 text-eyebrow uppercase text-primary tracking-widest">
          {problem.eyebrow}
        </div>
        <h2 className="font-serif text-display-xl leading-tight text-ink">
          {problem.heading}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-body-lg text-muted">
          {problem.body}
        </p>
      </Reveal>

      {/* Two separate comparison panels */}
      <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
        {/* Traditional Rating Mockup */}
        <Reveal className="bg-canvas rounded-xl p-8 border border-hairline tinted-shadow flex flex-col h-full justify-between">
          <div className="mb-auto">
            <span className="text-caption-uppercase uppercase text-muted-soft block mb-3 tracking-wider">
              {generic.label}
            </span>
            <div className="flex items-baseline gap-4 mb-4">
              <span className="font-serif text-display-xl text-ink leading-none">
                <CountUp value={generic.rating} decimals={1} />
              </span>
              <div className="flex flex-col">
                <div className="flex text-primary mb-1">
                  {[0, 1, 2, 3].map((i) => (
                    <Star
                      key={i}
                      className="h-6 w-6"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth={1}
                    />
                  ))}
                  <div className="relative">
                    <Star className="h-6 w-6" stroke="currentColor" strokeWidth={1} />
                    <div className="absolute top-0 left-0 overflow-hidden w-1/2">
                      <Star
                        className="h-6 w-6"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth={1}
                      />
                    </div>
                  </div>
                </div>
                <span className="text-caption text-muted-soft">({generic.reviewsCount})</span>
              </div>
            </div>
          </div>
          <div className="border-t border-hairline pt-4 mt-6">
            <p className="italic text-body-md text-muted leading-relaxed">
              "{generic.note}"
            </p>
          </div>
        </Reveal>

        {/* Cosmetolens Intelligence Mockup */}
        <Reveal className="bg-surface-card rounded-xl tinted-shadow relative overflow-hidden shimmer-card p-8 flex flex-col h-full justify-between border border-hairline">
          {/* Shimmer line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent shimmer-line"></div>

          <div className="flex justify-between items-center mb-6">
            <h4 className="text-caption-uppercase uppercase text-primary font-semibold tracking-wider">
              {precise.label}
            </h4>
            <span className="px-3 py-1 bg-primary/10 text-primary text-caption font-semibold rounded-full border border-primary/20">
              {precise.tag}
            </span>
          </div>

          <div className="space-y-6 flex-grow flex flex-col justify-center">
            {precise.bars.map((bar, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-end">
                  <span className="font-serif text-display-md text-ink">
                    <CountUp value={bar.score} decimals={1} />
                    <span className="text-body-md text-muted font-normal">/10</span>
                  </span>
                  <span
                    className={`text-caption-uppercase uppercase font-bold ${
                      bar.tone === "success" ? "text-success" : "text-primary"
                    }`}
                  >
                    {bar.status}
                  </span>
                </div>
                <AnimatedBar
                  pct={bar.pct}
                  trackClassName="h-2 bg-surface-card-strong"
                  fillClassName={bar.tone === "success" ? "bg-success" : "bg-primary"}
                />
                <p className="text-caption text-muted">
                  Optimal for <span className="font-bold text-ink">{bar.targetSkin}</span> conditions.
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}



