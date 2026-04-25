"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Stack" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav id="nav" className={scrolled ? "scrolled" : ""}>
        <div className="nav-logo">
          AF<em>.</em>
        </div>
        <ul className="nav-links">
          {LINKS.map((l) => (
            <li key={l.href}><a href={l.href}>{l.label}</a></li>
          ))}
        </ul>
        <a
          href="/resume.pdf"
          download="AnselmoFerrer-Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-resume"
        >
          Resume ↓
        </a>
        <button
          type="button"
          className={`nav-burger${menuOpen ? " is-open" : ""}`}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div
        id="mobile-menu"
        className={`mobile-menu${menuOpen ? " is-open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <ul className="mobile-menu-list">
          {LINKS.map((l, i) => (
            <li key={l.href} style={{ transitionDelay: `${0.05 + i * 0.05}s` }}>
              <a href={l.href} onClick={closeMenu}>
                <span className="mobile-menu-num">0{i + 1}</span>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="/resume.pdf"
          download="AnselmoFerrer-Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="mobile-menu-resume"
          onClick={closeMenu}
        >
          Download Resume ↓
        </a>
      </div>
    </>
  );
}
