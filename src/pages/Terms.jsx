import { COMPANY } from "../config.js";

export default function Terms({ onBack }) {
  return (
    <main className="legal-page">
      <div className="container legal-container">
        <button className="back-btn" onClick={onBack}>← Back to home</button>
        <div className="legal-content">
          <h1>Terms &amp; Conditions</h1>
          <p className="legal-date">Last updated: June 2025</p>

          <section>
            <h2>1. About Us</h2>
            <p>{COMPANY.name} is a licensed taxi and courier service based in Brussels, Belgium. By booking a ride or delivery through our website, phone or WhatsApp, you agree to the following terms.</p>
          </section>

          <section>
            <h2>2. Bookings</h2>
            <p>All bookings are confirmed via phone or WhatsApp. A booking is only confirmed once you have received an explicit confirmation from us. We reserve the right to decline bookings at our discretion.</p>
          </section>

          <section>
            <h2>3. Pricing</h2>
            <p>All prices quoted are fixed and include VAT unless stated otherwise. The price agreed at the time of booking is the final price. Additional charges may apply for waiting time beyond 15 minutes, extra stops not mentioned at the time of booking, or exceptional circumstances such as road tolls or ferries.</p>
          </section>

          <section>
            <h2>4. Cancellations</h2>
            <p>Cancellations made more than 2 hours before the scheduled pickup are free of charge. Cancellations made within 2 hours of the scheduled pickup may be subject to a cancellation fee of up to 50% of the agreed fare. No-shows will be charged the full fare.</p>
          </section>

          <section>
            <h2>5. Passenger Responsibilities</h2>
            <p>Passengers are responsible for being ready at the agreed pickup location and time. We are not liable for missed flights, trains or events due to late pickup caused by the passenger. Passengers must treat our vehicles and drivers with respect. We reserve the right to terminate a journey if a passenger behaves in a manner that is threatening, abusive or dangerous.</p>
          </section>

          <section>
            <h2>6. Courier Services</h2>
            <p>We accept parcels, documents and goods for same-day delivery. The sender is responsible for ensuring that the contents are legal, properly packaged and accurately described. We do not accept hazardous materials, illegal items, perishable goods or items exceeding 30 kg without prior agreement. We are not liable for damage caused by inadequate packaging.</p>
          </section>

          <section>
            <h2>7. Liability</h2>
            <p>Our liability is limited to the value of the service provided. We are not liable for indirect or consequential losses, including missed appointments or lost business. All our vehicles are fully insured in accordance with Belgian law.</p>
          </section>

          <section>
            <h2>8. Governing Law</h2>
            <p>These terms are governed by Belgian law. Any disputes shall be subject to the exclusive jurisdiction of the courts of Brussels, Belgium.</p>
          </section>

          <section>
            <h2>9. Contact</h2>
            <p>For questions about these terms, contact us at {COMPANY.email} or call {COMPANY.phoneDisplay}.</p>
          </section>
        </div>
      </div>
    </main>
  );
}