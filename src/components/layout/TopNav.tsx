import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/Button";
import { Wordmark } from "../ui/Wordmark";
import { Container } from "../ui/Container";
import { nav } from "../../data/content";

export function TopNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <nav ref={navRef} className="sticky top-0 z-50 border-b border-hairline bg-canvas/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Wordmark />

        {/* Desktop nav links */}
        <div className="hidden items-center gap-8 md:flex">
          {nav.links.map((link) => (
            <a
              key={link}
              href="#"
              className="font-sans text-nav-link font-medium tracking-wide text-muted transition-colors hover:text-ink"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Desktop right actions */}
        <div className="hidden items-center gap-3 md:flex">
          <Button variant="text">{nav.login}</Button>
          <Button variant="primary">{nav.cta}</Button>
        </div>

        {/* Mobile: CTA + hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <Button variant="primary" size="lg">{nav.cta}</Button>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-ink transition-colors hover:bg-hairline/40"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="border-t border-hairline bg-canvas/95 backdrop-blur md:hidden">
          <Container className="flex flex-col py-4">
            {nav.links.map((link) => (
              <a
                key={link}
                href="#"
                className="font-sans text-nav-link font-medium tracking-wide text-muted py-3 transition-colors hover:text-ink border-b border-hairline/50 last:border-b-0"
                onClick={() => setMenuOpen(false)}
              >
                {link}
              </a>
            ))}
            <div className="pt-4">
              <Button variant="text" className="w-full justify-start">{nav.login}</Button>
            </div>
          </Container>
        </div>
      )}
    </nav>
  );
}