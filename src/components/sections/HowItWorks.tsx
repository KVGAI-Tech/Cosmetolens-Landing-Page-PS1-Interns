import { Fingerprint, History, Sparkles } from "lucide-react";
import { Section } from "../ui/Section";
import { Reveal } from "../ui/Reveal";
import { howItWorks } from "../../data/content";

function getStepIcon(iconName: string) {
  const iconProps = {
    className:
      "h-6 w-6 text-accent transition-colors duration-300 group-hover:text-primary",
    strokeWidth: 1.4,
  };
  switch (iconName) {
    case "fingerprint":
      return <Fingerprint {...iconProps} />;
    case "history_edu":
      return <History {...iconProps} />;
    case "insights":
      return <Sparkles {...iconProps} />;
    default:
      return null;
  }
}

export function HowItWorks() {
  return (
    <Section surface="dark">
      {/* ── Header (centered, matches editorial campaign feel) ── */}
      <Reveal>
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-accent">
            {howItWorks.eyebrow}
          </p>
          <h2 className="text-display-xl text-on-dark leading-tight">
            {howItWorks.heading}
          </h2>
          <p className="mt-5 text-body-md text-on-dark-soft">
            {howItWorks.sub}
          </p>
        </div>
      </Reveal>

      {/* ── Connector + Steps ── */}
      <div className="relative mx-auto max-w-5xl">
        {/* Horizontal connector — desktop only, sits behind the icon badges */}
        <div
          aria-hidden="true"
          className="absolute left-[16.5%] right-[16.5%] top-9 hidden h-px bg-white/10 md:block"
        />

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          {howItWorks.steps.map((step, i) => (
            <Reveal key={step.no} delay={i * 120}>
              <div className="group flex flex-col items-center text-center">

                {/* Icon badge — glow ring kept, but subtle, no ambient page blur */}
                <div className="relative z-10 mb-6 flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full border border-white/15 bg-surface-dark-soft transition-all duration-300 group-hover:border-accent/40 group-hover:shadow-[0_0_20px_rgba(192,98,63,0.18)]">
                  {getStepIcon(step.icon)}
                </div>

                {/* Step label */}
                <span className="mb-2 text-[10px] uppercase tracking-[0.2em] text-on-dark-soft">
                  Step {step.no}
                </span>

                {/* Title + body */}
                <h3 className="text-title-lg text-on-dark leading-snug">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-xs text-body-md text-on-dark-soft leading-relaxed">
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ── Bottom CTA ── */}
      <Reveal>
        <div className="mt-16 flex flex-col items-center gap-4 border-t border-white/10 pt-12 text-center">
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
