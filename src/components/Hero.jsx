import { COMPANY, phoneLink, whatsappLink } from "../config.js";

export default function Hero({ onBook }) {
  return (
    <section className="hero" id="top">
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-glow-1" />
        <div className="hero-glow-2" />
      </div>

      <div className="container hero-inner">

        {/* Trust line */}
        <div className="hero-trust-bar">
          <span><span className="green-dot" />Online now · Average response 3 min</span>
          <span className="htb-sep" />
          <span>⭐⭐⭐⭐⭐ Trusted by 500+ customers</span>
          <span className="htb-sep" />
          <span>✓ Licensed &amp; insured in Belgium</span>
        </div>

        {/* Headline */}
        <h1 className="hero-title">
          Need a ride or delivery<br />
          <span className="hero-title-accent">right now?</span>
        </h1>

        <p className="hero-sub">
          We pick up within minutes. Fixed prices. Professional drivers.<br />
          Belgium &amp; across Europe — 24 hours a day, 7 days a week.
        </p>

        {/* Primary CTAs */}
        <div className="hero-cta-group">
          <button className="btn-cta-primary" onClick={() => onBook("book-taxi")}>
            <span className="cta-icon">🚕</span>
            <span className="cta-text">
              <span className="cta-main">Book a Taxi</span>
              <span className="cta-sub">Airport · City · International</span>
            </span>
            <span className="cta-arrow">→</span>
          </button>

          <button className="btn-cta-secondary" onClick={() => onBook("book-parcel")}>
            <span className="cta-icon">📦</span>
            <span className="cta-text">
              <span className="cta-main">Send a Parcel</span>
              <span className="cta-sub">Same-day · Any size · Europe</span>
            </span>
            <span className="cta-arrow">→</span>
          </button>
        </div>

        {/* Or call directly */}
        <div className="hero-or">
          <span className="or-line" /><span className="or-text">or reach us directly</span><span className="or-line" />
        </div>

        <div className="hero-direct">
          <a href={phoneLink()} className="direct-btn direct-phone">
            <PhoneIcon />
            <div>
              <span className="direct-label">Call us now</span>
              <span className="direct-value">{COMPANY.phoneDisplay}</span>
            </div>
          </a>
          <a href={whatsappLink()} className="direct-btn direct-whatsapp" target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon />
            <div>
              <span className="direct-label">Message on</span>
              <span className="direct-value">WhatsApp</span>
            </div>
          </a>
        </div>

        {/* Reassurance strip */}
        <div className="hero-reassurance">
          <span>✓ Fixed Price Upfront</span>
          <span>✓ Professional Drivers</span>
          <span>✓ Reliable On-Time Pickups</span>
          <span>✓ Available 24/7</span>
        </div>

      </div>
    </section>
  );
}

export function WhatsAppIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.94L2 22l5.2-1.5A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.08.89.86-3.01-.2-.31a8.16 8.16 0 1 1 6.85 3.74Zm4.46-6.07c-.24-.12-1.44-.71-1.66-.79-.22-.08-.39-.12-.55.12-.16.24-.63.79-.77.95-.14.16-.28.18-.53.06a6.65 6.65 0 0 1-3.32-2.9c-.25-.43.25-.4.72-1.33.08-.16.04-.3-.02-.42-.06-.12-.55-1.32-.75-1.81-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.43.06-.65.3-.22.24-.85.83-.85 2.03s.87 2.36 1 2.52c.12.16 1.72 2.62 4.16 3.68.58.25 1.04.4 1.39.51.58.19 1.12.16 1.54.1.47-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.47-.28Z"/>
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z"/>
    </svg>
  );
}