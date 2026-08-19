import { COMPANY, phoneLink, emailLink, whatsappLink } from "../config.js";
import { WhatsAppIcon } from "./Hero.jsx";

export default function Footer({ onNav }) {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">

      {/* CTA band */}
      <div className="footer-cta-band">
        <div className="container footer-cta-inner">
          <div>
            <h2 className="footer-cta-title">Ready to book?</h2>
            <p className="footer-cta-sub">Available 24/7 — we respond within minutes.</p>
          </div>
          <div className="footer-cta-btns">
            <a href={phoneLink()} className="btn btn-navy btn-lg">
              <PhoneIcon /> {COMPANY.phoneDisplay}
            </a>
            <a href={whatsappLink()} className="btn btn-whatsapp btn-lg" target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon /> WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="footer-main">
        <div className="container footer-grid">

          {/* Brand */}
          <div className="footer-brand">
            <a href="#top" className="logo logo-footer" onClick={(e) => { e.preventDefault(); onNav && onNav("home"); }}>
              <img src="/logo-mark.png" alt="" className="logo-mark" />
              <span className="logo-text">Rapid Transfer <em>Service</em></span>
            </a>
            <p>Professional taxi and parcel delivery across Belgium and Europe. Based in Brussels, available 24/7.</p>
            <div className="footer-socials">
              <a href={phoneLink()} className="footer-social-btn"><PhoneIcon /> {COMPANY.phoneDisplay}</a>
              <a href={emailLink()} className="footer-social-btn"><MailIcon /> {COMPANY.email}</a>
              <a href={whatsappLink()} className="footer-social-btn footer-wa" target="_blank" rel="noopener noreferrer"><WhatsAppIcon /> WhatsApp</a>
            </div>
          </div>

          {/* Links */}
          <div className="footer-col">
            <h4>Company</h4>
            <a href="#services" onClick={(e) => { e.preventDefault(); onNav && onNav("home"); setTimeout(() => document.querySelector("#services")?.scrollIntoView({ behavior:"smooth" }), 50); }}>Services</a>
            <a href="#how-it-works" onClick={(e) => { e.preventDefault(); onNav && onNav("home"); setTimeout(() => document.querySelector("#how-it-works")?.scrollIntoView({ behavior:"smooth" }), 50); }}>How it works</a>
            <a href="#fleet" onClick={(e) => { e.preventDefault(); onNav && onNav("home"); setTimeout(() => document.querySelector("#fleet")?.scrollIntoView({ behavior:"smooth" }), 50); }}>Our vehicles</a>
            <a href="#why-us" onClick={(e) => { e.preventDefault(); onNav && onNav("home"); setTimeout(() => document.querySelector("#why-us")?.scrollIntoView({ behavior:"smooth" }), 50); }}>Why choose us</a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); onNav && onNav("home"); setTimeout(() => document.querySelector("#contact")?.scrollIntoView({ behavior:"smooth" }), 50); }}>Contact</a>
            <a href="#" onClick={(e) => { e.preventDefault(); onNav && onNav("drive-with-us"); }}>Drive with us</a>
          </div>

          <div className="footer-col">
            <h4>Services</h4>
            <span>City to City Taxi</span>
            <span>Airport Transfers</span>
            <span>International Rides</span>
            <span>Business Travel</span>
            <span>Same-Day Parcel</span>
            <span>International Parcel</span>
          </div>

          <div className="footer-col">
            <h4>Coverage</h4>
            <span>🇧🇪 Belgium</span>
            <span>🇫🇷 France</span>
            <span>🇳🇱 Netherlands</span>
            <span>🇩🇪 Germany</span>
            <span>🇱🇺 Luxembourg</span>
            <span>🇬🇧 United Kingdom</span>
            <span>+ All of Europe</span>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom-bar">
        <div className="container footer-bottom-inner">
          <span>© {year} {COMPANY.name}. All rights reserved.</span>
          <div className="footer-legal-links">
            <button className="footer-legal-btn" onClick={() => onNav && onNav("terms")}>Terms & Conditions</button>
            <span className="footer-legal-sep">·</span>
            <button className="footer-legal-btn" onClick={() => onNav && onNav("privacy")}>Privacy Policy</button>
          </div>
          <span>Licensed &amp; insured · Brussels, Belgium</span>
        </div>
      </div>

    </footer>
  );
}

const ico = { width:15, height:15, viewBox:"0 0 24 24", fill:"none", stroke:"currentColor", strokeWidth:2, strokeLinecap:"round", strokeLinejoin:"round", "aria-hidden":true };
function PhoneIcon() { return <svg {...ico}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z"/></svg>; }
function MailIcon() { return <svg {...ico}><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>; }