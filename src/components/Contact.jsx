import { useState } from "react";
import { COMPANY, phoneLink, whatsappLink, emailLink } from "../config.js";
import { WhatsAppIcon } from "./Hero.jsx";
import SectionHeading from "./SectionHeading.jsx";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);

  const set = (f) => (e) => setForm((p) => ({ ...p, [f]: e.target.value }));

  const submit = async () => {
    if (!form.name.trim() || !form.message.trim()) {
      setError("Please fill in your name and message.");
      return;
    }
    setSending(true);
    setError(null);
    try {
      const res = await fetch("/api/send-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setSent(true);
    } catch (e) {
      setError("Could not send your message. Please try WhatsApp or phone instead.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="section section-gray" id="contact">
      <div className="container">
        <SectionHeading
          eyebrow="Get in touch"
          title="Contact us"
          sub="Have a question or a custom request? Send us a message or reach us directly."
        />

        <div className="contact-grid">
          <div className="contact-direct">
            <a href={phoneLink()} className="contact-direct-item">
              <span className="contact-direct-label">Call us</span>
              <span className="contact-direct-value">{COMPANY.phoneDisplay}</span>
            </a>
            <a href={whatsappLink()} className="contact-direct-item" target="_blank" rel="noopener noreferrer">
              <span className="contact-direct-label"><WhatsAppIcon /> WhatsApp</span>
              <span className="contact-direct-value">Message us</span>
            </a>
            <a href={emailLink()} className="contact-direct-item">
              <span className="contact-direct-label">Email</span>
              <span className="contact-direct-value">{COMPANY.email}</span>
            </a>
          </div>

          <div className="contact-form-card">
            {sent ? (
              <div className="book-confirmed">
                <div className="confirmed-icon">✓</div>
                <h2>Message sent!</h2>
                <p>Thank you — we will get back to you shortly.</p>
              </div>
            ) : (
              <div className="field-grid">
                <label className="field"><span className="field-label">Your name</span><input type="text" value={form.name} onChange={set("name")} placeholder="First and last name" /></label>
                <label className="field"><span className="field-label">Phone <span className="field-optional">(optional)</span></span><input type="tel" value={form.phone} onChange={set("phone")} placeholder="+32 ..." /></label>
                <label className="field field-full"><span className="field-label">Email <span className="field-optional">(optional)</span></span><input type="email" value={form.email} onChange={set("email")} placeholder="your@email.com" /></label>
                <label className="field field-full"><span className="field-label">Message</span><textarea rows="4" value={form.message} onChange={set("message")} placeholder="How can we help?" /></label>
                {error && <p className="fare-error field-full">{error}</p>}
                <button type="button" className="btn btn-gold btn-block field-full" onClick={submit} disabled={sending}>
                  {sending ? "Sending..." : "Send message"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}