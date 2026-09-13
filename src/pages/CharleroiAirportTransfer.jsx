import Seo, { SITE_URL } from "../components/Seo.jsx";
import { COMPANY, phoneLink } from "../config.js";

const FAQS = [
  {
    q: "Do you offer taxis to Charleroi Airport?",
    a: "Yes. We collect passengers from anywhere in Belgium and take them directly to Charleroi Airport (CRL), timed for check-in with low-cost carriers.",
  },
  {
    q: "Can I book a pickup from Charleroi Airport?",
    a: "Yes. Share your flight number when booking and we track it, adjusting your pickup time if the flight is early or delayed.",
  },
  {
    q: "How far is Charleroi Airport from Brussels?",
    a: "Charleroi Airport is roughly an hour from central Brussels by road, depending on traffic. We account for this when planning your pickup time.",
  },
  {
    q: "Can I combine a Charleroi Airport transfer with a longer trip?",
    a: "Yes. Many passengers connect a Charleroi Airport transfer with a longer trip elsewhere in Belgium or across the border — just let us know your full itinerary when booking.",
  },
];

export default function CharleroiAirportTransfer({ goTo }) {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL + "/" },
        { "@type": "ListItem", position: 2, name: "Airport Transfers", item: SITE_URL + "/airport-transfers" },
        { "@type": "ListItem", position: 3, name: "Charleroi Airport Transfer", item: SITE_URL + "/charleroi-airport-transfer" },
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
      serviceType: "Airport transfer",
      provider: { "@type": "Organization", name: "Rapid Transfer Service" },
      areaServed: { "@type": "Airport", name: "Charleroi Airport (CRL)" },
    },
  ];

  return (
    <main>
      <Seo
        title="Charleroi Airport Transfer | Taxi to & from CRL"
        description="Private taxi transfers to and from Charleroi Airport (CRL). Flight tracking, fixed prices and professional drivers, with pickups from anywhere in Belgium."
        path="/charleroi-airport-transfer"
        structuredData={structuredData}
      />

      <section className="section">
        <div className="container">
          <nav aria-label="Breadcrumb" style={{ marginBottom: "1.5rem", fontSize: "0.85rem", color: "var(--muted)" }}>
            <a href="/" onClick={(e) => { e.preventDefault(); goTo("home"); }} style={{ color: "var(--muted)" }}>Home</a>
            <span style={{ margin: "0 0.5rem" }}>/</span>
            <a href="/airport-transfers" onClick={(e) => { e.preventDefault(); goTo("airport-transfers"); }} style={{ color: "var(--muted)" }}>Airport Transfers</a>
            <span style={{ margin: "0 0.5rem" }}>/</span>
            <span style={{ color: "var(--navy)", fontWeight: 600 }}>Charleroi Airport</span>
          </nav>

          <p className="eyebrow">Charleroi Airport (CRL)</p>
          <h1 style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)", marginBottom: "1.2rem" }}>Charleroi Airport Transfer</h1>
          <p className="section-sub" style={{ maxWidth: "680px", marginBottom: "2.5rem" }}>
            Charleroi Airport (CRL) is a busy hub for low-cost carriers, often meaning early departures and
            tight connections. We build your pickup around your actual flight time, from anywhere in
            Belgium, with a fixed price agreed before you travel.
          </p>

          <div style={{ display: "flex", gap: "0.9rem", marginBottom: "3rem", flexWrap: "wrap" }}>
            <a href="/book-taxi" className="btn btn-gold btn-lg" onClick={(e) => { e.preventDefault(); goTo("book-taxi"); }}>
              Book your Charleroi transfer
            </a>
            <a href={phoneLink()} className="btn btn-outline btn-lg">Call {COMPANY.phoneDisplay}</a>
          </div>

          <div style={{ display: "grid", gap: "2.5rem" }}>
            <div>
              <h2 style={{ fontSize: "1.4rem", marginBottom: "0.8rem" }}>Transfers to Charleroi Airport</h2>
              <p style={{ color: "var(--muted)", lineHeight: 1.75 }}>
                Low-cost carriers at CRL often mean very early or very late flights. We factor your
                specific departure time into pickup planning, so you arrive with time to spare rather than
                rushing through check-in.
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: "1.4rem", marginBottom: "0.8rem" }}>Transfers from Charleroi Airport</h2>
              <p style={{ color: "var(--muted)", lineHeight: 1.75 }}>
                Send us your flight number and we track it. If your flight is delayed, your pickup shifts
                automatically — you won't be met with an empty arrivals hall or a driver who left early.
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: "1.4rem", marginBottom: "0.8rem" }}>Pickups and drop-offs</h2>
              <p style={{ color: "var(--muted)", lineHeight: 1.75 }}>
                Your driver waits in the arrivals area with pickup details confirmed by WhatsApp or phone
                ahead of landing, so locating each other at the terminal is straightforward.
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: "1.4rem", marginBottom: "0.8rem" }}>Vehicle options</h2>
              <p style={{ color: "var(--muted)", lineHeight: 1.75 }}>
                Standard Taxi covers most solo and small-group travel, Business Class suits those wanting
                extra comfort, and Van / Group carries up to 8 passengers — useful for families or groups
                travelling together on budget flights.
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: "1.4rem", marginBottom: "0.8rem" }}>Belgium-wide connections</h2>
              <p style={{ color: "var(--muted)", lineHeight: 1.75 }}>
                We connect Charleroi Airport with Brussels, Antwerp, Ghent, Bruges and other Belgian
                cities, as well as{" "}
                <a href="/international-transfers" onClick={(e) => { e.preventDefault(); goTo("international-transfers"); }} style={{ color: "var(--gold-dark)", fontWeight: 600 }}>
                  international destinations
                </a>{" "}
                if your journey continues past the airport.
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
              Book your Charleroi Airport transfer
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}