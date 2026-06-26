import { Fingerprint, History, Sparkles } from "lucide-react";
import { Section } from "../ui/Section";
import { Reveal } from "../ui/Reveal";
import { howItWorks } from "../../data/content";

function getStepIcon(iconName: string) {
  switch (iconName) {
    case "fingerprint":
      return (
        <Fingerprint
          className="h-8 w-8 text-accent group-hover:text-primary group-hover:scale-110 transition-all duration-500"
          strokeWidth={1.2}
        />
      );
    case "history_edu":
      return (
        <History
          className="h-8 w-8 text-accent group-hover:text-primary group-hover:scale-110 transition-all duration-500"
          strokeWidth={1.2}
        />
      );
    case "insights":
      return (
        <Sparkles
          className="h-8 w-8 text-accent group-hover:text-primary group-hover:scale-110 transition-all duration-500"
          strokeWidth={1.2}
        />
      );
    default:
      return null;
  }
}

export function HowItWorks() {
  return (
    <Section surface="dark" className="relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-accent/5 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Centered Section Header */}
      <Reveal className="text-center max-w-3xl mx-auto mb-16 relative z-10">
        <div className="mb-3 text-eyebrow uppercase text-accent/80 tracking-widest">
          {howItWorks.eyebrow}
        </div>
        <h2 className="text-display-xl text-on-dark leading-tight font-serif">
          {howItWorks.heading}
        </h2>
      </Reveal>

      {/* Steps Timeline Container */}
      <div className="relative max-w-6xl mx-auto z-10 px-4 sm:px-6 lg:px-8">
        {/* Horizontal Connecting Line (Desktop: lg and up) */}
        <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-accent/40 via-white/20 to-transparent z-0"></div>

        {/* Vertical Connecting Line (Mobile/Tablet: below lg) */}
        <div className="lg:hidden absolute top-12 bottom-12 left-12 w-[2px] bg-gradient-to-b from-accent/40 via-white/20 to-transparent z-0"></div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 relative z-10">
          {howItWorks.steps.map((step, i) => (
            <Reveal key={step.no} delay={i * 150} className="h-full">
              <div className="group flex flex-col lg:flex-col items-start lg:items-start text-left relative pl-24 lg:pl-0 h-full">
                {/* Step Circle Bubble Wrapper */}
                <div className="absolute left-0 top-0 lg:relative lg:left-auto lg:top-auto lg:mb-8 z-10">
                  {/* Glowing Outer Ring */}
                  <div className="w-24 h-24 rounded-full p-[2px] bg-white/10 border border-white/20 group-hover:border-primary group-hover:shadow-[0_0_25px_rgba(192,98,63,0.25)] transition-all duration-500 ease-out">
                    {/* Opaque Inner Circle (Blocks the connecting line completely) */}
                    <div className="w-full h-full rounded-full bg-surface-dark-soft flex items-center justify-center group-hover:bg-surface-dark-elevated transition-colors duration-500">
                      <span className="font-sans font-bold text-xl text-accent group-hover:text-primary transition-colors duration-500">
                        {step.no}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="flex flex-col flex-grow w-full">
                  <h3 className="text-title-lg text-on-dark font-serif font-medium tracking-wide group-hover:text-accent transition-colors duration-300 lg:min-h-[3.5rem] flex items-end lg:items-start">
                    {step.title}
                  </h3>
                  <p className="bg-white/20 h-0.5 w-full mb-3 mt-2"></p>
                  <p className="text-body-md text-on-dark-soft/80 mb-6 leading-relaxed max-w-sm flex-grow">
                    {step.body}
                  </p>
                  
                  {/* Icon Container with elegant micro-border */}
                  <div className="mt-auto inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/[0.03] border border-white/5 group-hover:bg-white/[0.08] group-hover:border-white/10 transition-all duration-500">
                    {getStepIcon(step.icon)}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}



