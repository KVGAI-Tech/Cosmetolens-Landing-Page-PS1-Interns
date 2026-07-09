import { Section } from "../ui/Section";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { finalCta } from "../../data/content";

export function FinalCta() {
  return (
    <Section surface="soft" className="grain">
      <Reveal className="mx-auto max-w-4xl py-8 text-center">
        <h2 className="whitespace-pre-line bg-gradient-to-br from-ink via-body to-primary bg-clip-text text-display-2xl text-transparent">
          {finalCta.heading}
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-body-lg leading-8 text-muted">
          {finalCta.sub}
        </p>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-10">
          {finalCta.ctas.map((cta) => (
            <Button
              key={cta}
              variant="text"
              className="font-serif text-title-lg text-primary transition-all duration-300 hover:text-primary"
            >
              {cta}
            </Button>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}