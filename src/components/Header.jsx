import { useState, useEffect } from "react";
import BookModal from "./BookModal.jsx";

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Our vehicles", href: "#fleet" },
  { label: "Why us", href: "#why-us" },
  { label: "Contact", href: "#contact" },
];

const LANGUAGES = ["EN", "NL", "FR"];

export default function Header({ onNav }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState("EN");
  const [scrolled, setScrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Nav links: on booking pages scroll back to home first then to section
  const handleNavClick = (href) => {
    setMenuOpen(false);
    // If we're on a booking page (no hash sections visible), go home first
    onNav && onNav("home");
    // Small delay to let home render before scrolling
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  return (
    <>
      <header className={`header ${scrolled ? "header-scrolled" : ""}`}>
        <div className="container header-inner">

          {/* Logo — always goes home */}
          <a
            href="#top"
            className="logo"
            onClick={(e) => { e.preventDefault(); onNav && onNav("home"); }}
            aria-label="Rapid Transfer Service"
          >
            <img src="/logo-mark.png" alt="" className="logo-mark" />
            <span className="logo-text">
              Rapid Transfer <em>Service</em>
            </span>
          </a>

          {/* Desktop nav */}
          <nav className={`nav ${menuOpen ? "nav-open" : ""}`} aria-label="Main">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link"
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right side */}
          <div className="header-right">
            <select
              className="lang-select"
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              aria-label="Choose language"
            >
              {LANGUAGES.map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>

            <button
              type="button"
              className="btn btn-gold header-book"
              onClick={() => setShowModal(true)}
            >
              Book now
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            className={`menu-toggle ${menuOpen ? "menu-toggle-open" : ""}`}
            aria-expanded={menuOpen}
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span /><span /><span />
          </button>

        </div>
      </header>

      {showModal && (
        <BookModal
          onSelect={(page) => { setShowModal(false); onNav && onNav(page); }}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}