import { Section } from "../ui/Section";
import { Reveal } from "../ui/Reveal";
import { howItWorks } from "../../data/content";

export function HowItWorks() {
  return (
    <Section surface="dark">
      <div className="grid grid-cols-12 gap-12">
        <Reveal className="col-span-4">
          <div className="mb-5 text-eyebrow uppercase text-accent">How It Works</div>
          <h2 className="text-display-xl text-on-dark">{howItWorks.heading}</h2>
          <p className="mt-6 max-w-xs text-body-md text-on-dark-soft">{howItWorks.sub}</p>
        </Reveal>

        <div className="col-span-8">
          {howItWorks.steps.map((step, i) => (
            <Reveal key={step.no} delay={i * 100}>
              <div className="group grid grid-cols-[auto_1fr] items-baseline gap-8 rounded-lg border-t border-white/12 py-8 pl-4 pr-6 transition-colors duration-300 hover:border-t-transparent hover:bg-white/[0.05]">
                <span className="font-serif text-display-md text-accent transition-colors duration-300 group-hover:text-primary-tint">
                  {step.no}
                </span>
                <div>
                  <h4 className="text-title-lg text-on-dark">{step.title}</h4>
                  <p className="mt-2 max-w-lg text-body-md text-on-dark-soft">{step.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
