import SectionHeading from "./SectionHeading.jsx";

const STEPS = [
  {
    num: "01",
    title: "Book in seconds",
    text: "Choose your service, fill in your pickup and destination, and confirm via WhatsApp or phone. No account needed.",
    icon: BookIcon,
  },
  {
    num: "02",
    title: "We confirm instantly",
    text: "You get a confirmation with your driver details and a fixed price upfront. No surprises, no hidden fees.",
    icon: CheckIcon,
  },
  {
    num: "03",
    title: "We arrive on time",
    text: "Your driver shows up at the agreed time, every time. Sit back and enjoy the ride.",
    icon: CarIcon,
  },
];

const STATS = [
  { num: "24/7", label: "Always available" },
  { num: "5+", label: "Countries served" },
  { num: "500+", label: "Happy customers" },
  { num: "100%", label: "Fixed price guarantee" },
];

export default function HowItWorks() {
  return (
    <section className="section hiw-section" id="how-it-works">
      <div className="container">
        <SectionHeading
          eyebrow="Simple process"
          title="How it works"
          sub="From booking to arrival in three simple steps."
        />

        {/* Steps */}
        <div className="hiw-steps">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.num} className="hiw-step">
                <div className="hiw-step-icon">
                  <Icon />
                </div>
                {i < STEPS.length - 1 && <div className="hiw-connector" aria-hidden="true" />}
                <div className="hiw-step-num">{s.num}</div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            );
          })}
        </div>

        {/* Stats bar */}
        <div className="hiw-stats">
          {STATS.map((s) => (
            <div key={s.label} className="hiw-stat">
              <span className="hiw-stat-num">{s.num}</span>
              <span className="hiw-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const ico = {
  width: 24, height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

function BookIcon() {
  return <svg {...ico}><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>;
}

function CheckIcon() {
  return <svg {...ico}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>;
}

function CarIcon() {
  return <svg {...ico}><path d="M5 11l1.5-4.5A2 2 0 0 1 8.4 5h7.2a2 2 0 0 1 1.9 1.5L19 11"/><path d="M4 11h16a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-1m-14 0H4a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1Z"/><circle cx="7.5" cy="17.5" r="1.5"/><circle cx="16.5" cy="17.5" r="1.5"/></svg>;
}