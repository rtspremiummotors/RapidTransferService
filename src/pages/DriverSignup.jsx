import { useState } from "react";
import { COMPANY } from "../config.js";

const DRIVER_TYPES = ["Taxi driver", "Courier driver", "Transport driver"];

export default function DriverSignup({ onBack }) {
  const [mode, setMode] = useState(null); // "driver" | "company"
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);

  // Driver form
  const [driver, setDriver] = useState({
    name: "", email: "", phone: "", city: "",
    driverType: DRIVER_TYPES[0], licenseType: "", licenseNumber: "",
    experience: "", notes: "",
    cv: null, license: null,
  });

  // Company form
  const [company, setCompany] = useState({
    companyName: "", contactName: "", email: "", phone: "",
    vatNumber: "", fleetSize: "", serviceType: DRIVER_TYPES[0],
    city: "", notes: "",
    registrationDoc: null, insuranceDoc: null, fleetDoc: null,
  });

  const setD = (f) => (e) => setDriver((p) => ({ ...p, [f]: e.target.value }));
  const setDFile = (f) => (e) => setDriver((p) => ({ ...p, [f]: e.target.files[0] || null }));
  const setC = (f) => (e) => setCompany((p) => ({ ...p, [f]: e.target.value }));
  const setCFile = (f) => (e) => setCompany((p) => ({ ...p, [f]: e.target.files[0] || null }));

  const fileToBase64 = (file) =>
    new Promise((resolve) => {
      if (!file) return resolve(null);
      const reader = new FileReader();
      reader.onload = () => resolve({ name: file.name, content: reader.result.split(",")[1] });
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(file);
    });

  const submitDriver = async () => {
    if (!driver.name || !driver.email || !driver.phone) {
      setError("Please fill in your name, email and phone.");
      return;
    }
    setSending(true);
    setError(null);
    try {
      const cv = await fileToBase64(driver.cv);
      const license = await fileToBase64(driver.license);
      const res = await fetch("/api/driver-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          applicationType: "Individual Driver",
          ...driver,
          cv: undefined, license: undefined,
          attachments: [cv, license].filter(Boolean),
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setSent(true);
    } catch (e) {
      setError("Could not send. Please try again or email us directly.");
    } finally {
      setSending(false);
    }
  };

  const submitCompany = async () => {
    if (!company.companyName || !company.email || !company.phone) {
      setError("Please fill in company name, email and phone.");
      return;
    }
    setSending(true);
    setError(null);
    try {
      const reg = await fileToBase64(company.registrationDoc);
      const ins = await fileToBase64(company.insuranceDoc);
      const fleet = await fileToBase64(company.fleetDoc);
      const res = await fetch("/api/driver-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          applicationType: "Partner Company",
          ...company,
          registrationDoc: undefined, insuranceDoc: undefined, fleetDoc: undefined,
          attachments: [reg, ins, fleet].filter(Boolean),
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setSent(true);
    } catch (e) {
      setError("Could not send. Please try again or email us directly.");
    } finally {
      setSending(false);
    }
  };

  return (
    <main className="book-page">
      <div className="container book-container">
        <button className="back-btn" onClick={mode && !sent ? () => setMode(null) : onBack} type="button">
          ← {mode && !sent ? "Back" : "Back to home"}
        </button>

        <div className="book-header">
          <div className="book-header-icon">🤝</div>
          <div>
            <h1>Drive with us</h1>
            <p>Join Rapid Transfer Service as a driver or partner company.</p>
          </div>
        </div>

        <div className="book-card">
          {sent ? (
            <div className="book-confirmed">
              <div className="confirmed-icon">✓</div>
              <h2>Application received!</h2>
              <p>Thank you for your interest. We will review your application and contact you soon.</p>
              <button className="btn btn-gold" onClick={onBack}>Back to home</button>
            </div>
          ) : !mode ? (
            <div className="book-step">
              <h2>How would you like to join?</h2>
              <div className="payment-options">
                <button className="payment-option" onClick={() => setMode("driver")}>
                  <div className="po-icon">🧑‍✈️</div>
                  <div className="po-body">
                    <span className="po-name">As a Driver</span>
                    <span className="po-desc">Taxi, courier or transport driver looking to work with us</span>
                  </div>
                  <span className="po-arrow">→</span>
                </button>
                <button className="payment-option" onClick={() => setMode("company")}>
                  <div className="po-icon">🏢</div>
                  <div className="po-body">
                    <span className="po-name">As a Partner Company</span>
                    <span className="po-desc">A company with a fleet wanting to partner with us</span>
                  </div>
                  <span className="po-arrow">→</span>
                </button>
              </div>
            </div>
          ) : mode === "driver" ? (
            <div className="book-step">
              <h2>Driver application</h2>
              <div className="field-grid">
                <label className="field"><span className="field-label">Full name</span><input type="text" value={driver.name} onChange={setD("name")} placeholder="First and last name" /></label>
                <label className="field"><span className="field-label">Email</span><input type="email" value={driver.email} onChange={setD("email")} placeholder="your@email.com" /></label>
                <label className="field"><span className="field-label">Phone</span><input type="tel" value={driver.phone} onChange={setD("phone")} placeholder="+32 ..." /></label>
                <label className="field"><span className="field-label">City / region</span><input type="text" value={driver.city} onChange={setD("city")} placeholder="e.g. Brussels" /></label>
                <label className="field"><span className="field-label">Driver type</span>
                  <select value={driver.driverType} onChange={setD("driverType")}>
                    {DRIVER_TYPES.map(t => <option key={t}>{t}</option>)}
                  </select>
                </label>
                <label className="field"><span className="field-label">Years of experience</span><input type="text" value={driver.experience} onChange={setD("experience")} placeholder="e.g. 5 years" /></label>
                <label className="field"><span className="field-label">License type</span><input type="text" value={driver.licenseType} onChange={setD("licenseType")} placeholder="e.g. B, D" /></label>
                <label className="field"><span className="field-label">License number</span><input type="text" value={driver.licenseNumber} onChange={setD("licenseNumber")} placeholder="License no." /></label>

                <label className="field field-full file-field">
                  <span className="field-label">Upload your CV <span className="field-optional">(PDF or image)</span></span>
                  <input type="file" accept=".pdf,.doc,.docx,image/*" onChange={setDFile("cv")} />
                  {driver.cv && <span className="file-name">✓ {driver.cv.name}</span>}
                </label>
                <label className="field field-full file-field">
                  <span className="field-label">Upload your driver's license <span className="field-optional">(PDF or image)</span></span>
                  <input type="file" accept=".pdf,image/*" onChange={setDFile("license")} />
                  {driver.license && <span className="file-name">✓ {driver.license.name}</span>}
                </label>

                <label className="field field-full"><span className="field-label">Anything else? <span className="field-optional">(optional)</span></span>
                  <textarea rows="3" value={driver.notes} onChange={setD("notes")} placeholder="Tell us about yourself, availability, etc." />
                </label>
              </div>
              {error && <p className="fare-error">{error}</p>}
              <button className="btn btn-gold btn-next" onClick={submitDriver} disabled={sending}>
                {sending ? "Sending..." : "Submit application"}
              </button>
            </div>
          ) : (
            <div className="book-step">
              <h2>Partner company application</h2>
              <div className="field-grid">
                <label className="field"><span className="field-label">Company name</span><input type="text" value={company.companyName} onChange={setC("companyName")} placeholder="Company legal name" /></label>
                <label className="field"><span className="field-label">Contact person</span><input type="text" value={company.contactName} onChange={setC("contactName")} placeholder="Full name" /></label>
                <label className="field"><span className="field-label">Email</span><input type="email" value={company.email} onChange={setC("email")} placeholder="company@email.com" /></label>
                <label className="field"><span className="field-label">Phone</span><input type="tel" value={company.phone} onChange={setC("phone")} placeholder="+32 ..." /></label>
                <label className="field"><span className="field-label">VAT / registration number</span><input type="text" value={company.vatNumber} onChange={setC("vatNumber")} placeholder="BE..." /></label>
                <label className="field"><span className="field-label">Fleet size</span><input type="text" value={company.fleetSize} onChange={setC("fleetSize")} placeholder="e.g. 12 vehicles" /></label>
                <label className="field"><span className="field-label">Service type</span>
                  <select value={company.serviceType} onChange={setC("serviceType")}>
                    {DRIVER_TYPES.map(t => <option key={t}>{t}</option>)}
                  </select>
                </label>
                <label className="field"><span className="field-label">City / region</span><input type="text" value={company.city} onChange={setC("city")} placeholder="e.g. Brussels" /></label>

                <label className="field field-full file-field">
                  <span className="field-label">Company registration document</span>
                  <input type="file" accept=".pdf,image/*" onChange={setCFile("registrationDoc")} />
                  {company.registrationDoc && <span className="file-name">✓ {company.registrationDoc.name}</span>}
                </label>
                <label className="field field-full file-field">
                  <span className="field-label">Insurance document</span>
                  <input type="file" accept=".pdf,image/*" onChange={setCFile("insuranceDoc")} />
                  {company.insuranceDoc && <span className="file-name">✓ {company.insuranceDoc.name}</span>}
                </label>
                <label className="field field-full file-field">
                  <span className="field-label">Fleet details / list</span>
                  <input type="file" accept=".pdf,.doc,.docx,.xls,.xlsx,image/*" onChange={setCFile("fleetDoc")} />
                  {company.fleetDoc && <span className="file-name">✓ {company.fleetDoc.name}</span>}
                </label>

                <label className="field field-full"><span className="field-label">Anything else? <span className="field-optional">(optional)</span></span>
                  <textarea rows="3" value={company.notes} onChange={setC("notes")} placeholder="Tell us about your company" />
                </label>
              </div>
              {error && <p className="fare-error">{error}</p>}
              <button className="btn btn-gold btn-next" onClick={submitCompany} disabled={sending}>
                {sending ? "Sending..." : "Submit application"}
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}