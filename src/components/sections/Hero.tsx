import { Check } from "lucide-react";
import { Button } from "../ui/Button";
import { ImageSlot } from "../ui/ImageSlot";
import { Reveal } from "../ui/Reveal";
import { hero } from "../../data/content";

export function Hero() {
  return (
    <section className="hero-wash grain">
      <div className="mx-auto grid max-w-content grid-cols-12 items-center gap-12 px-16 pb-section pt-7">
        {/* Copy */}
        <Reveal className="col-span-7 space-y-16 md:col-span-8 md:space-y-6">          <h1 className="whitespace-pre-line text-display-2xl text-ink md:whitespace-normal md:text-display-xl">{hero.headline}</h1>

          <p className="max-w-xl text-body-lg text-muted">{hero.sub}</p>

          <div className="flex flex-wrap gap-4">
            <Button variant="primary" size="lg" uppercase>
              {hero.primaryCta}
            </Button>
            <Button variant="secondary" size="lg" uppercase>
              {hero.secondaryCta}
            </Button>
          </div>

          <ul className="grid max-w-xl grid-cols-2 gap-x-8 gap-y-3">
            {hero.trust.map((t) => (
              <li key={t} className="flex items-center gap-2 text-body-sm text-body">
                <Check className="h-4 w-4 shrink-0 text-primary" strokeWidth={2.5} />
                {t}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Portrait on mobile, square on desktop */}
        <Reveal delay={120} className="col-span-5 md:col-span-4">
          <ImageSlot
            src={hero.image}
            alt="Glowing, healthy skin"
            ratio="portrait"
            eager
            rounded="rounded-xl"
            className="border border-hairline shadow-lift md:hidden"
            imgClassName="object-[54%_26%]"
          />
          <ImageSlot
            src={hero.image}
            alt="Glowing, healthy skin"
            ratio="square"
            eager
            rounded="rounded-xl"
            className="hidden border border-hairline shadow-lift md:block"
            imgClassName="object-[54%_26%]"
          />
        </Reveal>
      </div>
    </section>
  );
}