import { Check } from "lucide-react";
import { Button } from "../ui/Button";
import { ImageSlot } from "../ui/ImageSlot";
import { Reveal } from "../ui/Reveal";
import { Container } from "../ui/Container";
import { hero } from "../../data/content";

export function Hero() {
  return (
    <section className="hero-wash grain">
      <Container className="grid grid-cols-12 items-center gap-12 pb-section pt-7">
        {/* Copy — full width on mobile, 8 cols on desktop */}
        <Reveal className="col-span-12 space-y-6 text-center md:col-span-8 md:text-left">
          <h1 className="text-display-2xl text-ink md:text-display-xl">{hero.headline}</h1>

          <p className="mx-auto max-w-xl text-body-lg text-muted md:mx-0">{hero.sub}</p>

          {/* Image — only visible on mobile, sits between description and buttons */}
          <div className="flex justify-center md:hidden">
            <ImageSlot
              src={hero.image}
              alt="Glowing, healthy skin"
              ratio="square"
              eager
              rounded="rounded-xl"
              className="w-1/2 border border-hairline shadow-lift"
              imgClassName="object-[54%_26%]"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-8 md:justify-start md:gap-4">
            <Button variant="primary" size="lg" uppercase>
              {hero.primaryCta}
            </Button>
            <Button variant="secondary" size="lg" uppercase>
              {hero.secondaryCta}
            </Button>
          </div>

          <ul className="flex flex-col items-center gap-3 md:grid md:max-w-xl md:grid-cols-2 md:gap-x-8 md:gap-y-3 md:items-start">
            {hero.trust.map((t) => (
              <li key={t} className="flex items-center gap-2 text-body-sm text-body">
                <Check className="h-4 w-4 shrink-0 text-primary" strokeWidth={2.5} />
                {t}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Image — desktop only, 4 cols on the right */}
        <Reveal delay={120} className="col-span-4 hidden md:block">
          <ImageSlot
            src={hero.image}
            alt="Glowing, healthy skin"
            ratio="portrait"
            eager
            rounded="rounded-xl"
            className="border border-hairline shadow-lift"
            imgClassName="object-[54%_26%]"
          />
        </Reveal>
      </Container>
    </section>
  );
}