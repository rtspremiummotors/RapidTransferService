import { useState } from "react";
import { COMPANY, phoneLink } from "../config.js";
import { WhatsAppIcon } from "../components/Hero.jsx";
import AddressInput from "../components/AddressInput.jsx";
import DatePicker from "../components/DatePicker.jsx";
import TimePicker from "../components/TimePicker.jsx";
import PaymentStep from "../components/PaymentStep.jsx";
import { calculateTaxiFare, getDrivingDistance } from "../utils/fareCalculator.js";

function Counter({ label, value, onChange, min = 0, max = 8, suffix = "" }) {
  const num = parseInt(value) || min;
  return (
    <div className="counter-wrap">
      {label && <span className="field-label">{label}</span>}
      <div className="counter">
        <button type="button" className="counter-btn" onClick={() => num > min && onChange(String(num - 1))} disabled={num <= min}>−</button>
        <span className="counter-val">{num} <span className="counter-suffix">{suffix}{num !== 1 ? "s" : ""}</span></span>
        <button type="button" className="counter-btn" onClick={() => num < max && onChange(String(num + 1))} disabled={num >= max}>+</button>
      </div>
    </div>
  );
}

const VEHICLES = [
  { id: "standard", label: "Standard Taxi", sub: "Up to 4 passengers", icon: "🚕" },
  { id: "business", label: "Business Class", sub: "Up to 3 passengers", icon: "🚘" },
  { id: "van", label: "Van / Group", sub: "Up to 8 passengers", icon: "🚐" },
];

const STEPS = ["Trip details", "Passengers", "Review & Pay"];

export default function BookTaxi({ onBack }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    pickup: "", destination: "", date: "", time: "",
    stops: [],
    returnTrip: false, returnDate: "", returnTime: "",
    passengers: "1", babies: "0", luggageSmall: "1", luggageBig: "0", vehicle: "standard",
    flightNumber: "", notes: "",
    name: "", phone: "", email: "",
  });
  const [fare, setFare] = useState(null);
  const [routeInfo, setRouteInfo] = useState(null);
  const [fareLoading, setFareLoading] = useState(false);
  const [fareError, setFareError] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [paymentMode, setPaymentMode] = useState(null);

  const set = (f) => (v) => setForm((p) => ({
    ...p,
    [f]: typeof v === "object" && v.target
      ? v.target.type === "checkbox" ? v.target.checked : v.target.value
      : v
  }));

  // Passengers handler — auto-switch to van when 5+
  const setPassengers = (val) => {
    setForm((p) => {
      const next = { ...p, passengers: val };
      if (parseInt(val) >= 5 && p.vehicle !== "van") next.vehicle = "van";
      return next;
    });
  };

  // Stops
  const addStop = () => setForm((p) => ({ ...p, stops: [...p.stops, ""] }));
  const updateStop = (i, val) => setForm((p) => {
    const stops = [...p.stops];
    stops[i] = val;
    return { ...p, stops };
  });
  const removeStop = (i) => setForm((p) => ({ ...p, stops: p.stops.filter((_, idx) => idx !== i) }));

  const canNext0 = form.pickup.trim() && form.destination.trim() && form.date && form.time;
  const canNext1 = form.name.trim() && form.phone.trim() && form.email.trim();

  const selectedVehicle = VEHICLES.find(v => v.id === form.vehicle);
  const vanLocked = parseInt(form.passengers) >= 5;
  const vansNeeded = Math.ceil(parseInt(form.passengers) / 8);

  const stopsText = form.stops.filter(s => s.trim()).length
    ? form.stops.filter(s => s.trim()).map((s, i) => `   ${i + 1}. ${s}`).join("\n")
    : "";

  const whatsappText =
