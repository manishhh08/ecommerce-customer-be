import config from "./config.js";
import nodemailer from "nodemailer";

let transporter; // define once

if (process.env.NODE_ENV === "production") {
  // 🟢 Use real SMTP creds (Render or production)
  transporter = nodemailer.createTransport({
    host: config.nodemailer.host,
    port: config.nodemailer.port,
    secure: config.nodemailer.port === 465,
    auth: {
      user: config.nodemailer.user,
      pass: config.nodemailer.pass,
    },
  });
} else {
  // 🧪 Local testing with Ethereal (create your own account)
  transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "your-created-user@ethereal.email",
      pass: "your-created-password",
    },
  });
}

export { transporter };

// ✉️ Email template helper
export const emailFormatter = (to, subject, name, actionUrl = null) => {
  const greeting = `Hi ${name},`;
  const introText = subject.includes("Reset")
    ? "We received a request to reset your Electra Hub password."
    : "Welcome to Electra Hub! Please verify your email to continue.";
  const outroText = "If you didn’t request this, you can ignore this email.";

  const button = actionUrl
    ? `<div style="text-align:center;margin:25px 0;">
         <a href="${actionUrl}" style="background:#ff6b35;color:#fff;padding:12px 25px;border-radius:6px;text-decoration:none;">${
        subject.includes("Reset") ? "Reset Password" : "Verify Email"
      }</a>
       </div>`
    : "";

  const html = `
    <div style="font-family:Arial;background:#f9f9f9;padding:30px;">
      <div style="max-width:600px;margin:auto;background:white;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.1);">
        <div style="background:#00c2ff38;padding:25px;text-align:center;">
          <h2 style="margin:0;color:#333;">Electra Hub ⚡</h2>
        </div>
        <div style="padding:20px;">
          <p>${greeting}</p>
          <p>${introText}</p>
          ${button}
          <p style="color:#777;font-size:14px;">${outroText}</p>
        </div>
      </div>
    </div>`;

  return {
    from: '"Electra Hub ⚡" <noreply@electrahub.com>',
    to,
    subject,
    html,
    text: `${greeting}\n\n${introText}\n\n${actionUrl}\n\n${outroText}`,
  };
};
