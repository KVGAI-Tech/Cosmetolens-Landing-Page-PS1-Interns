import { ArrowRight, Building2, BookOpen } from "lucide-react";
import { Section } from "../ui/Section";
import { Reveal } from "../ui/Reveal";
import { forBrands, knowledgeHub } from "../../data/content";

export function ForBrandsHub() {
  const cards = [
    { icon: Building2, heading: forBrands.heading, body: forBrands.body, items: forBrands.benefits, cta: forBrands.cta },
    { icon: BookOpen, heading: knowledgeHub.heading, body: knowledgeHub.body, items: knowledgeHub.explore, cta: knowledgeHub.cta },
  ];

  return (
    <Section surface="canvas">
      <div className="grid grid-cols-2 gap-gutter">
        {cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <Reveal
              key={card.heading}
              delay={i * 120}
              className="hover-lift group flex flex-col rounded-lg border border-hairline bg-surface-soft p-12 hover:bg-canvas"
            >
              <Icon className="mb-6 h-9 w-9 text-primary" strokeWidth={1.5} />
              <h3 className="text-display-md">{card.heading}</h3>
              <p className="mt-4 text-body-md text-muted">{card.body}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {card.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-pill bg-canvas px-3 py-1 text-caption text-muted ring-1 ring-hairline"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className="mt-8 inline-flex items-center gap-2 text-[16px] font-semibold font-sans text-primary"
              >
                {card.cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
