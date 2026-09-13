import Seo, { SITE_URL } from "../components/Seo.jsx";
import { COMPANY, phoneLink } from "../config.js";

const FAQS = [
  {
    q: "Do you offer monthly invoicing for companies?",
    a: "Yes. Companies with regular transport needs can set up monthly invoicing instead of paying per ride.",
  },
  {
    q: "Can you handle recurring bookings, such as daily airport runs?",
    a: "Yes. Tell us your regular schedule and we arrange recurring pickups so you don't need to rebook every time.",
  },
  {
    q: "Are your drivers suitable for client-facing pickups?",
    a: "Yes. Our Business Class drivers are discreet, punctual and presentable, suited to client and executive pickups.",
  },
  {
    q: "Can you transport event guests or teams?",
    a: "Yes. Our Van / Group vehicles handle team transport and event logistics for up to 8 passengers per vehicle, with multiple vehicles arranged for larger groups.",
  },
];

export default function BusinessTransfers({ goTo }) {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL + "/" },
        { "@type": "ListItem", position: 2, name: "Business Transfers", item: SITE_URL + "/business-transfers" },
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
      serviceType: "Corporate transport",
      provider: { "@type": "Organization", name: "Rapid Transfer Service" },
      areaServed: { "@type": "Country", name: "Belgium" },
    },
  ];

  return (
    <main>
      <Seo
        title="Business Transfers Belgium | Corporate Taxi Service"
        description="Professional business transfers across Belgium, including Brussels. Client pickups, airport transfers, event transport and monthly invoicing for companies."
        path="/business-transfers"
        structuredData={structuredData}
      />

      <section className="section">
        <div className="container">
          <nav aria-label="Breadcrumb" style={{ marginBottom: "1.5rem", fontSize: "0.85rem", color: "var(--muted)" }}>
            <a href="/" onClick={(e) => { e.preventDefault(); goTo("home"); }} style={{ color: "var(--muted)" }}>Home</a>
            <span style={{ margin: "0 0.5rem" }}>/</span>
            <span style={{ color: "var(--navy)", fontWeight: 600 }}>Business Transfers</span>
          </nav>

          <p className="eyebrow">Corporate travel across Belgium</p>
          <h1 style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)", marginBottom: "1.2rem" }}>Business Transfers</h1>
          <p className="section-sub" style={{ maxWidth: "680px", marginBottom: "2.5rem" }}>
            Punctual, professional transport for client pickups, meetings, events and airport runs,
            available across Belgium — with Brussels, as the country's business hub, among our busiest
            pickup points. Monthly invoicing is available so your company doesn't need to manage
            individual rides.
          </p>

          <div style={{ display: "flex", gap: "0.9rem", marginBottom: "3rem", flexWrap: "wrap" }}>
            <a href="/book-taxi" className="btn btn-gold btn-lg" onClick={(e) => { e.preventDefault(); goTo("book-taxi"); }}>
              Book a business transfer
            </a>
            <a href={phoneLink()} className="btn btn-outline btn-lg">Call {COMPANY.phoneDisplay}</a>
          </div>

          <div style={{ display: "grid", gap: "2.5rem" }}>
            <div>
              <h2 style={{ fontSize: "1.4rem", marginBottom: "0.8rem" }}>Client and executive pickups</h2>
              <p style={{ color: "var(--muted)", lineHeight: 1.75 }}>
                Discreet, presentable drivers who arrive on time, every time — important when a client
                or visiting executive's first impression is the ride from the airport or station.
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: "1.4rem", marginBottom: "0.8rem" }}>Airport transfers for business travel</h2>
              <p style={{ color: "var(--muted)", lineHeight: 1.75 }}>
                Frequent flyers get flight tracking and consistent pickups to and from{" "}
                <a href="/brussels-airport-transfer" onClick={(e) => { e.preventDefault(); goTo("brussels-airport-transfer"); }} style={{ color: "var(--gold-dark)", fontWeight: 600 }}>
                  Brussels Airport
                </a>{" "}
                or{" "}
                <a href="/charleroi-airport-transfer" onClick={(e) => { e.preventDefault(); goTo("charleroi-airport-transfer"); }} style={{ color: "var(--gold-dark)", fontWeight: 600 }}>
                  Charleroi Airport
                </a>.
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: "1.4rem", marginBottom: "0.8rem" }}>Meetings and events</h2>
              <p style={{ color: "var(--muted)", lineHeight: 1.75 }}>
                From a single client meeting to transporting a full team to a conference, we scale from
                one Standard Taxi to multiple Van / Group vehicles as needed.
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: "1.4rem", marginBottom: "0.8rem" }}>Monthly invoicing</h2>
              <p style={{ color: "var(--muted)", lineHeight: 1.75 }}>
                Companies with regular transport needs can move to monthly invoicing rather than paying
                per ride, simplifying expense management.
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: "1.4rem", marginBottom: "0.8rem" }}>International business travel</h2>
              <p style={{ color: "var(--muted)", lineHeight: 1.75 }}>
                For cross-border meetings, our{" "}
                <a href="/international-transfers" onClick={(e) => { e.preventDefault(); goTo("international-transfers"); }} style={{ color: "var(--gold-dark)", fontWeight: 600 }}>
                  international transfers
                </a>{" "}
                connect Belgium with France, the Netherlands, Luxembourg, Germany and Austria.
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
              Book your business transfer
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}