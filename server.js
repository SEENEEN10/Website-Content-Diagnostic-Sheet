const express = require("express");
const nodemailer = require("nodemailer");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "127.0.0.1";
const TARGET_EMAIL = "dsinai@calx.sa";

app.use(express.json({ limit: "1mb" }));
app.use(express.static(path.join(__dirname, "public")));

function buildSubmissionText(payload) {
  const lines = [];
  lines.push("Website Content Diagnostic Sheet - New Submission");
  lines.push("");
  lines.push(`Submitted At: ${new Date().toISOString()}`);
  lines.push(`Name: ${payload.respondent?.name || "N/A"}`);
  lines.push(`Company: ${payload.respondent?.company || "N/A"}`);
  lines.push(`Email: ${payload.respondent?.email || "N/A"}`);
  lines.push(`Phone: ${payload.respondent?.phone || "N/A"}`);
  lines.push("");
  lines.push("Answers:");
  lines.push("");

  for (const section of payload.answers || []) {
    lines.push(section.sectionTitle);
    for (const answer of section.items) {
      lines.push(`- ${answer.label}: ${answer.value || "Not answered"}`);
    }
    lines.push("");
  }

  return lines.join("\n");
}

function hasSmtpConfig() {
  return (
    process.env.SMTP_HOST &&
    process.env.SMTP_PORT &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS
  );
}

async function sendEmail(messageText) {
  if (!hasSmtpConfig()) {
    throw new Error(
      "SMTP is not configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM."
    );
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  const from = process.env.SMTP_FROM || process.env.SMTP_USER;

  await transporter.sendMail({
    from,
    to: TARGET_EMAIL,
    subject: "Website Content Diagnostic - New Response",
    text: messageText
  });
}

app.post("/api/submit", async (req, res) => {
  try {
    const payload = req.body;

    if (!payload || !Array.isArray(payload.answers)) {
      return res.status(400).json({ error: "Invalid payload" });
    }

    const messageText = buildSubmissionText(payload);

    await sendEmail(messageText);

    return res.json({ ok: true });
  } catch (error) {
    return res.status(500).json({
      error: error.message || "Failed to process submission"
    });
  }
});

app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});
