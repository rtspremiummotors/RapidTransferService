import { useState } from "react";
import { COMPANY, phoneLink, whatsappLink } from "../config.js";
import { WhatsAppIcon } from "../components/Hero.jsx";
import AddressInput from "../components/AddressInput.jsx";
import DatePicker from "../components/DatePicker.jsx";
import Counter from "../components/Counter.jsx";
import TimePicker from "../components/TimePicker.jsx";

const VEHICLES = [
  { id: "standard", label: "Standard Taxi", sub: "Up to 4 passengers", icon: "🚕" },
  { id: "business", label: "Business Class", sub: "Up to 3 passengers", icon: "🚘" },
  { id: "van", label: "Van / Group", sub: "Up to 8 passengers", icon: "🚐" },
];

const STEPS = ["Trip details", "Passengers", "Confirm"];

export default function BookTaxi({ onBack }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    pickup: "", destination: "", date: "", time: "",
    returnTrip: false, returnDate: "", returnTime: "",
    passengers: "1", luggage: "1", vehicle: "standard",
    flightNumber: "", notes: "",
    name: "", phone: "", email: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const set = (f) => (v) => setForm((p) => ({ ...p, [f]: typeof v === "object" && v.target ? v.target.type === "checkbox" ? v.target.checked : v.target.value : v }));

  const canNext0 = form.pickup.trim() && form.destination.trim() && form.date && form.time;
  const canNext1 = form.name.trim() && form.phone.trim();

  const selectedVehicle = VEHICLES.find(v => v.id === form.vehicle);

  const whatsappText =
`Hi! I'd like to book a taxi with Rapid Transfer Service.

🚗 Trip details
• From: ${form.pickup}
• To: ${form.destination}
• Date: ${form.date} at ${form.time}
• Vehicle: ${selectedVehicle?.label}
• Passengers: ${form.passengers}
• Luggage: ${form.luggage} bag(s)
${form.flightNumber ? `• Flight number: ${form.flightNumber}` : ""}
${form.returnTrip ? `• Return trip: ${form.returnDate} at ${form.returnTime}` : ""}

👤 My details
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
          <div className="book-header-icon">🚕</div>
          <div>
            <h1>Book a Taxi</h1>
            <p>Fill in your details and confirm via WhatsApp or phone.</p>
          </div>
        </div>

        {/* Steps */}
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
            <Confirmed whatsappText={whatsappText} form={form} vehicle={selectedVehicle} />
          ) : (
            <>
              {/* STEP 0 — Trip details */}
              {step === 0 && (
                <div className="book-step">
                  <h2>Where are you going?</h2>
                  <div className="field-grid">
                    <AddressInput
                      label="Pickup location"
                      placeholder="Street, city or airport"
                      value={form.pickup}
                      onChange={set("pickup")}
                      dotColor="gold"
                    />
                    <AddressInput
                      label="Destination"
                      placeholder="Where are you going?"
                      value={form.destination}
                      onChange={set("destination")}
                      dotColor="navy"
                    />
                    <DatePicker label="Date" value={form.date} onChange={set("date")} min={new Date().toISOString().split("T")[0]} />
                    <TimePicker label="Time" value={form.time} onChange={set("time")} />
                    <label className="field field-full">
                      <span className="field-label">Flight number <span className="field-optional">(optional — for airport pickups)</span></span>
                      <input type="text" placeholder="e.g. SN3456" value={form.flightNumber} onChange={set("flightNumber")} />
                    </label>

                    {/* Return trip toggle */}
                    <label className="field field-full toggle-field">
                      <input type="checkbox" checked={form.returnTrip} onChange={set("returnTrip")} />
                      <span>Add a return trip</span>
                    </label>

                    {form.returnTrip && (
                      <>
                        <DatePicker label="Return date" value={form.returnDate} onChange={set("returnDate")} min={form.date || new Date().toISOString().split("T")[0]} />
                        <TimePicker label="Return time" value={form.returnTime} onChange={set("returnTime")} />
                      </>
                    )}
                  </div>
                  <button className="btn btn-gold btn-next" disabled={!canNext0} onClick={() => setStep(1)}>
                    Continue →
                  </button>
                </div>
              )}

              {/* STEP 1 — Passengers & vehicle */}
              {step === 1 && (
                <div className="book-step">
                  <h2>Passengers &amp; vehicle</h2>
                  <div className="field-grid">
                    <Counter label="Passengers" value={form.passengers} onChange={set("passengers")} min={1} max={8} suffix="passenger" />
                    <Counter label="Luggage bags" value={form.luggage} onChange={set("luggage")} min={0} max={8} suffix="bag" />
                  </div>

                  <p className="field-label" style={{ marginBottom: "0.8rem" }}>Vehicle type</p>
                  <div className="vehicle-grid">
                    {VEHICLES.map(v => (
                      <button
                        key={v.id}
                        type="button"
                        className={`vehicle-card ${form.vehicle === v.id ? "vehicle-card-active" : ""}`}
                        onClick={() => setForm(p => ({ ...p, vehicle: v.id }))}
                      >
                        <span className="vehicle-icon">{v.icon}</span>
                        <span className="vehicle-name">{v.label}</span>
                        <span className="vehicle-sub">{v.sub}</span>
                      </button>
                    ))}
                  </div>

                  <div className="field-grid" style={{ marginTop: "1.5rem" }}>
                    <label className="field">
                      <span className="field-label">Your name</span>
                      <input type="text" placeholder="First and last name" value={form.name} onChange={set("name")} />
                    </label>
                    <label className="field">
                      <span className="field-label">Phone number</span>
                      <input type="tel" placeholder="+32 ..." value={form.phone} onChange={set("phone")} />
                    </label>
                    <label className="field field-full">
                      <span className="field-label">Email <span className="field-optional">(optional)</span></span>
                      <input type="email" placeholder="your@email.com" value={form.email} onChange={set("email")} />
                    </label>
                    <label className="field field-full">
                      <span className="field-label">Extra notes <span className="field-optional">(optional)</span></span>
                      <textarea rows="3" placeholder="Child seat needed, meeting point, special requests..." value={form.notes} onChange={set("notes")} />
                    </label>
                  </div>

                  <button className="btn btn-gold btn-next" disabled={!canNext1} onClick={() => setStep(2)}>
                    Review booking →
                  </button>
                </div>
              )}

              {/* STEP 2 — Review */}
              {step === 2 && (
                <div className="book-step">
                  <h2>Review your booking</h2>
                  <div className="summary">
                    {[
                      { label: "From", value: form.pickup },
                      { label: "To", value: form.destination },
                      { label: "Date & time", value: `${form.date} at ${form.time}` },
                      ...(form.returnTrip ? [{ label: "Return", value: `${form.returnDate} at ${form.returnTime}` }] : []),
                      { label: "Vehicle", value: `${selectedVehicle?.icon} ${selectedVehicle?.label}` },
                      { label: "Passengers", value: `${form.passengers} passenger${form.passengers > 1 ? "s" : ""}, ${form.luggage} bag${form.luggage !== "1" ? "s" : ""}` },
                      ...(form.flightNumber ? [{ label: "Flight", value: form.flightNumber }] : []),
                      { label: "Name", value: form.name },
                      { label: "Phone", value: form.phone },
                      ...(form.email ? [{ label: "Email", value: form.email }] : []),
                      ...(form.notes ? [{ label: "Notes", value: form.notes }] : []),
                    ].map(r => (
                      <div key={r.label} className="summary-row">
                        <span className="summary-label">{r.label}</span>
                        <span className="summary-value">{r.value}</span>
                      </div>
                    ))}
                  </div>
                  <p className="book-note">No payment needed now — pay your driver in cash or by card.</p>
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
                    <a href={phoneLink()} className="btn btn-outline btn-lg">
                      📞 Call to confirm
                    </a>
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

function Confirmed({ whatsappText, form, vehicle }) {
  return (
    <div className="book-confirmed">
      <div className="confirmed-icon">✓</div>
      <h2>Booking request sent!</h2>
      <p>We will confirm your ride shortly. For immediate confirmation call us directly.</p>
      <div className="summary">
        {[
          { label: "From", value: form.pickup },
          { label: "To", value: form.destination },
          { label: "Date & time", value: `${form.date} at ${form.time}` },
          { label: "Vehicle", value: `${vehicle?.icon} ${vehicle?.label}` },
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
  );
}