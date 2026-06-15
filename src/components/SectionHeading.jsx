// Small reusable heading block used by every section.
export default function SectionHeading({ eyebrow, title, sub, light = false }) {
  return (
    <div className={`section-heading ${light ? "section-heading-light" : ""}`}>
      {eyebrow && (
        <p className="eyebrow">
          <span className="dot dot-gold" /> {eyebrow}
        </p>
      )}
      <h2>{title}</h2>
      {sub && <p className="section-sub">{sub}</p>}
    </div>
  );
}
