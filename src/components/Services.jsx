import SectionHeading from "./SectionHeading.jsx";

const SERVICES = [
  {
    icon: TaxiIcon,
    title: "City to City Taxi",
    tag: "Most popular",
    text: "Enjoy door-to-door comfort between any two cities in Belgium. Skip the stations, travel directly with your private driver or book a full-day tour to visit multiple destinations in one trip.",
    page: "book-taxi",
  },
  {
    icon: PlaneIcon,
    title: "Airport Transfers",
    tag: "Fixed rate",
    text: "Stress-free rides to Brussels (BRU), Charleroi (CRL), Schiphol, Paris CDG and more. We track your flight in real time and adjust if it is delayed.",
    page: "book-taxi",
  },
  {
    icon: GlobeIcon,
    title: "International Rides",
    tag: "Cross-border",
    text: "France, Netherlands, Luxembourg, Germany, UK. We drive you across borders with no connections, no rental cars and no stress. One ride, door to door.",
    page: "book-taxi",
  },
  {
    icon: BriefcaseIcon,
    title: "Business Travel",
    tag: "Corporate",
    text: "Punctual, presentable and discreet. Ideal for client pickups, meetings and events. Monthly invoicing available for companies.",
    page: "book-taxi",
  },
  {
    icon: BoxIcon,
    title: "Same-Day Parcel",
    tag: "Today",
    text: "Got something urgent? We collect within the hour and deliver the same day, anywhere in Belgium, any size, from a letter to a large box.",
    page: "book-parcel",
  },
  {
    icon: RocketIcon,
    title: "International Parcel",
    tag: "Europe",
    text: "Direct delivery to France, Netherlands, Luxembourg, Germany and the UK. No depot, no middleman, straight from sender to receiver.",
    page: "book-parcel",
  },
];

export default function Services({ onBook }) {
  return (
    <section className="section section-services" id="services">
      <div className="container">
        <SectionHeading
          eyebrow="What we offer"
          title="One number for every journey"
          sub="Taxi or parcel, handled fast, professionally, at a price you know upfront."
        />
        <div className="services-grid">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <article key={s.title} className="svc-card">
                <div className="svc-top">
                  <div className="svc-num">0{i + 1}</div>
                  <span className="svc-tag">{s.tag}</span>
                </div>
                <div className="svc-icon-wrap">
                  <Icon />
                </div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <button
                  type="button"
                  className="svc-btn"
                  onClick={() => onBook(s.page)}
                >
                  {s.page === "book-parcel" ? "Send a parcel" : "Book a ride"}
                  <span className="svc-arrow">→</span>
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* --- Line icons --- */
const ico = {
  width: 28, height: 28,
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

function PlaneIcon() {
  return <svg {...ico}><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21 4 19.5 2.5S18 2 16.5 3.5L13 7 4.8 5.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>;
}

function GlobeIcon() {
  return <svg {...ico}><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>;
}

function BriefcaseIcon() {
  return <svg {...ico}><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2M12 12v.01M8 12h8"/></svg>;
}

function BoxIcon() {
  return <svg {...ico}><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5M12 22V12"/></svg>;
}

function RocketIcon() {
  return <svg {...ico}><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M15 12v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>;
}