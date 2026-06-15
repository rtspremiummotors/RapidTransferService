import SectionHeading from "./SectionHeading.jsx";

// Edit these to match your most-requested trips.
const ROUTES = [
  { from: "Brussels", to: "Brussels Airport (BRU)", time: "± 25 min" },
  { from: "Brussels", to: "Charleroi Airport (CRL)", time: "± 55 min" },
  { from: "Brussels", to: "Amsterdam", time: "± 2h 30 min" },
  { from: "Brussels", to: "Paris", time: "± 2h 45 min" },
  { from: "Brussels", to: "Luxembourg City", time: "± 2h 15 min" },
  { from: "Brussels", to: "Cologne", time: "± 2h 00 min" },
  { from: "Antwerp", to: "Brussels Airport (BRU)", time: "± 45 min" },
  { from: "Ghent", to: "Brussels", time: "± 50 min" },
  { from: "Bruges", to: "Brussels Airport (BRU)", time: "± 1h 10 min" },
];

export default function PopularRoutes() {
  return (
    <section className="section" id="routes">
      <div className="container">
        <SectionHeading
          eyebrow="Popular routes"
          title="Trips we drive every day"
          sub="Fixed prices available on all routes — ask for your quote in seconds."
        />
        <div className="grid grid-3">
          {ROUTES.map((r) => (
            <a key={`${r.from}-${r.to}`} href="#fare" className="card route-card">
              <div className="route-points">
                <span className="route-point">
                  <span className="dot dot-gold" /> {r.from}
                </span>
                <span className="route-dash" aria-hidden="true" />
                <span className="route-point">
                  <span className="dot dot-navy" /> {r.to}
                </span>
              </div>
              <div className="route-foot">
                <span className="route-time">{r.time}</span>
                <span className="route-link">Get price →</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}