`Hi! I'd like to book a taxi with Rapid Transfer Service.

🚗 Trip details
• From: ${form.pickup}
${stopsText ? `• Stops:\n${stopsText}` : ""}
• To: ${form.destination}
• Date: ${form.date} at ${form.time}
• Vehicle: ${selectedVehicle?.label}${vansNeeded > 1 ? ` (${vansNeeded} vans)` : ""}
• Passengers: ${form.passengers}
• Luggage: ${form.luggageSmall} small, ${form.luggageBig} big${parseInt(form.babies) > 0 ? `\n• Baby seats needed: ${form.babies}` : ""}
${form.flightNumber ? `• Flight: ${form.flightNumber}` : ""}
${form.returnTrip ? `• Return: ${form.returnDate} at ${form.returnTime}` : ""}
${routeInfo ? `• Distance: ${routeInfo.km} km (${routeInfo.duration})` : ""}
${fare ? `• Fare: €${fare.total.toFixed(2)}` : ""}

👤 My details
• Name: ${form.name}
• Phone: ${form.phone}
• Email: ${form.email}
${form.notes ? `• Notes: ${form.notes}` : ""}`;

  const goToReview = async () => {
    setFareLoading(true);
    setFareError(null);
    try {
      // Build waypoints: pickup -> stops -> destination, sum the legs
      const points = [form.pickup, ...form.stops.filter(s => s.trim()), form.destination];
      let totalKm = 0;
      let lastDuration = "";
      for (let i = 0; i < points.length - 1; i++) {
        const { km, duration } = await getDrivingDistance(points[i], points[i + 1]);
        totalKm += km;
        lastDuration = duration;
      }
      totalKm = parseFloat(totalKm.toFixed(1));
      setRouteInfo({ km: totalKm, duration: lastDuration });
      const f = calculateTaxiFare(totalKm, form.vehicle, form.time, form.returnTrip);
      setFare(f);
      setStep(2);
    } catch (e) {
      setFareError("Could not calculate distance. Make sure all addresses are complete and try again.");
    } finally {
      setFareLoading(false);
    }
  };

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
            <p>Fill in your details — we confirm within minutes.</p>
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
              <h2>{paymentMode === "paid" ? "Payment successful!" : "Booking confirmed!"}</h2>
              <p>{paymentMode === "paid" ? "Your payment is confirmed. We will contact you shortly." : "We will contact you shortly to confirm your ride."}</p>
              <div className="summary">
                {[
                  { label: "From", value: form.pickup },
                  { label: "To", value: form.destination },
                  { label: "Date & time", value: `${form.date} at ${form.time}` },
                  { label: "Vehicle", value: `${selectedVehicle?.icon} ${selectedVehicle?.label}` },
                  { label: "Name", value: form.name },
                  ...(fare ? [{ label: "Fixed fare", value: `€${fare.total.toFixed(2)}` }] : []),
                ].map(r => (
                  <div key={r.label} className="summary-row">
                    <span className="summary-label">{r.label}</span>
                    <span className="summary-value">{r.value}</span>
                  </div>
                ))}
              </div>
              <div className="confirm-btns">
                <a href={`https://wa.me/${COMPANY.whatsappNumber}?text=${encodeURIComponent(whatsappText)}`} className="btn btn-whatsapp" target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon /> Message us
                </a>
                <a href={`tel:${COMPANY.phoneTel}`} className="btn btn-gold">📞 {COMPANY.phoneDisplay}</a>
              </div>
            </div>
          ) : (
            <>
              {/* STEP 0 — Trip details */}
              {step === 0 && (
                <div className="book-step">
                  <h2>Where are you going?</h2>
                  <div className="field-grid">
                    {/* Pickup and destination side by side */}
                    <AddressInput label="Pickup location" placeholder="Street, city or airport" value={form.pickup} onChange={set("pickup")} dotColor="gold" />
                    <AddressInput label="Destination" placeholder="Where are you going?" value={form.destination} onChange={set("destination")} dotColor="navy" />

                    {/* Extra stops */}
                    {form.stops.map((stop, i) => (
                      <div key={i} className="field field-full stop-field">
                        <div className="stop-field-inner">
                          <AddressInput
                            label={`Stop ${i + 1}`}
                            placeholder="Address of the stop"
                            value={stop}
                            onChange={(val) => updateStop(i, val)}
                            dotColor="navy"
                          />
                          <button type="button" className="stop-remove" onClick={() => removeStop(i)} aria-label="Remove stop">✕</button>
                        </div>
                      </div>
                    ))}

                    <div className="field field-full add-stop-row">
                      <button type="button" className="add-stop-btn" onClick={addStop}>
                        + Add a stop in between
                      </button>
                    </div>
                    <DatePicker label="Date" value={form.date} onChange={set("date")} min={new Date().toISOString().split("T")[0]} />
                    <TimePicker label="Time" value={form.time} onChange={set("time")} />
                    <label className="field field-full">
                      <span className="field-label">Flight number <span className="field-optional">(optional)</span></span>
                      <input type="text" placeholder="e.g. SN3456" value={form.flightNumber} onChange={set("flightNumber")} />
                    </label>
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
                    <Counter label="Passengers" value={form.passengers} onChange={setPassengers} min={1} max={96} suffix="passenger" />
                    <Counter label="Kids (up to 2 yrs)" value={form.babies} onChange={set("babies")} min={0} max={8} suffix="baby seat" />
                    <Counter label="Small luggage" value={form.luggageSmall} onChange={set("luggageSmall")} min={0} max={10} suffix="small bag" />
                    <Counter label="Big luggage" value={form.luggageBig} onChange={set("luggageBig")} min={0} max={10} suffix="big bag" />
                  </div>

                  <p className="field-label" style={{ margin: "1.5rem 0 0.8rem" }}>Vehicle type</p>
                  {vanLocked && (
                    <p className="van-notice">
                      {vansNeeded > 1
                        ? `For ${form.passengers} passengers, we will arrange ${vansNeeded} vans for your group.`
                        : "For 5 or more passengers, a Van is required."}
                    </p>
                  )}
                  <div className="vehicle-grid">
                    {VEHICLES.map(v => {
                      const disabled = vanLocked && v.id !== "van";
                      return (
                        <button key={v.id} type="button"
                          className={`vehicle-card ${form.vehicle === v.id ? "vehicle-card-active" : ""} ${disabled ? "vehicle-card-disabled" : ""}`}
                          onClick={() => !disabled && setForm(p => ({ ...p, vehicle: v.id }))}
                          disabled={disabled}>
                          <span className="vehicle-icon">{v.icon}</span>
                          <span className="vehicle-name">{v.label}</span>
                          <span className="vehicle-sub">{v.sub}</span>
                        </button>
                      );
                    })}
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
                      <span className="field-label">Email address</span>
                      <input type="email" placeholder="your@email.com" value={form.email} onChange={set("email")} />
                    </label>
                    <label className="field field-full">
                      <span className="field-label">Extra notes <span className="field-optional">(optional)</span></span>
                      <textarea rows="3" placeholder="Child seat, meeting point, special requests..." value={form.notes} onChange={set("notes")} />
                    </label>
                  </div>

                  {fareError && <p className="fare-error">{fareError}</p>}

                  <button className="btn btn-gold btn-next" disabled={!canNext1 || fareLoading} onClick={goToReview}>
                    {fareLoading ? "Calculating fare..." : "Review & pay →"}
                  </button>
                </div>
              )}

              {/* STEP 2 — Review & Pay */}
              {step === 2 && (
                <div className="book-step">
                  <h2>Review &amp; pay</h2>
                  <div className="summary" style={{ marginBottom: "1.5rem" }}>
                    {[
                      { label: "From", value: form.pickup },
                      ...form.stops.filter(s => s.trim()).map((s, i) => ({ label: `Stop ${i + 1}`, value: s })),
                      { label: "To", value: form.destination },
                      { label: "Date & time", value: `${form.date} at ${form.time}` },
                      ...(form.returnTrip ? [{ label: "Return", value: `${form.returnDate} at ${form.returnTime}` }] : []),
                      { label: "Vehicle", value: `${selectedVehicle?.icon} ${selectedVehicle?.label}${vansNeeded > 1 ? ` × ${vansNeeded}` : ""}` },
                      { label: "Passengers", value: `${form.passengers}` },
                      { label: "Luggage", value: `${form.luggageSmall} small, ${form.luggageBig} big` },
                      ...(parseInt(form.babies) > 0 ? [{ label: "Baby seats", value: `${form.babies} (kids up to 2 yrs)` }] : []),
                      ...(form.flightNumber ? [{ label: "Flight", value: form.flightNumber }] : []),
                      { label: "Name", value: form.name },
                      { label: "Phone", value: form.phone },
                      { label: "Email", value: form.email },
                      ...(routeInfo ? [{ label: "Distance", value: `${routeInfo.km} km · ${routeInfo.duration}` }] : []),
                    ].map(r => (
                      <div key={r.label} className="summary-row">
                        <span className="summary-label">{r.label}</span>
                        <span className="summary-value">{r.value}</span>
                      </div>
                    ))}
                  </div>

                  {fare && (
                    <PaymentStep
                      fare={fare}
                      bookingData={{ ...form, km: routeInfo?.km, whatsappText }}
                      onSuccess={(mode) => {
                        setPaymentMode(mode);
                        setSubmitted(true);
                        fetch("/api/send-booking", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            type: "Taxi",
                            name: form.name, email: form.email, phone: form.phone,
                            pickup: form.pickup, destination: form.destination,
                            date: form.date, time: form.time,
                            vehicle: selectedVehicle?.label,
                            passengers: form.passengers,
                            luggage: `${form.luggageSmall} small, ${form.luggageBig} big`,
                            distance: routeInfo?.km, fare: fare?.total?.toFixed(2),
                            paymentStatus: mode === "paid" ? "Paid online" : "Pay on arrival",
                            notes: form.notes, flightNumber: form.flightNumber,
                            returnTrip: form.returnTrip ? `${form.returnDate} at ${form.returnTime}` : "",
                          }),
                        }).catch(() => {});
                      }}
                      onBack={() => setStep(1)}
                    />
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}