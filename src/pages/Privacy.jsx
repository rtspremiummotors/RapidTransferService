import { COMPANY } from "../config.js";

export default function Privacy({ onBack }) {
  return (
    <main className="legal-page">
      <div className="container legal-container">
        <button className="back-btn" onClick={onBack}>← Back to home</button>
        <div className="legal-content">
          <h1>Privacy Policy</h1>
          <p className="legal-date">Last updated: June 2025</p>

          <section>
            <h2>1. Who We Are</h2>
            <p>{COMPANY.name} is a taxi and courier company based in Brussels, Belgium. We are committed to protecting your personal data in accordance with the General Data Protection Regulation (GDPR) and applicable Belgian privacy law.</p>
          </section>

          <section>
            <h2>2. What Data We Collect</h2>
            <p>When you book a ride or delivery, we may collect the following information: your name, phone number, email address, pickup and drop-off locations, and any notes you provide. We collect this data solely for the purpose of fulfilling your booking.</p>
          </section>

          <section>
            <h2>3. How We Use Your Data</h2>
            <p>We use your personal data to confirm and fulfil your booking, contact you regarding your ride or delivery, and improve our service. We do not use your data for marketing purposes without your explicit consent. We do not sell your data to third parties.</p>
          </section>

          <section>
            <h2>4. Data Sharing</h2>
            <p>Your data may be shared with the driver assigned to your booking in order to complete the service. We do not share your data with any other third parties unless required by law.</p>
          </section>

          <section>
            <h2>5. Data Retention</h2>
            <p>We retain your personal data for as long as necessary to fulfil the purposes outlined in this policy, and in accordance with our legal obligations. Booking records are typically retained for a maximum of 2 years.</p>
          </section>

          <section>
            <h2>6. Your Rights</h2>
            <p>Under GDPR, you have the right to access the personal data we hold about you, request correction of inaccurate data, request deletion of your data, object to processing of your data, and lodge a complaint with the Belgian Data Protection Authority (Gegevensbeschermingsautoriteit).</p>
          </section>

          <section>
            <h2>7. Cookies</h2>
            <p>Our website does not currently use tracking cookies or analytics tools. We may use essential cookies to ensure the website functions correctly.</p>
          </section>

          <section>
            <h2>8. Contact</h2>
            <p>For any privacy-related questions or requests, contact us at {COMPANY.email} or call {COMPANY.phoneDisplay}.</p>
          </section>
        </div>
      </div>
    </main>
  );
}