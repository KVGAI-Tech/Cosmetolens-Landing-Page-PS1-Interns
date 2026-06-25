import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Section } from "../ui/Section";
import { Button } from "../ui/Button";
import { ImageSlot } from "../ui/ImageSlot";
import { Reveal } from "../ui/Reveal";
import { CountUp } from "../ui/CountUp";
import { AnimatedBar } from "../ui/AnimatedBar";
import { cn } from "../../lib/cn";
import { ingredients as ing } from "../../data/content";

export function IngredientMatches() {
  const [active, setActive] = useState(0);
  const item = ing.items[active];

  return (
    <Section surface="soft">
      <Reveal className="mb-10 flex items-end justify-between">
        <div className="max-w-2xl">
          <div className="mb-4 text-eyebrow uppercase text-primary">{ing.eyebrow}</div>
          <h2 className="text-display-xl">{ing.heading}</h2>
        </div>
        <Button variant="link">{ing.link}</Button>
      </Reveal>

      {/* Molecule banner */}
      <Reveal className="mb-12">
        <ImageSlot
          src={ing.image}
          alt="Key active ingredients"
          ratio="auto"
          fit="contain"
          className="h-[320px] border border-hairline !bg-canvas"
          imgClassName="p-4"
        />
      </Reveal>

      {/* Interactive explorer: selectable list <-> animated detail */}
      <Reveal className="grid grid-cols-12 gap-8">
        <ul className="col-span-5 space-y-2">
          {ing.items.map((it, i) => {
            const selected = i === active;
            return (
              <li key={it.name}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className={cn(
                    "flex w-full items-center gap-4 rounded-lg border px-5 py-4 text-left transition-all duration-200",
                    selected
                      ? "border-primary bg-canvas shadow-soft"
                      : "border-hairline bg-transparent hover:bg-canvas/60",
                  )}
                >
                  <span
                    className={cn(
                      "font-serif text-title-lg",
                      selected ? "text-primary" : "text-muted",
                    )}
                  >
                    {it.symbol}
                  </span>
                  <span className="flex-1 text-title-sm text-ink">{it.name}</span>
                  <ArrowRight
                    className={cn(
                      "h-4 w-4 transition-all",
                      selected ? "text-primary opacity-100" : "opacity-0",
                    )}
                  />
                </button>
              </li>
            );
          })}
        </ul>

        {/* Detail panel */}
        <div className="col-span-7 rounded-xl border border-hairline bg-canvas p-10 shadow-soft">
          <div className="flex items-start justify-between">
            <div>
              <div className="font-serif text-display-md text-primary">{item.symbol}</div>
              <h3 className="mt-1 text-display-sm text-ink">{item.name}</h3>
            </div>
            <div className="text-right">
              <div className="font-serif text-display-md text-ink">
                <CountUp value={item.pct} suffix="%" />
              </div>
              <div className="text-caption-uppercase uppercase text-muted">Compatibility</div>
            </div>
          </div>
          <p className="mt-6 max-w-md text-body-lg text-muted">{item.body}</p>
          <div className="mt-8">
            <AnimatedBar pct={item.pct} trackClassName="h-2" />
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
