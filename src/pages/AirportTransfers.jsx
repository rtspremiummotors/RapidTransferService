import Seo, { SITE_URL } from "../components/Seo.jsx";
import { COMPANY, phoneLink } from "../config.js";

export default function AirportTransfers({ goTo }) {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL + "/" },
        { "@type": "ListItem", position: 2, name: "Airport Transfers", item: SITE_URL + "/airport-transfers" },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Airport transfer",
      provider: { "@type": "Organization", name: "Rapid Transfer Service" },
      areaServed: { "@type": "Country", name: "Belgium" },
    },
  ];

  return (
    <main>
      <Seo
        title="Airport Transfer Belgium | Rapid Transfer Service"
        description="Private airport transfers across Belgium, serving Brussels Airport and Charleroi Airport with fixed prices, flight tracking and professional drivers."
        path="/airport-transfers"
        structuredData={structuredData}
      />

      <section className="section">
        <div className="container">
          <nav aria-label="Breadcrumb" style={{ marginBottom: "1.5rem", fontSize: "0.85rem", color: "var(--muted)" }}>
            <a href="/" onClick={(e) => { e.preventDefault(); goTo("home"); }} style={{ color: "var(--muted)" }}>Home</a>
            <span style={{ margin: "0 0.5rem" }}>/</span>
            <span style={{ color: "var(--navy)", fontWeight: 600 }}>Airport Transfers</span>
          </nav>

          <p className="eyebrow">Belgium</p>
          <h1 style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)", marginBottom: "1.2rem" }}>Airport Transfers in Belgium</h1>
          <p className="section-sub" style={{ maxWidth: "680px", marginBottom: "2.5rem" }}>
            Rapid Transfer Service provides private airport transfers across Belgium, with pickups and
            drop-offs anywhere in the country. We currently serve Brussels Airport and Charleroi Airport,
            with flight tracking and a fixed price agreed before you travel.
          </p>

          <div style={{ display: "flex", gap: "0.9rem", marginBottom: "3rem", flexWrap: "wrap" }}>
            <a href="/book-taxi" className="btn btn-gold btn-lg" onClick={(e) => { e.preventDefault(); goTo("book-taxi"); }}>
              Book your airport transfer
            </a>
            <a href={phoneLink()} className="btn btn-outline btn-lg">Call {COMPANY.phoneDisplay}</a>
          </div>

          <div className="grid grid-3" style={{ marginBottom: "3rem" }}>
            <a
              href="/brussels-airport-transfer"
              onClick={(e) => { e.preventDefault(); goTo("brussels-airport-transfer"); }}
              className="card"
              style={{ display: "block", textDecoration: "none" }}
            >
              <h2 style={{ fontSize: "1.2rem", marginBottom: "0.6rem" }}>Brussels Airport (BRU)</h2>
              <p style={{ color: "var(--muted)", fontSize: "0.92rem", lineHeight: 1.6 }}>
                Belgium's main international airport. Transfers to and from BRU with flight tracking.
              </p>
            </a>
            <a
              href="/charleroi-airport-transfer"
              onClick={(e) => { e.preventDefault(); goTo("charleroi-airport-transfer"); }}
              className="card"
              style={{ display: "block", textDecoration: "none" }}
            >
              <h2 style={{ fontSize: "1.2rem", marginBottom: "0.6rem" }}>Charleroi Airport (CRL)</h2>
              <p style={{ color: "var(--muted)", fontSize: "0.92rem", lineHeight: 1.6 }}>
                A hub for low-cost carriers, roughly an hour from Brussels. Transfers timed to your flight.
              </p>
            </a>
          </div>

          <div style={{ display: "grid", gap: "2.5rem" }}>
            <div>
              <h2 style={{ fontSize: "1.4rem", marginBottom: "0.8rem" }}>Flight tracking included</h2>
              <p style={{ color: "var(--muted)", lineHeight: 1.75 }}>
                We track your flight and adjust pickup times automatically if it's early or delayed, so an
                unexpected delay doesn't leave you waiting or your driver arriving too soon.
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: "1.4rem", marginBottom: "0.8rem" }}>Fixed prices</h2>
              <p style={{ color: "var(--muted)", lineHeight: 1.75 }}>
                Your price is agreed before you travel, whether you're heading to the airport or being
                collected from arrivals. No surprises at the end of the ride.
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: "1.4rem", marginBottom: "0.8rem" }}>Pickups from anywhere in Belgium</h2>
              <p style={{ color: "var(--muted)", lineHeight: 1.75 }}>
                Whether you're travelling from Brussels, Antwerp, Ghent, Bruges or elsewhere in Belgium,
                we arrange your airport transfer from your exact address.
              </p>
            </div>
          </div>

          <div style={{ marginTop: "3rem", textAlign: "center" }}>
            <a href="/book-taxi" className="btn btn-gold btn-lg" onClick={(e) => { e.preventDefault(); goTo("book-taxi"); }}>
              Book your airport transfer now
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}