import { Section } from "../ui/Section";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { finalCta } from "../../data/content";

export function FinalCta() {
  return (
    <Section surface="soft" className="grain">
      <Reveal className="mx-auto max-w-4xl py-8 text-center">
        <h2 className="whitespace-pre-line bg-gradient-to-br from-ink via-body to-primary bg-clip-text text-display-2xl text-transparent">{finalCta.heading}</h2>
        <p className="mx-auto mt-6 max-w-2xl text-body-lg leading-8 text-muted">{finalCta.sub}</p>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <Button
            variant="primary"
            size="lg"
            uppercase
            className="px-10 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            {finalCta.ctas[0]}
          </Button>
          <Button
            variant="link"
            className="transition-colors duration-300 hover:text-primary"
          >{finalCta.ctas[1]}</Button>
          <Button
            variant="link"
            className="transition-colors duration-300 hover:text-primary"
          >{finalCta.ctas[2]}</Button>
        </div>
      </Reveal>
    </Section>
  );
}
