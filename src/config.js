// ============================================================
//  COMPANY CONFIGURATION — EDIT YOUR DETAILS HERE
//  Every component reads from this file, so changing a value
//  here updates it everywhere on the website at once.
// ============================================================

export const COMPANY = {
  name: "Rapid Transfer Service",

  // ── CHANGE PHONE NUMBER HERE ──────────────────────────────
  phoneDisplay: "+32 465 57 50 07",
  phoneTel: "+32465575007",

  // ── CHANGE WHATSAPP NUMBER HERE ───────────────────────────
  // International format, digits only (no +, no spaces).
  whatsappNumber: "32465575007",
  whatsappMessage: "Hello, I would like to book a ride with Rapid Transfer Service.",

  // ── CHANGE EMAIL HERE ─────────────────────────────────────
  email: "info@rapidtransferservice.be",

  // ── CHANGE SERVICE AREA HERE ──────────────────────────────
  serviceArea: "Belgium & neighbouring countries",
  serviceAreaShort: "Brussels, Belgium",

  // ── CHANGE ADDRESS HERE (shown in footer/contact) ─────────
  address: "Brussels, Belgium",

  // Opening hours label (you operate 24/7, edit if needed)
  hours: "Available 24 hours a day, 7 days a week",
};

// Convenience helpers used by the buttons across the site
export const whatsappLink = () =>
  `https://wa.me/${COMPANY.whatsappNumber}?text=${encodeURIComponent(
    COMPANY.whatsappMessage
  )}`;

export const phoneLink = () => `tel:${COMPANY.phoneTel}`;
export const emailLink = () => `mailto:${COMPANY.email}`;