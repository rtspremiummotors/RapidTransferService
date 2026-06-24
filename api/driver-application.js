// Receives driver / partner-company applications and emails them to the company
// with uploaded documents attached. Uses Resend.

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

    const { applicationType, attachments = [], ...fields } = body;

    // ── EDIT THESE ─────────────────────────────────────────
    const COMPANY_EMAIL = "akstone007@gmail.com";
    const FROM_EMAIL = "Rapid Transfer Service <onboarding@resend.dev>";
    // ───────────────────────────────────────────────────────

    // Build a readable table of all fields
    const labels = {
      name: "Full name", email: "Email", phone: "Phone", city: "City",
      driverType: "Driver type", licenseType: "License type", licenseNumber: "License number",
      experience: "Experience", companyName: "Company name", contactName: "Contact person",
      vatNumber: "VAT number", fleetSize: "Fleet size", serviceType: "Service type",
      notes: "Notes",
    };

    const rows = Object.entries(fields)
      .filter(([k, v]) => v && labels[k])
      .map(([k, v]) =>
        `<tr><td style="padding:8px 14px;color:#5d6c7e;border-bottom:1px solid #eee">${labels[k]}</td><td style="padding:8px 14px;color:#0c1828;font-weight:600;border-bottom:1px solid #eee;text-align:right">${v}</td></tr>`
      ).join("");

    const html = `
      <div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;background:#fff;border:1px solid #eee;border-radius:14px;overflow:hidden">
        <div style="background:#0c1828;padding:24px;text-align:center">
          <h1 style="color:#f2b705;margin:0;font-size:20px">Rapid Transfer Service</h1>
        </div>
        <div style="padding:24px">
          <h2 style="color:#0c1828;margin-top:0">New ${applicationType} application</h2>
          <table style="width:100%;border-collapse:collapse;font-size:14px">${rows}</table>
          <p style="color:#5d6c7e;font-size:13px;margin-top:20px">${attachments.length} document(s) attached.</p>
        </div>
      </div>`;

    // Email to company with attachments
    const emailPayload = {
      from: FROM_EMAIL,
      to: COMPANY_EMAIL,
      subject: `New ${applicationType} application — ${fields.name || fields.companyName || "Unknown"}`,
      html,
      attachments: attachments.map((a) => ({ filename: a.name, content: a.content })),
    };

    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailPayload),
    });

    // Confirmation email to the applicant
    if (fields.email) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: FROM_EMAIL,
          to: fields.email,
          subject: "We received your application — Rapid Transfer Service",
          html: `
            <div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;background:#fff;border:1px solid #eee;border-radius:14px;overflow:hidden">
              <div style="background:#0c1828;padding:24px;text-align:center">
                <h1 style="color:#f2b705;margin:0;font-size:20px">Rapid Transfer Service</h1>
              </div>
              <div style="padding:24px">
                <h2 style="color:#0c1828;margin-top:0">Thank you for applying!</h2>
                <p style="color:#5d6c7e;line-height:1.7">We have received your application and our team will review it carefully. We will contact you soon to discuss the next steps.</p>
                <p style="color:#5d6c7e;line-height:1.7">Best regards,<br>The Rapid Transfer Service team</p>
              </div>
            </div>`,
        }),
      });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Application error:", err.message);
    return res.status(400).json({ error: err.message });
  }
}