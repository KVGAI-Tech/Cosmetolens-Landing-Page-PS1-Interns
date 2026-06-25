import { Wordmark } from "../ui/Wordmark";
import { Container } from "../ui/Container";
import { footer } from "../../data/content";

export function Footer() {
  return (
    <footer className="bg-surface-dark text-on-dark-soft">
      {/* terracotta accent strip */}
      <div className="h-1 w-full bg-primary" />
      <Container className="py-20">
        <div className="grid grid-cols-[1.6fr_repeat(4,1fr)] gap-gutter">
          <div className="pr-10">
            <Wordmark tone="onDark" />
            <p className="mt-6 max-w-xs font-serif text-display-sm text-on-dark">{footer.tagline}</p>
          </div>

          {footer.columns.map((col) => (
            <div key={col.title}>
              <h5 className="mb-6 text-caption-uppercase uppercase text-primary-tint">{col.title}</h5>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-body-sm text-on-dark-soft transition-colors hover:text-on-dark"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex items-center justify-between border-t border-white/10 pt-8">
          <p className="text-body-sm text-on-dark-soft">{footer.copyright}</p>
          <div className="flex gap-6">
            {footer.social.map((s) => (
              <a
                key={s}
                href="#"
                className="text-caption-uppercase uppercase text-on-dark-soft transition-colors hover:text-primary-tint"
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
