import { Section } from "../ui/Section";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { finalCta } from "../../data/content";

export function FinalCta() {
  return (
    <Section surface="soft" className="grain">
      <Reveal className="mx-auto max-w-4xl py-8 text-center">
        <h2 className="whitespace-pre-line text-display-2xl text-ink">{finalCta.heading}</h2>
        <p className="mx-auto mt-6 max-w-xl text-body-lg text-muted">{finalCta.sub}</p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
          <Button variant="primary" size="lg" uppercase>
            {finalCta.ctas[0]}
          </Button>
          <Button variant="link">{finalCta.ctas[1]}</Button>
          <Button variant="link">{finalCta.ctas[2]}</Button>
        </div>
      </Reveal>
    </Section>
  );
}
