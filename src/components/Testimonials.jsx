import SectionHeading from "./SectionHeading.jsx";

// Placeholder testimonials — replace with real customer reviews.
const TESTIMONIALS = [
  {
    quote:
      "Booked a ride from Brussels to Paris at 5 a.m. The driver was on time, the car was spotless and we arrived relaxed. Will never take the train again.",
    name: "Mariam K.",
    detail: "Brussels → Paris",
  },
  {
    quote:
      "Our team needed airport transfers for 6 people at different times. Rapid Transfer handled every single one without a hitch. Reliable and professional.",
    name: "Thomas D.",
    detail: "Corporate account",
  },
  {
    quote:
      "I had an urgent contract that had to reach Amsterdam the same day. They picked it up within the hour and delivered it before close of business. Incredible service.",
    name: "Karim B.",
    detail: "Same-day courier — Brussels → Amsterdam",
  },
];

export default function Testimonials() {
  return (
    <section className="section section-gray" id="testimonials">
      <div className="container">
        <SectionHeading
          eyebrow="Testimonials"
          title="What our customers say"
        />
        <div className="grid grid-3">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="card testimonial-card">
              <div className="stars" aria-label="5 out of 5 stars">★★★★★</div>
              <blockquote>"{t.quote}"</blockquote>
              <figcaption>
                <strong>{t.name}</strong>
                <span>{t.detail}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}