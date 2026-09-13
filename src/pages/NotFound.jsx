import Seo from "../components/Seo.jsx";

export default function NotFound({ goTo }) {
  return (
    <main className="section" style={{ minHeight: "50vh", display: "flex", alignItems: "center" }}>
      <Seo
        title="Page Not Found | Rapid Transfer Service"
        description="The page you're looking for doesn't exist. Book a taxi or contact Rapid Transfer Service directly."
        path="/404"
        noindex
      />
      <div className="container" style={{ textAlign: "center" }}>
        <p className="eyebrow" style={{ justifyContent: "center" }}>404</p>
        <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", marginBottom: "1rem" }}>
          Page not found
        </h1>
        <p className="section-sub" style={{ maxWidth: "480px", margin: "0 auto 2rem" }}>
          The page you're looking for doesn't exist or may have moved. Here's what you can do instead:
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.9rem", justifyContent: "center" }}>
          <a href="/" className="btn btn-gold" onClick={(e) => { e.preventDefault(); goTo("home"); }}>
            Return home
          </a>
          <a href="/book-taxi" className="btn btn-outline" onClick={(e) => { e.preventDefault(); goTo("book-taxi"); }}>
            Book a taxi
          </a>
          <a href="#contact" className="btn btn-outline" onClick={(e) => { e.preventDefault(); goTo("home"); setTimeout(() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }), 50); }}>
            Contact us
          </a>
        </div>
      </div>
    </main>
  );
}