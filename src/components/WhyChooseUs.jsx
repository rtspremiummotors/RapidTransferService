import SectionHeading from "./SectionHeading.jsx";

const REASONS = [
  {
    icon: ClockIcon,
    title: "Fast Response",
    text: "We confirm your booking within minutes and arrive on time, every time. No waiting, no uncertainty.",
  },
  {
    icon: GlobeIcon,
    title: "Cross-Border Expertise",
    text: "Over 9 years driving across Belgium, France, the Netherlands, Luxembourg, Germany and the UK. We know every route.",
  },
  {
    icon: ShieldIcon,
    title: "Safe and Reliable",
    text: "Licensed drivers, fully insured vehicles and a clean record. Your safety is not a feature — it is our standard.",
  },
  {
    icon: TagIcon,
    title: "Fixed Prices Always",
    text: "You receive your price before you confirm. No meters running in traffic, no surprises at the end of the ride.",
  },
  {
    icon: StarIcon,
    title: "Professional Drivers",
    text: "Presentable, discreet and experienced. Our drivers represent your journey from the first moment to the last.",
  },
  {
    icon: SunIcon,
    title: "Available 24/7",
    text: "Early morning flight, late night arrival or a same-day urgent delivery. We are always available when you need us.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="section wcu-section" id="why-us">
      <div className="container">
        <div className="wcu-inner">
          <div className="wcu-left">
            <SectionHeading
              eyebrow="Why choose us"
              title="The service people come back to"
              sub="We have been trusted by hundreds of customers across Belgium and Europe for over 9 years."
            />
            <div className="wcu-numbers">
              <div className="wcu-number">
                <span className="wcu-num">9+</span>
                <span className="wcu-num-label">Years of experience</span>
              </div>
              <div className="wcu-number">
                <span className="wcu-num">500+</span>
                <span className="wcu-num-label">Customers served</span>
              </div>
              <div className="wcu-number">
                <span className="wcu-num">5</span>
                <span className="wcu-num-label">Countries covered</span>
              </div>
            </div>
          </div>

          <div className="wcu-right">
            {REASONS.map((r) => {
              const Icon = r.icon;
              return (
                <div key={r.title} className="wcu-card">
                  <div className="wcu-icon">
                    <Icon />
                  </div>
                  <div>
                    <h3>{r.title}</h3>
                    <p>{r.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

const ico = {
  width: 20, height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

function ClockIcon() { return <svg {...ico}><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>; }
function GlobeIcon() { return <svg {...ico}><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>; }
function ShieldIcon() { return <svg {...ico}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/></svg>; }
function TagIcon() { return <svg {...ico}><path d="M12 2H2v10l9.29 9.29a1 1 0 0 0 1.41 0l7.3-7.3a1 1 0 0 0 0-1.41Z"/><path d="M7 7h.01"/></svg>; }
function StarIcon() { return <svg {...ico}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>; }
function SunIcon() { return <svg {...ico}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>; }