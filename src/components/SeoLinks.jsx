// A small, unobtrusive internal-linking row for SEO and crawl discovery.
// Reuses existing utility classes only — no new CSS required.
const LINKS = [
  { to: "/taxi-brussels", label: "Taxi in Brussels" },
  { to: "/brussels-airport-transfer", label: "Brussels Airport transfers" },
  { to: "/charleroi-airport-transfer", label: "Charleroi Airport transfers" },
  { to: "/airport-transfers", label: "Airport transfers Belgium" },
  { to: "/international-transfers", label: "International transfers" },
  { to: "/business-transfers", label: "Business transfers" },
];

export default function SeoLinks() {
  return (
    <div className="container" style={{ padding: "2.5rem 0", borderTop: "1px solid var(--line)" }}>
      <p className="eyebrow" style={{ marginBottom: "1rem" }}>Explore our services</p>
      <nav aria-label="Related services" style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem 1.8rem" }}>
        {LINKS.map((l) => (
          <a key={l.to} href={l.to} className="route-link">{l.label}</a>
        ))}
      </nav>
    </div>
  );
}