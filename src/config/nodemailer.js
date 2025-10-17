import config from "./config.js";
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: config.nodemailer.host,
  port: config.nodemailer.port,
  secure: false, // trues for 465, false for other ports
  auth: {
    user: config.nodemailer.user,
    pass: config.nodemailer.pass,
  },
});

export const emailFormatter = (to, subject, name, verifyUrl = null) => {
  const greeting = `Hi ${name},`;
  const introText = `Welcome to Electra Hub! Just one more step before you can start getting the best tech deals.`;
  const outroText = `If you didn’t request this, you can safely ignore this email.`;

  const text = verifyUrl
    ? `${greeting}\n\n${introText}\n\nCopy and paste the link below to a browser to verify:\n${verifyUrl}\n\n${outroText}`
    : `${greeting}\n\n${introText}\n\n${outroText}`;

  const verifyButton = verifyUrl
    ? `
      <div style="text-align: center; margin: 25px 0;">
        <a href="${verifyUrl}" 
          style="
            background-color: #ff6b35;
            color: white;
            padding: 12px 25px;
            border-radius: 6px;
            text-decoration: none;
            font-weight: bold;
            display: inline-block;
          ">
          Verify Email
        </a>
      </div>
    `
    : "";

  const html = `
    <div style="
      font-family: Arial, sans-serif;
      background-color: #f9f9f9;
      padding: 30px;
    ">
      <div style="
        max-width: 600px;
        margin: auto;
        background: white;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      ">
        <div style="background-color: #ff6b35; padding: 15px 20px;">
          <h2 style="color: white; margin: 0;">Electra Hub ⚡</h2>
        </div>
        <div style="padding: 20px;">
          <p style="font-size: 16px; color: #333;">${greeting}</p>
          <p style="font-size: 15px; color: #555;">${introText}</p>
          ${verifyButton}
          <p style="color: #777; font-size: 14px; margin-top: 30px;">
            ${outroText}
          </p>
        </div>
        <div style="
          background-color: #f1f1f1;
          padding: 10px;
          text-align: center;
          font-size: 12px;
          color: #777;
        ">
          &copy; ${new Date().getFullYear()} ElectraHub. All rights reserved.
        </div>
      </div>
    </div>
  `;

  return {
    from: '"Electra Hub ⚡" <noreply@electrahub.com>',
    to,
    subject,
    text,
    html,
  };
};
