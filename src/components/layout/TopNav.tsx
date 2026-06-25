import { Button } from "../ui/Button";
import { Wordmark } from "../ui/Wordmark";
import { Container } from "../ui/Container";
import { nav } from "../../data/content";

export function TopNav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-hairline bg-canvas/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Wordmark />

        <div className="flex items-center gap-8">
          {nav.links.map((link, i) => (
            <a
              key={link}
              href="#"
              className={
                "font-sans text-nav-link transition-colors " +
                (i === 0 ? "text-ink" : "text-muted hover:text-ink")
              }
            >
              {link}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Button variant="text">{nav.login}</Button>
          <Button variant="primary">{nav.cta}</Button>
        </div>
      </Container>
    </nav>
  );
}
