import Seo, { SITE_URL } from "../components/Seo.jsx";
import { COMPANY, phoneLink } from "../config.js";

const FAQS = [
  {
    q: "How do I book a taxi to Brussels Airport?",
    a: "Book online, by phone, or on WhatsApp with your pickup address, flight time and destination terminal. We confirm a fixed price before your ride.",
  },
  {
    q: "Can I book a transfer from Brussels Airport?",
    a: "Yes. Give us your flight number and we track it, so your driver adjusts pickup time automatically if your flight is delayed.",
  },
  {
    q: "How early should I book my airport transfer?",
    a: "We can often accommodate short-notice bookings, but booking a few hours ahead — or the day before for early flights — guarantees your preferred vehicle and time.",
  },
  {
    q: "Which vehicles are available for airport transfers?",
    a: "Standard Taxi for up to 4 passengers, Business Class for a more comfortable and discreet ride, and Van / Group for up to 8 passengers with extra luggage space.",
  },
];

export default function BrusselsAirportTransfer({ goTo }) {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL + "/" },
        { "@type": "ListItem", position: 2, name: "Airport Transfers", item: SITE_URL + "/airport-transfers" },
        { "@type": "ListItem", position: 3, name: "Brussels Airport Transfer", item: SITE_URL + "/brussels-airport-transfer" },
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
      areaServed: { "@type": "Airport", name: "Brussels Airport (BRU)" },
    },
  ];

  return (
    <main>
      <Seo
        title="Brussels Airport Transfer | Taxi to & from BRU"
        description="Private taxi transfers to and from Brussels Airport (BRU). Flight tracking, fixed prices and professional drivers. Book online or by phone, available 24/7."
        path="/brussels-airport-transfer"
        structuredData={structuredData}
      />

      <section className="section">
        <div className="container">
          <nav aria-label="Breadcrumb" style={{ marginBottom: "1.5rem", fontSize: "0.85rem", color: "var(--muted)" }}>
            <a href="/" onClick={(e) => { e.preventDefault(); goTo("home"); }} style={{ color: "var(--muted)" }}>Home</a>
            <span style={{ margin: "0 0.5rem" }}>/</span>
            <a href="/airport-transfers" onClick={(e) => { e.preventDefault(); goTo("airport-transfers"); }} style={{ color: "var(--muted)" }}>Airport Transfers</a>
            <span style={{ margin: "0 0.5rem" }}>/</span>
            <span style={{ color: "var(--navy)", fontWeight: 600 }}>Brussels Airport</span>
          </nav>

          <p className="eyebrow">Brussels Airport (BRU)</p>
          <h1 style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)", marginBottom: "1.2rem" }}>Brussels Airport Transfer</h1>
          <p className="section-sub" style={{ maxWidth: "680px", marginBottom: "2.5rem" }}>
            Reliable taxi transfers to and from Brussels Airport, with your flight tracked so pickup times
            adjust automatically if your flight is early or delayed. Fixed price agreed before you travel.
          </p>

          <div style={{ display: "flex", gap: "0.9rem", marginBottom: "3rem", flexWrap: "wrap" }}>
            <a href="/book-taxi" className="btn btn-gold btn-lg" onClick={(e) => { e.preventDefault(); goTo("book-taxi"); }}>
              Book your airport transfer
            </a>
            <a href={phoneLink()} className="btn btn-outline btn-lg">Call {COMPANY.phoneDisplay}</a>
          </div>

          <div style={{ display: "grid", gap: "2.5rem" }}>
            <div>
              <h2 style={{ fontSize: "1.4rem", marginBottom: "0.8rem" }}>Transfers to Brussels Airport</h2>
              <p style={{ color: "var(--muted)", lineHeight: 1.75 }}>
                Tell us your pickup address and flight time when you book. We build in enough buffer for
                check-in and security, and your driver takes the most reliable route to the terminal —
                so you're not watching the clock in traffic.
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: "1.4rem", marginBottom: "0.8rem" }}>Transfers from Brussels Airport</h2>
              <p style={{ color: "var(--muted)", lineHeight: 1.75 }}>
                Give us your flight number and we track it. If your flight lands early or is delayed, your
                pickup time adjusts automatically — no extra charge, no need to call and rearrange.
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: "1.4rem", marginBottom: "0.8rem" }}>Meeting point and pickup</h2>
              <p style={{ color: "var(--muted)", lineHeight: 1.75 }}>
                Your driver waits at the arrivals area with clear contact details sent ahead of time by
                WhatsApp or phone, so finding each other is straightforward even at a busy terminal.
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: "1.4rem", marginBottom: "0.8rem" }}>Luggage and vehicle options</h2>
              <p style={{ color: "var(--muted)", lineHeight: 1.75 }}>
                Standard Taxi comfortably carries 4 passengers with luggage, Business Class suits
                travellers who want extra comfort after a flight, and our Van / Group option handles
                larger groups or extra bags without a second trip.
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: "1.4rem", marginBottom: "0.8rem" }}>Business travel through Brussels Airport</h2>
              <p style={{ color: "var(--muted)", lineHeight: 1.75 }}>
                Frequent flyers and companies with regular staff travel can set up{" "}
                <a href="/business-transfers" onClick={(e) => { e.preventDefault(); goTo("business-transfers"); }} style={{ color: "var(--gold-dark)", fontWeight: 600 }}>
                  business transfers
                </a>{" "}
                with monthly invoicing, so airport pickups and drop-offs are one less thing to manage
                individually.
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: "1.4rem", marginBottom: "0.8rem" }}>Connecting onward</h2>
              <p style={{ color: "var(--muted)", lineHeight: 1.75 }}>
                Landing in Brussels but heading elsewhere? We also connect Brussels Airport directly to
                other Belgian cities and{" "}
                <a href="/international-transfers" onClick={(e) => { e.preventDefault(); goTo("international-transfers"); }} style={{ color: "var(--gold-dark)", fontWeight: 600 }}>
                  international destinations
                </a>{" "}
                including France, the Netherlands, Luxembourg and Germany, so you can skip a second
                connection.
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
              Book your Brussels Airport transfer
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}