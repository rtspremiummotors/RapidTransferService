import { useState } from "react";
import { COMPANY, phoneLink, whatsappLink } from "../config.js";
import { WhatsAppIcon } from "../components/Hero.jsx";
import AddressInput from "../components/AddressInput.jsx";
import DatePicker from "../components/DatePicker.jsx";
import TimePicker from "../components/TimePicker.jsx";

const SIZES = [
  { id: "envelope", label: "Envelope / Document", desc: "A4 size, under 0.5 kg", icon: "📄" },
  { id: "small", label: "Small parcel", desc: "Shoebox size, under 5 kg", icon: "📦" },
  { id: "medium", label: "Medium parcel", desc: "Moving box, under 20 kg", icon: "🗃️" },
  { id: "large", label: "Large / Heavy", desc: "Multiple items or heavy cargo", icon: "🏗️" },
];

const STEPS = ["Parcel details", "Pickup & delivery", "Confirm"];

export default function BookParcel({ onBack }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    size: "", weight: "", contents: "", fragile: false, value: "",
    pickup: "", destination: "", date: "", time: "",
    recipientName: "", recipientPhone: "",
    name: "", phone: "", email: "", notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const set = (f) => (v) => setForm((p) => ({ ...p, [f]: typeof v === "object" && v.target ? v.target.type === "checkbox" ? v.target.checked : v.target.value : v }));

  const selectedSize = SIZES.find(s => s.id === form.size);
  const canNext0 = form.size && form.contents.trim();
  const canNext1 = form.pickup.trim() && form.destination.trim() && form.date && form.time && form.name.trim() && form.phone.trim();

  const whatsappText =
`Hi! I'd like to send a parcel with Rapid Transfer Service.

📦 Parcel details
• Size: ${selectedSize?.label}
• Weight: ${form.weight || "not specified"}
• Contents: ${form.contents}
${form.fragile ? "• ⚠️ Fragile — handle with care" : ""}
${form.value ? `• Declared value: €${form.value}` : ""}

📍 Pickup & delivery
• From: ${form.pickup}
• To: ${form.destination}
• Date: ${form.date} at ${form.time}
${form.recipientName ? `• Recipient: ${form.recipientName}` : ""}
${form.recipientPhone ? `• Recipient phone: ${form.recipientPhone}` : ""}

👤 Sender details
• Name: ${form.name}
• Phone: ${form.phone}
${form.email ? `• Email: ${form.email}` : ""}
${form.notes ? `• Notes: ${form.notes}` : ""}`;

  return (
    <main className="book-page">
      <div className="container book-container">
        <button className="back-btn" onClick={step === 0 ? onBack : () => setStep(s => s - 1)} type="button">
          ← {step === 0 ? "Back to home" : "Previous step"}
        </button>

        <div className="book-header">
          <div className="book-header-icon">📦</div>
          <div>
            <h1>Send a Parcel</h1>
            <p>Same-day delivery across Belgium and Europe.</p>
          </div>
        </div>

        <div className="steps">
          {STEPS.map((s, i) => (
            <div key={s} className={`step ${i === step ? "step-active" : ""} ${i < step ? "step-done" : ""}`}>
              <span className="step-num">{i < step ? "✓" : i + 1}</span>
              <span className="step-label">{s}</span>
            </div>
          ))}
        </div>

        <div className="book-card">
          {submitted ? (
            <div className="book-confirmed">
              <div className="confirmed-icon">✓</div>
              <h2>Parcel request sent!</h2>
              <p>We will contact you shortly to confirm pickup and price.</p>
              <div className="summary">
                {[
                  { label: "Size", value: selectedSize?.label },
                  { label: "Contents", value: form.contents },
                  { label: "From", value: form.pickup },
                  { label: "To", value: form.destination },
                  { label: "Date", value: `${form.date} at ${form.time}` },
                  { label: "Name", value: form.name },
                ].map(r => (
                  <div key={r.label} className="summary-row">
                    <span className="summary-label">{r.label}</span>
                    <span className="summary-value">{r.value}</span>
                  </div>
                ))}
              </div>
              <div className="confirm-btns">
                <a href={`https://wa.me/${COMPANY.whatsappNumber}?text=${encodeURIComponent(whatsappText)}`} className="btn btn-whatsapp" target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon /> Open WhatsApp
                </a>
                <a href={`tel:${COMPANY.phoneTel}`} className="btn btn-gold">📞 {COMPANY.phoneDisplay}</a>
              </div>
            </div>
          ) : (
            <>
              {/* STEP 0 — Parcel details */}
              {step === 0 && (
                <div className="book-step">
                  <h2>What are you sending?</h2>
                  <div className="size-grid">
                    {SIZES.map(s => (
                      <button
                        key={s.id}
                        type="button"
                        className={`size-card ${form.size === s.id ? "size-card-active" : ""}`}
                        onClick={() => setForm(p => ({ ...p, size: s.id }))}
                      >
                        <span className="size-icon">{s.icon}</span>
                        <span className="size-name">{s.label}</span>
                        <span className="size-desc">{s.desc}</span>
                      </button>
                    ))}
                  </div>
                  <div className="field-grid" style={{ marginTop: "1.5rem" }}>
                    <label className="field">
                      <span className="field-label">Approximate weight</span>
                      <input type="text" placeholder="e.g. 2 kg" value={form.weight} onChange={set("weight")} />
                    </label>
                    <label className="field">
                      <span className="field-label">Declared value <span className="field-optional">(optional)</span></span>
                      <input type="text" placeholder="e.g. €150" value={form.value} onChange={set("value")} />
                    </label>
                    <label className="field field-full">
                      <span className="field-label">Contents description</span>
                      <input type="text" placeholder="e.g. legal documents, clothing, electronics" value={form.contents} onChange={set("contents")} />
                    </label>
                    <label className="field field-full toggle-field">
                      <input type="checkbox" checked={form.fragile} onChange={set("fragile")} />
                      <span>⚠️ Fragile — handle with care</span>
                    </label>
                  </div>
                  <button className="btn btn-gold btn-next" disabled={!canNext0} onClick={() => setStep(1)}>Continue →</button>
                </div>
              )}

              {/* STEP 1 — Pickup & delivery */}
              {step === 1 && (
                <div className="book-step">
                  <h2>Pickup &amp; delivery</h2>
                  <div className="field-grid">
                    <AddressInput label="Pickup address" placeholder="Full address including city" value={form.pickup} onChange={set("pickup")} dotColor="gold" />
                    <AddressInput label="Delivery address" placeholder="Full address including city" value={form.destination} onChange={set("destination")} dotColor="navy" />
                    <DatePicker label="Pickup date" value={form.date} onChange={set("date")} min={new Date().toISOString().split("T")[0]} />
                    <TimePicker label="Pickup time" value={form.time} onChange={set("time")} />
                    <label className="field">
                      <span className="field-label">Recipient name <span className="field-optional">(optional)</span></span>
                      <input type="text" placeholder="Who receives the parcel?" value={form.recipientName} onChange={set("recipientName")} />
                    </label>
                    <label className="field">
                      <span className="field-label">Recipient phone <span className="field-optional">(optional)</span></span>
                      <input type="tel" placeholder="+32 ..." value={form.recipientPhone} onChange={set("recipientPhone")} />
                    </label>
                    <label className="field">
                      <span className="field-label">Your name</span>
                      <input type="text" placeholder="First and last name" value={form.name} onChange={set("name")} />
                    </label>
                    <label className="field">
                      <span className="field-label">Your phone</span>
                      <input type="tel" placeholder="+32 ..." value={form.phone} onChange={set("phone")} />
                    </label>
                    <label className="field field-full">
                      <span className="field-label">Email <span className="field-optional">(optional)</span></span>
                      <input type="email" placeholder="your@email.com" value={form.email} onChange={set("email")} />
                    </label>
                    <label className="field field-full">
                      <span className="field-label">Extra notes <span className="field-optional">(optional)</span></span>
                      <textarea rows="3" placeholder="Access code, floor number, special instructions..." value={form.notes} onChange={set("notes")} />
                    </label>
                  </div>
                  <button className="btn btn-gold btn-next" disabled={!canNext1} onClick={() => setStep(2)}>Review request →</button>
                </div>
              )}

              {/* STEP 2 — Review */}
              {step === 2 && (
                <div className="book-step">
                  <h2>Review your request</h2>
                  <div className="summary">
                    {[
                      { label: "Size", value: `${selectedSize?.icon} ${selectedSize?.label}` },
                      { label: "Weight", value: form.weight || "Not specified" },
                      { label: "Contents", value: form.contents },
                      ...(form.fragile ? [{ label: "Handling", value: "⚠️ Fragile" }] : []),
                      { label: "From", value: form.pickup },
                      { label: "To", value: form.destination },
                      { label: "Pickup", value: `${form.date} at ${form.time}` },
                      ...(form.recipientName ? [{ label: "Recipient", value: form.recipientName }] : []),
                      { label: "Sender", value: form.name },
                      { label: "Phone", value: form.phone },
                      ...(form.notes ? [{ label: "Notes", value: form.notes }] : []),
                    ].map(r => (
                      <div key={r.label} className="summary-row">
                        <span className="summary-label">{r.label}</span>
                        <span className="summary-value">{r.value}</span>
                      </div>
                    ))}
                  </div>
                  <p className="book-note">We will confirm availability and send you a price before collecting.</p>
                  <div className="confirm-btns">
                    <a
                      href={`https://wa.me/${COMPANY.whatsappNumber}?text=${encodeURIComponent(whatsappText)}`}
                      className="btn btn-whatsapp btn-lg"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setSubmitted(true)}
                    >
                      <WhatsAppIcon /> Confirm via WhatsApp
                    </a>
                    <a href={phoneLink()} className="btn btn-outline btn-lg">📞 Call to confirm</a>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}