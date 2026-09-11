// Sends a message from the Contact form to the company, with reply-to
// set to the sender so you can just hit "Reply" in your inbox.

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

    const { name, email, phone, message } = body;

    if (!name || !message) {
      return res.status(400).json({ error: "Name and message are required" });
    }

    // ── EDIT THESE ─────────────────────────────────────────
    const COMPANY_EMAIL = "akstone007@gmail.com";
    const FROM_EMAIL = "Rapid Transfer Service <bookings@rapidtransferservice.com>";
    // ───────────────────────────────────────────────────────

    const html = `
      <div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;background:#fff;border:1px solid #eee;border-radius:14px;overflow:hidden">
        <div style="background:#0c1828;padding:24px;text-align:center">
          <h1 style="color:#f2b705;margin:0;font-size:20px">Rapid Transfer Service</h1>
        </div>
        <div style="padding:24px">
          <h2 style="color:#0c1828;margin-top:0">New contact form message</h2>
          <table style="width:100%;border-collapse:collapse;font-size:14px">
            <tr><td style="padding:8px 14px;color:#5d6c7e;border-bottom:1px solid #eee">Name</td><td style="padding:8px 14px;color:#0c1828;font-weight:600;border-bottom:1px solid #eee;text-align:right">${name}</td></tr>
            ${email ? `<tr><td style="padding:8px 14px;color:#5d6c7e;border-bottom:1px solid #eee">Email</td><td style="padding:8px 14px;color:#0c1828;font-weight:600;border-bottom:1px solid #eee;text-align:right">${email}</td></tr>` : ""}
            ${phone ? `<tr><td style="padding:8px 14px;color:#5d6c7e;border-bottom:1px solid #eee">Phone</td><td style="padding:8px 14px;color:#0c1828;font-weight:600;border-bottom:1px solid #eee;text-align:right">${phone}</td></tr>` : ""}
          </table>
          <p style="color:#0c1828;font-weight:600;margin-top:20px">Message</p>
          <p style="color:#5d6c7e;line-height:1.7;white-space:pre-wrap">${message}</p>
        </div>
      </div>`;

    const result = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: COMPANY_EMAIL,
        subject: `New contact message from ${name}`,
        html,
        reply_to: email || undefined,
      }),
    });

    if (!result.ok) {
      const errText = await result.text();
      console.error("Resend error:", errText);
      return res.status(400).json({ error: "Failed to send message" });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err.message);
    return res.status(400).json({ error: err.message });
  }
}