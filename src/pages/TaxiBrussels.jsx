import Seo, { SITE_URL } from "../components/Seo.jsx";
import { COMPANY, phoneLink, whatsappLink } from "../config.js";

const FAQS = [
  {
    q: "How do I book a taxi in Brussels?",
    a: "You can book directly on our website, by phone, or on WhatsApp. Tell us your pickup location, destination, and preferred time, and we confirm your ride within minutes.",
  },
  {
    q: "Is the price fixed before the ride?",
    a: "Yes. You receive your price before you confirm the booking, so there are no surprises when you arrive.",
  },
  {
    q: "Can I book a taxi for a group?",
    a: "Yes. Our Van / Group vehicles carry up to 8 passengers, and we can arrange multiple vehicles for larger groups.",
  },
  {
    q: "Do you drive outside Brussels?",
    a: "Yes. Alongside city rides within Brussels, we cover journeys across Belgium and international transfers to France, the Netherlands, Luxembourg, Germany and the United Kingdom.",
  },
];

export default function TaxiBrussels({ goTo }) {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL + "/" },
        { "@type": "ListItem", position: 2, name: "Taxi Brussels", item: SITE_URL + "/taxi-brussels" },
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
      serviceType: "Taxi service",
      provider: { "@type": "Organization", name: "Rapid Transfer Service" },
      areaServed: { "@type": "City", name: "Brussels" },
    },
  ];

  return (
    <main>
      <Seo
        title="Taxi Brussels | Private Taxi & Transfers | Rapid Transfer Service"
        description="Book a private taxi in Brussels with fixed prices and professional drivers. City transfers, airport rides, business travel and international trips, available 24/7."
        path="/taxi-brussels"
        structuredData={structuredData}
      />

      <section className="section">
        <div className="container">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" style={{ marginBottom: "1.5rem", fontSize: "0.85rem", color: "var(--muted)" }}>
            <a href="/" onClick={(e) => { e.preventDefault(); goTo("home"); }} style={{ color: "var(--muted)" }}>Home</a>
            <span style={{ margin: "0 0.5rem" }}>/</span>
            <span style={{ color: "var(--navy)", fontWeight: 600 }}>Taxi Brussels</span>
          </nav>

          <p className="eyebrow">Brussels</p>
          <h1 style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)", marginBottom: "1.2rem" }}>Taxi Brussels</h1>
          <p className="section-sub" style={{ maxWidth: "680px", marginBottom: "2.5rem" }}>
            Rapid Transfer Service provides private taxi rides across Brussels, from short city hops to
            longer trips out of the capital. Every ride comes with a fixed price agreed before you travel,
            a professional driver, and a clean, comfortable vehicle.
          </p>

          <div style={{ display: "flex", gap: "0.9rem", marginBottom: "3rem", flexWrap: "wrap" }}>
            <a href="/book-taxi" className="btn btn-gold btn-lg" onClick={(e) => { e.preventDefault(); goTo("book-taxi"); }}>
              Book a taxi in Brussels
            </a>
            <a href={phoneLink()} className="btn btn-outline btn-lg">Call {COMPANY.phoneDisplay}</a>
          </div>

          <div style={{ display: "grid", gap: "2.5rem" }}>
            <div>
              <h2 style={{ fontSize: "1.4rem", marginBottom: "0.8rem" }}>City transfers in Brussels</h2>
              <p style={{ color: "var(--muted)", lineHeight: 1.75 }}>
                Whether you're heading across town for a meeting, to the station, or to a restaurant in the
                evening, our drivers know Brussels well and take the most direct route. No waiting for a
                metered taxi on the street — you book ahead and your driver is there on time.
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: "1.4rem", marginBottom: "0.8rem" }}>Airport transfers from Brussels</h2>
              <p style={{ color: "var(--muted)", lineHeight: 1.75 }}>
                We take Brussels residents and visitors to and from Brussels Airport (BRU) and Charleroi
                Airport (CRL), with your flight details noted so we track delays where relevant.{" "}
                <a href="/brussels-airport-transfer" onClick={(e) => { e.preventDefault(); goTo("brussels-airport-transfer"); }} style={{ color: "var(--gold-dark)", fontWeight: 600 }}>
                  See our Brussels Airport transfer page
                </a>{" "}
                for full details.
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: "1.4rem", marginBottom: "0.8rem" }}>Business travel</h2>
              <p style={{ color: "var(--muted)", lineHeight: 1.75 }}>
                For client pickups, meetings and corporate events, our Business Class vehicles and
                monthly invoicing option make it easy for Brussels-based companies to manage regular
                transport.{" "}
                <a href="/business-transfers" onClick={(e) => { e.preventDefault(); goTo("business-transfers"); }} style={{ color: "var(--gold-dark)", fontWeight: 600 }}>
                  Learn more about business transfers
                </a>.
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: "1.4rem", marginBottom: "0.8rem" }}>Long-distance and international travel</h2>
              <p style={{ color: "var(--muted)", lineHeight: 1.75 }}>
                Beyond the city, we drive Brussels passengers to other Belgian cities and across the
                border to France, the Netherlands, Luxembourg, Germany and the United Kingdom.{" "}
                <a href="/international-transfers" onClick={(e) => { e.preventDefault(); goTo("international-transfers"); }} style={{ color: "var(--gold-dark)", fontWeight: 600 }}>
                  View international transfers
                </a>.
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: "1.4rem", marginBottom: "0.8rem" }}>Vehicle options</h2>
              <p style={{ color: "var(--muted)", lineHeight: 1.75 }}>
                Choose Standard Taxi for everyday rides, Business Class for a more discreet and
                comfortable trip, or Van / Group for up to 8 passengers with extra luggage space.
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: "1.4rem", marginBottom: "0.8rem" }}>How booking works</h2>
              <p style={{ color: "var(--muted)", lineHeight: 1.75 }}>
                Book online in under a minute, or call or message us on WhatsApp. We confirm your ride
                with a fixed price, and your driver arrives at the agreed time.
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: "1.4rem", marginBottom: "0.8rem" }}>Service area</h2>
              <p style={{ color: "var(--muted)", lineHeight: 1.75 }}>
                We serve all of Brussels and its surrounding communes, with connections across Belgium
                and neighbouring countries. Rapid Transfer Service is a service-area business — we come
                to you rather than operating from a public taxi rank.
              </p>
            </div>
          </div>

          {/* FAQ */}
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
              Book your Brussels taxi now
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}