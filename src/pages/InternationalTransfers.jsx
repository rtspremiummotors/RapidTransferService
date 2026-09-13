import Seo, { SITE_URL } from "../components/Seo.jsx";
import { COMPANY, phoneLink } from "../config.js";

const ROUTES = [
  { from: "Brussels", to: "Paris" },
  { from: "Brussels", to: "Amsterdam" },
  { from: "Brussels", to: "Luxembourg City" },
  { from: "Brussels", to: "Cologne" },
];

const COUNTRIES = ["France", "Netherlands", "Luxembourg", "Germany", "Switzerland", "Austria", "United Kingdom"];

const FAQS = [
  {
    q: "Which countries do you drive to?",
    a: "We provide international transfers from Belgium to France, the Netherlands, Luxembourg, Germany, Switzerland, Austria and the United Kingdom, and to other Western European destinations reachable by road.",
  },
  {
    q: "Do you only pick up from Brussels?",
    a: "No. We collect passengers from anywhere in Belgium — Brussels, Antwerp, Ghent, Bruges and beyond — for international transfers, not just the capital.",
  },
  {
    q: "Is the price fixed for international trips?",
    a: "Yes. You receive a fixed price before booking, regardless of the distance or number of borders crossed.",
  },
  {
    q: "Can I book a transfer to a destination not listed?",
    a: "Yes. If your destination is reachable by road across Western Europe, contact us with your route and we will quote a fixed price.",
  },
];

export default function InternationalTransfers({ goTo }) {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL + "/" },
        { "@type": "ListItem", position: 2, name: "International Transfers", item: SITE_URL + "/international-transfers" },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "International private transfer",
      provider: { "@type": "Organization", name: "Rapid Transfer Service" },
      areaServed: [
        { "@type": "Country", name: "Belgium" },
        ...COUNTRIES.map((c) => ({ "@type": "Country", name: c })),
      ],
    },
  ];

  return (
    <main>
      <Seo
        title="International Transfers Belgium | Private Taxi Western Europe"
        description="Private international transfers from anywhere in Belgium to France, the Netherlands, Luxembourg, Germany, Switzerland, Austria, the UK and beyond. Fixed prices, door to door."
        path="/international-transfers"
        structuredData={structuredData}
      />

      <section className="section">
        <div className="container">
          <nav aria-label="Breadcrumb" style={{ marginBottom: "1.5rem", fontSize: "0.85rem", color: "var(--muted)" }}>
            <a href="/" onClick={(e) => { e.preventDefault(); goTo("home"); }} style={{ color: "var(--muted)" }}>Home</a>
            <span style={{ margin: "0 0.5rem" }}>/</span>
            <span style={{ color: "var(--navy)", fontWeight: 600 }}>International Transfers</span>
          </nav>

          <p className="eyebrow">Belgium to Western Europe</p>
          <h1 style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)", marginBottom: "1.2rem" }}>International Transfers</h1>
          <p className="section-sub" style={{ maxWidth: "680px", marginBottom: "2.5rem" }}>
            Skip the connections and car rentals. We drive clients from anywhere in Belgium directly
            across the border to France, the Netherlands, Luxembourg, Germany, Switzerland, Austria, the
            United Kingdom, and other Western European destinations reachable by road — door to door,
            in one vehicle.
          </p>

          <div style={{ display: "flex", gap: "0.9rem", marginBottom: "3rem", flexWrap: "wrap" }}>
            <a href="/book-taxi" className="btn btn-gold btn-lg" onClick={(e) => { e.preventDefault(); goTo("book-taxi"); }}>
              Book an international transfer
            </a>
            <a href={phoneLink()} className="btn btn-outline btn-lg">Call {COMPANY.phoneDisplay}</a>
          </div>

          <div style={{ display: "grid", gap: "2.5rem" }}>
            <div>
              <h2 style={{ fontSize: "1.4rem", marginBottom: "0.8rem" }}>One ride, no connections</h2>
              <p style={{ color: "var(--muted)", lineHeight: 1.75 }}>
                No transfers between trains, no rental car paperwork at the border. You get in one
                vehicle in Belgium and get out at your destination, wherever in Western Europe that is.
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: "1.4rem", marginBottom: "0.8rem" }}>Countries we serve</h2>
              <p style={{ color: "var(--muted)", lineHeight: 1.75, marginBottom: "0.8rem" }}>
                From Belgium, we regularly drive to:
              </p>
              <ul style={{ color: "var(--muted)", lineHeight: 2, paddingLeft: "1.2rem" }}>
                {COUNTRIES.map((c) => <li key={c}>{c}</li>)}
              </ul>
              <p style={{ color: "var(--muted)", lineHeight: 1.75, marginTop: "0.8rem" }}>
                If your destination elsewhere in Western Europe is reachable by road, get in touch with
                your route for a fixed price.
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: "1.4rem", marginBottom: "0.8rem" }}>Popular routes</h2>
              <p style={{ color: "var(--muted)", lineHeight: 1.75, marginBottom: "0.6rem" }}>
                Some of our most requested trips start from Brussels, though pickup is available from
                anywhere in Belgium:
              </p>
              <ul style={{ color: "var(--muted)", lineHeight: 2, paddingLeft: "1.2rem" }}>
                {ROUTES.map((r) => (
                  <li key={r.to}>{r.from} → {r.to}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 style={{ fontSize: "1.4rem", marginBottom: "0.8rem" }}>Business and leisure travel</h2>
              <p style={{ color: "var(--muted)", lineHeight: 1.75 }}>
                Whether it's a client meeting in Paris, a connection through Zurich or Geneva, or a
                family visit in the Netherlands, we plan the route and timing around your schedule.{" "}
                <a href="/business-transfers" onClick={(e) => { e.preventDefault(); goTo("business-transfers"); }} style={{ color: "var(--gold-dark)", fontWeight: 600 }}>
                  See business transfers
                </a>{" "}
                for corporate options.
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: "1.4rem", marginBottom: "0.8rem" }}>Pickup anywhere in Belgium</h2>
              <p style={{ color: "var(--muted)", lineHeight: 1.75 }}>
                International trips can start from Brussels, Antwerp, Ghent, Bruges or wherever suits
                you — Brussels is simply where most of our clients happen to be based, not the only
                place we collect from.
              </p>
            </div>
          </div>

          <div style={{ marginTop: "3.5rem" }}>
            <h2 style={{ fontSize: "1.6rem", marginBottom: "1.5rem" }}>Frequently asked questions</h2>
            <div className="summary">
              {FAQS.map((f) => (
                <details key={f.q} className="summary-row" style={{ display: "block", cursor: "pointer" }}>
                  <summary style={{ fontWeight: 600, color: "var(--navy)" }}>{f.q}</summary>
                  <p style={{ marginTop: "0.6rem", color: "var(--muted)", lineHeight: 1.7 }}>{f.a}</p>
                </details>
              ))}
            </div>
          </div>

          <div style={{ marginTop: "3rem", textAlign: "center" }}>
            <a href="/book-taxi" className="btn btn-gold btn-lg" onClick={(e) => { e.preventDefault(); goTo("book-taxi"); }}>
              Book your international transfer
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}