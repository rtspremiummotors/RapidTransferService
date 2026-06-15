import SectionHeading from "./SectionHeading.jsx";

const FLEET = [
  {
    name: "Standard Taxi",
    tag: "Most popular",
    description: "Comfortable and reliable for everyday rides. Perfect for airport runs, city trips and everything in between.",
    capacity: "4 passengers",
    luggage: "2 large suitcases",
    perks: ["City to city rides", "Airport transfers", "Card and cash payment", "Child seat on request"],
    icon: TaxiIcon,
    page: "book-taxi",
  },
  {
    name: "Business Class",
    tag: "Premium",
    description: "Executive vehicles for clients who expect more. Discreet, spotless and always on time.",
    capacity: "3 passengers",
    luggage: "2 large suitcases",
    perks: ["Executive vehicles", "Water on board", "Discreet drivers", "Monthly invoicing"],
    icon: BusinessIcon,
    page: "book-taxi",
  },
  {
    name: "Van / Group",
    tag: "Groups",
    description: "Spacious vans for families, teams and large groups. Everyone travels together, no one gets left behind.",
    capacity: "8 passengers",
    luggage: "8 large suitcases",
    perks: ["Families and teams", "Group airport transfers", "International group rides", "Extra luggage space"],
    icon: VanIcon,
    page: "book-taxi",
  },
  {
    name: "Parcel Delivery",
    tag: "Courier",
    description: "Same-day collection and delivery for anything from a letter to a large box, across Belgium and beyond.",
    capacity: "Any size",
    luggage: "Envelope to large cargo",
    perks: ["Same-day delivery", "Belgium and Europe", "No depot stops", "Delivery confirmation"],
    icon: ParcelIcon,
    page: "book-parcel",
  },
];

export default function Fleet({ onBook }) {
  return (
    <section className="section section-gray" id="fleet">
      <div className="container">
        <SectionHeading
          eyebrow="Our vehicles"
          title="The right vehicle for every trip"
          sub="Every vehicle is cleaned daily, fully insured and driven by a licensed professional."
        />
        <div className="fleet-grid">
          {FLEET.map((f) => {
            const Icon = f.icon;
            return (
              <article key={f.name} className="fleet-card-new">
                <div className="fcn-head">
                  <div className="fcn-icon">
                    <Icon />
                  </div>
                  <span className="fcn-tag">{f.tag}</span>
                </div>
                <h3>{f.name}</h3>
                <p className="fcn-desc">{f.description}</p>
                <div className="fcn-meta">
                  <div className="fcn-meta-item">
                    <PersonIcon />
                    <span>{f.capacity}</span>
                  </div>
                  <div className="fcn-meta-item">
                    <LuggageIcon />
                    <span>{f.luggage}</span>
                  </div>
                </div>
                <ul className="fcn-perks">
                  {f.perks.map((p) => (
                    <li key={p}>
                      <span className="fcn-check">✓</span> {p}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  className="fcn-btn"
                  onClick={() => onBook(f.page)}
                >
                  {f.page === "book-parcel" ? "Send a parcel" : "Book now"}
                  <span>→</span>
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const ico = {
  width: 22, height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

function TaxiIcon() {
  return <svg {...ico}><path d="M5 11l1.5-4.5A2 2 0 0 1 8.4 5h7.2a2 2 0 0 1 1.9 1.5L19 11"/><path d="M4 11h16a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-1m-14 0H4a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1Z"/><circle cx="7.5" cy="17.5" r="1.5"/><circle cx="16.5" cy="17.5" r="1.5"/></svg>;
}

function BusinessIcon() {
  return <svg {...ico}><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2M12 12v.01M8 12h8"/></svg>;
}

function VanIcon() {
  return <svg {...ico}><path d="M2.5 7.5h12v9h-12zM14.5 10h4l2.5 3v3.5h-6.5"/><circle cx="6.5" cy="17.5" r="1.5"/><circle cx="17" cy="17.5" r="1.5"/></svg>;
}

function ParcelIcon() {
  return <svg {...ico}><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5M12 22V12"/></svg>;
}

function PersonIcon() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
}

function LuggageIcon() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="6" y="7" width="12" height="14" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M12 12v4M10 14h4"/></svg>;
}