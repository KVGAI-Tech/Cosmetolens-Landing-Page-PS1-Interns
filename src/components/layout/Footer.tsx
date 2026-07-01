import { Wordmark } from "../ui/Wordmark";
import { Container } from "../ui/Container";
import { footer } from "../../data/content";

export function Footer() {
  return (
    <footer className="bg-surface-dark text-on-dark-soft">
      {/* terracotta accent strip */}
      <div className="h-1 w-full bg-primary" />

      <Container className="py-12 sm:py-16 lg:py-24">
        {/* ── Main grid ──────────────────────────────────────────────────────
            mobile : 1 col (brand block full-width, then columns stacked 2-up)
            sm     : 2 cols (brand + nav columns wrap nicely)
            lg     : [1.6fr  1fr 1fr 1fr 1fr] — original editorial layout
        ──────────────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_repeat(4,1fr)] lg:gap-gutter">
          {/* Brand block */}
          <div className="sm:col-span-2 lg:col-span-1 lg:pr-10">
            <Wordmark tone="onDark" />
            {/*
              ✦ Typography fix: was font-serif text-display-md (36 px) — far
                too large next to 14 px body copy. Corrected to text-body-md
                (16 px) with italic serif for an editorial but proportionate feel.
            */}
            <p className="mt-5 max-w-xs font-serif text-body-md italic leading-relaxed text-on-dark">
              {footer.tagline}
            </p>
          </div>

          {/* New container for nav columns */}
          <div className="grid grid-cols-2 gap-x-10 gap-y-5 sm:col-span-2 lg:col-span-4 lg:contents">
            {/* Nav columns — 2-up on sm, each in their own cell on lg */}
            {footer.columns.map((col) => (
              <div key={col.title}>
                <h5 className="mb-5 text-caption-uppercase uppercase tracking-[0.18em] text-primary-tint">
                  {col.title}
                </h5>
                <ul className="space-y-3.5">
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
        </div>

        {/* ── Bottom bar ─────────────────────────────────────────────────── */}
        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between lg:mt-16 lg:pt-8">
          <p className="text-body-sm text-on-dark-soft">{footer.copyright}</p>
          <div className="flex flex-wrap gap-5">
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
