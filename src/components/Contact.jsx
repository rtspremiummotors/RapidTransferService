import { useState } from "react";
import { COMPANY, phoneLink, whatsappLink, emailLink } from "../config.js";
import SectionHeading from "./SectionHeading.jsx";
import { WhatsAppIcon } from "./Hero.jsx";

export default function Contact() {
  const [form, setForm] = useState({ name: "", contact: "", message: "" });
  const [sent, setSent] = useState(false);

  const update = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  // Frontend only: shows a confirmation message.
  // To receive messages by email later, connect this to a service such as
  // Formspree, EmailJS, or your own backend endpoint.
  const handleSubmit = () => {
    if (!form.name.trim() || !form.message.trim()) return;
    setSent(true);
  };

  return (
    <section className="section section-dark" id="contact">
      <div className="container contact-inner">
        <div className="contact-copy">
          <SectionHeading
            light
            eyebrow="Contact"
            title="Reach us any hour"
            sub="For immediate bookings, calling or WhatsApp is fastest. For questions and quotes, the form works too."
          />

          <ul className="contact-list">
            <li>
              <span className="contact-label">Phone</span>
              <a href={phoneLink()}>{COMPANY.phoneDisplay}</a>
            </li>
            <li>
              <span className="contact-label">WhatsApp</span>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                Message us <WhatsAppIcon />
              </a>
            </li>
            <li>
              <span className="contact-label">Email</span>
              <a href={emailLink()}>{COMPANY.email}</a>
            </li>
            <li>
              <span className="contact-label">Service area</span>
              <span>{COMPANY.serviceArea}</span>
            </li>
            <li>
              <span className="contact-label">Hours</span>
              <span>{COMPANY.hours}</span>
            </li>
          </ul>
        </div>

        <div className="card contact-card">
          {sent ? (
            <div className="form-success" role="status">
              <strong>Message ready to send!</strong>
              <p>
                This demo form doesn't send email yet. For now, copy your message
                to {COMPANY.email} or contact us directly — we reply fast.
              </p>
              <div className="success-ctas">
                <a href={phoneLink()} className="btn btn-gold">Call us</a>
                <a
                  href={whatsappLink()}
                  className="btn btn-whatsapp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon /> WhatsApp
                </a>
              </div>
            </div>
          ) : (
            <div className="booking-form">
              <label className="field">
                <span className="field-label">Your name</span>
                <input
                  type="text"
                  placeholder="First and last name"
                  value={form.name}
                  onChange={update("name")}
                />
              </label>
              <label className="field">
                <span className="field-label">Phone or email</span>
                <input
                  type="text"
                  placeholder="So we can reply"
                  value={form.contact}
                  onChange={update("contact")}
                />
              </label>
              <label className="field">
                <span className="field-label">Message</span>
                <textarea
                  rows="4"
                  placeholder="Tell us about your trip or delivery"
                  value={form.message}
                  onChange={update("message")}
                />
              </label>
              <button type="button" className="btn btn-gold btn-block" onClick={handleSubmit}>
                Send message
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
