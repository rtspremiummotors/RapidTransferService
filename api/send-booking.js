// Sends booking confirmation emails to the customer AND the company.
// Uses Resend (https://resend.com). Set RESEND_API_KEY in Vercel env.

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ error: "Email service not configured" });
  }

  try {
    let body = req.body;
    if (typeof body === "string") body = JSON.parse(body);
    if (!body) body = {};

    const {
      type = "Taxi",
      name, email, phone,
      pickup, destination, date, time,
      vehicle, passengers, luggage, distance,
      fare, paymentStatus = "Pay on arrival",
      notes, flightNumber, returnTrip,
    } = body;

    // ── EDIT THESE ─────────────────────────────────────────
    const COMPANY_EMAIL = "rts.premium.motors@gmail.com"; // where YOU receive bookings
    const FROM_EMAIL = "Rapid Transfer Service <onboarding@resend.dev>"; // change to your domain once verified
    // ───────────────────────────────────────────────────────

    const rows = [
      ["Service", type],
      ["From", pickup],
      ["To", destination],
      ["Date & time", `${date} at ${time}`],
      returnTrip ? ["Return", returnTrip] : null,
      vehicle ? ["Vehicle", vehicle] : null,
      passengers ? ["Passengers", passengers] : null,
      luggage ? ["Luggage", `${luggage} bag(s)`] : null,
      flightNumber ? ["Flight", flightNumber] : null,
      distance ? ["Distance", `${distance} km`] : null,
      fare ? ["Fare", `€${fare}`] : null,
      ["Payment", paymentStatus],
      ["Name", name],
      ["Phone", phone],
      ["Email", email],
      notes ? ["Notes", notes] : null,
    ].filter(Boolean);

    const tableRows = rows.map(
      ([k, v]) => `<tr><td style="padding:8px 14px;color:#5d6c7e;border-bottom:1px solid #eee">${k}</td><td style="padding:8px 14px;color:#0c1828;font-weight:600;border-bottom:1px solid #eee;text-align:right">${v}</td></tr>`
    ).join("");

    const html = (heading) => `
      <div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;background:#fff;border:1px solid #eee;border-radius:14px;overflow:hidden">
        <div style="background:#0c1828;padding:24px;text-align:center">
          <h1 style="color:#f2b705;margin:0;font-size:20px">Rapid Transfer Service</h1>
        </div>
        <div style="padding:24px">
          <h2 style="color:#0c1828;margin-top:0">${heading}</h2>
          <table style="width:100%;border-collapse:collapse;font-size:14px">${tableRows}</table>
          <p style="color:#5d6c7e;font-size:13px;margin-top:20px">Need to change something? Reply to this email or call us.</p>
        </div>
      </div>`;

    const send = (to, subject, heading) =>
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ from: FROM_EMAIL, to, subject, html: html(heading) }),
      });

    // Send to company always
    await send(COMPANY_EMAIL, `New ${type} booking from ${name}`, "New booking received");

    // Send to customer if they gave an email
    if (email) {
      await send(email, "Your booking is confirmed — Rapid Transfer Service", "Thank you for your booking!");
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Email error:", err.message);
    return res.status(400).json({ error: err.message });
  }
}