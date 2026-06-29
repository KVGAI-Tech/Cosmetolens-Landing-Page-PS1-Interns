import { Section } from "../ui/Section";
import { Reveal } from "../ui/Reveal";
import { howItWorks } from "../../data/content";

/* Step-level icon initials — one letter per step, visually anchors each card */
const stepIcons = ["✦", "◎", "◈"];

export function HowItWorks() {
  return (
    <Section surface="dark">
      {/* ── Header ── */}
      <Reveal>
        <div className="mb-16 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-accent">
              How It Works
            </p>
            <h2 className="text-display-xl text-on-dark max-w-sm leading-tight">
              {howItWorks.heading}
            </h2>
          </div>
          <p className="max-w-xs text-body-md text-on-dark-soft md:text-right">
            {howItWorks.sub}
          </p>
        </div>
      </Reveal>

      {/* ── Connector + Steps ── */}
      <div className="relative">
        {/* Horizontal rule connecting steps — desktop only */}
        <div
          aria-hidden="true"
          className="absolute left-0 right-0 top-[2.75rem] hidden border-t border-white/10 md:block"
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {howItWorks.steps.map((step, i) => (
            <Reveal key={step.no} delay={i * 120}>
              <div className="group flex flex-col gap-5 rounded-xl border border-white/10 bg-white/[0.04] p-7 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.07]">

                {/* Step number + icon row */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-on-dark-soft">
                    Step {step.no}
                  </span>
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-sm text-accent transition-colors duration-300 group-hover:border-accent/40 group-hover:text-on-dark"
                    aria-hidden="true"
                  >
                    {stepIcons[i]}
                  </span>
                </div>

                {/* Divider */}
                <div className="h-px w-full bg-white/10" />

                {/* Title + body */}
                <div className="flex flex-col gap-3">
                  <h3 className="text-title-lg text-on-dark leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-body-md text-on-dark-soft leading-relaxed">
                    {step.body}
                  </p>
                </div>

                {/* Step indicator dot */}
                <div className="mt-auto pt-2 flex items-center gap-1.5">
                  {howItWorks.steps.map((_, j) => (
                    <span
                      key={j}
                      className={`h-1 rounded-full transition-all duration-300 ${
                        j === i
                          ? "w-5 bg-accent"
                          : "w-1.5 bg-white/20"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ── Bottom CTA ── */}
      <Reveal>
        <div className="mt-14 flex flex-col items-center gap-4 border-t border-white/10 pt-12 text-center">
          <p className="text-body-md text-on-dark-soft max-w-md">
            Takes under 2 minutes. No account required to start.
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-pill border border-accent/50 bg-transparent px-7 py-3 text-[11px] uppercase tracking-[0.15em] text-accent transition-all duration-300 hover:bg-accent hover:text-surface-dark"
          >
            Create Your Skin ID
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </Reveal>
    </Section>
  );
}
