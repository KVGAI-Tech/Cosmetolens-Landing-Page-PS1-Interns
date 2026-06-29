import { Wordmark } from "../ui/Wordmark";
import { Container } from "../ui/Container";
import { footer } from "../../data/content";

export function Footer() {
  return (
    <footer className="bg-surface-dark text-on-dark-soft">
      {/* terracotta accent strip */}
      <div className="h-1 w-full bg-primary" />
      <Container className="py-24">
        <div className="grid grid-cols-[1.6fr_repeat(4,1fr)] gap-gutter">
          <div className="pr-10">
            <Wordmark tone="onDark" />
            <p className="mt-6 max-w-xs font-serif text-display-md leading-relaxed text-on-dark">{footer.tagline}</p>
          </div>

          {footer.columns.map((col) => (
            <div key={col.title}>
              <h5 className="mb-7 text-caption-uppercase uppercase tracking-[0.18em] text-primary-tint">{col.title}</h5>
              <ul className="space-y-4">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-body-sm text-on-dark-soft transition-all duration-300 hover:translate-x-1 hover:text-on-dark"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-20 flex flex-col gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-body-sm text-on-dark-soft">{footer.copyright}</p>
          <div className="flex flex-wrap gap-6">
            {footer.social.map((s) => (
              <a
                key={s}
                href="#"
                className="text-caption-uppercase uppercase tracking-wider text-on-dark-soft transition-all duration-300 hover:-translate-y-0.5 hover:text-primary-tint"
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
