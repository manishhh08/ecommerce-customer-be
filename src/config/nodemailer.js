// import config from "./config.js";
// import nodemailer from "nodemailer";

// const testAccount = await nodemailer.createTestAccount();

// export const transporter = nodemailer.createTransport({
//   host: testAccount.smtp.host,
//   port: testAccount.smtp.port,
//   secure: testAccount.smtp.secure,
//   auth: {
//     user: testAccount.user,
//     pass: testAccount.pass,
//   },
// });

// console.log("Ethereal credentials:", testAccount);

// export const emailFormatter = (to, subject, name, verifyUrl = null) => {
//   const greeting = `Hi ${name},`;
//   const introText = `Welcome to Electra Hub! Just one more step before you can start getting the best tech deals.`;
//   const outroText = `If you didn’t request this, you can safely ignore this email.`;

//   const text = verifyUrl
//     ? `${greeting}\n\n${introText}\n\nCopy and paste the link below to a browser to verify:\n${verifyUrl}\n\n${outroText}`
//     : `${greeting}\n\n${introText}\n\n${outroText}`;

//   const verifyButton = verifyUrl
//     ? `
//       <div style="text-align: center; margin: 25px 0;">
//         <a href="${verifyUrl}"
//           style="
//             background-color: #ff6b35;
//             color: white;
//             padding: 12px 25px;
//             border-radius: 6px;
//             text-decoration: none;
//             font-weight: bold;
//             display: inline-block;
//           ">
//           Verify Email
//         </a>
//       </div>
//     `
//     : "";

//   const html = `
//     <div style="
//       font-family: Arial, sans-serif;
//       background-color: #f9f9f9;
//       padding: 30px;
//     ">
//       <div style="
//         max-width: 600px;
//         margin: auto;
//         background: white;
//         border-radius: 8px;
//         overflow: hidden;
//         box-shadow: 0 2px 8px rgba(0,0,0,0.1);
//       ">
//           <div style="text-align: center; background-color: rgba(0, 194, 255, 0.22); padding: 25px 20px;">
//           <img
//             src="https://res.cloudinary.com/dlsiyrp36/image/upload/v1760704843/electrahub_mwxx9p.png"
//             alt="Electra Hub Logo"
//             style="max-width: 120px; height: 50px; display: block; margin: 0 auto 10px;"
//           />
//           <h2 style="color: #333; margin: 0; font-size: 22px; font-weight: 600;">
//             Electra Hub ⚡
//           </h2>
//         </div>
//         <div style="padding: 20px;">
//           <p style="font-size: 16px; color: #333;">${greeting}</p>
//           <p style="font-size: 15px; color: #555;">${introText}</p>
//           ${verifyButton}
//           <p style="color: #777; font-size: 14px; margin-top: 30px;">
//             ${outroText}
//           </p>
//         </div>
//         <div style="
//           background-color: #f1f1f1;
//           padding: 10px;
//           text-align: center;
//           font-size: 12px;
//           color: #777;
//         ">
//           &copy; ${new Date().getFullYear()} ElectraHub. All rights reserved.
//         </div>
//       </div>
//     </div>
//   `;

//   return {
//     from: '"Electra Hub ⚡" <noreply@electrahub.com>',
//     to,
//     subject,
//     text,
//     html,
//   };
// };

// // import nodemailer from "nodemailer";

// // ---- OPTION A: Gmail SMTP (for real emails) ----
// // Make sure you generate an App Password in Gmail
// // export const transporter = nodemailer.createTransport({
// //   host: "smtp.gmail.com",
// //   port: 587,
// //   secure: false, // true for port 465
// //   auth: {
// //     user: process.env.GMAIL_USER,
// //     pass: process.env.GMAIL_APP_PASSWORD,
// //   },
// // });

// // ---- OPTION B: Ethereal SMTP (for dev/testing) ----
// // Uncomment if you want to test without sending real emails

// // const testAccount = await nodemailer.createTestAccount();
// // export const transporter = nodemailer.createTransport({
// //   host: testAccount.smtp.host,
// //   port: testAccount.smtp.port,
// //   secure: testAccount.smtp.secure,
// //   auth: {
// //     user: testAccount.user,
// //     pass: testAccount.pass,
// //   },
// // });

// // export const emailFormatter = (to, subject, name, url = null) => {
// //   const greeting = `Hi ${name},`;
// //   const intro = url
// //     ? `Click the button below to proceed.`
// //     : `Welcome to Electra Hub!`;

// //   const button = url
// //     ? `<div style="text-align:center; margin:20px 0;">
// //         <a href="${url}" style="
// //           background-color:#ff6b35;
// //           color:white;
// //           padding:12px 25px;
// //           border-radius:6px;
// //           text-decoration:none;
// //           font-weight:bold;
// //           display:inline-block;
// //         ">${subject}</a>
// //       </div>`
// //     : "";

// //   const html = `
// //     <div style="font-family:Arial,sans-serif; padding:20px; background:#f9f9f9;">
// //       <h3>${greeting}</h3>
// //       <p>${intro}</p>
// //       ${button}
// //       <p style="color:#777; font-size:12px;">If you didn't request this, ignore this email.</p>
// //     </div>
// //   `;

// //   return {
// //     from: '"Electra Hub ⚡" <noreply@electrahub.com>',
// //     to,
// //     subject,
// //     text: `${greeting}\n${intro}\n${url || ""}`,
// //     html,
// //   };
// // };

import config from "./config.js";
import nodemailer from "nodemailer";

const testAccount = await nodemailer.createTestAccount();

export const transporter = nodemailer.createTransport({
  host: testAccount.smtp.host,
  port: testAccount.smtp.port,
  secure: testAccount.smtp.secure,
  auth: {
    user: testAccount.user,
    pass: testAccount.pass,
  },
});

console.log("Ethereal credentials:", testAccount);

export const emailFormatter = (
  to,
  subject,
  name,
  actionUrl = null,
  actionType = "verify"
) => {
  const greeting = `Hi ${name},`;

  let introText;
  let buttonText;
  let actionVerb;

  if (actionType === "verify") {
    introText = `Welcome to Electra Hub! Just one more step before you can start getting the best tech deals.`;
    buttonText = "Verify Email";
    actionVerb = "verify";
  } else if (actionType === "reset") {
    introText = `You requested a password reset for your Electra Hub account. Click the button below to reset your password.`;
    buttonText = "Reset Password";
    actionVerb = "reset your password";
  } else {
    // Default to verify if unknown type
    introText = `Welcome to Electra Hub! Just one more step before you can start getting the best tech deals.`;
    buttonText = "Verify Email";
    actionVerb = "verify";
  }

  const outroText = `If you didn’t request this, you can safely ignore this email.`;

  const text = actionUrl
    ? `${greeting}\n\n${introText}\n\nCopy and paste the link below to a browser to ${actionVerb}:\n${actionUrl}\n\n${outroText}`
    : `${greeting}\n\n${introText}\n\n${outroText}`;

  const actionButton = actionUrl
    ? `
      <div style="text-align: center; margin: 25px 0;">
        <a href="${actionUrl}"
          style="
            background-color: #ff6b35;
            color: white;
            padding: 12px 25px;
            border-radius: 6px;
            text-decoration: none;
            font-weight: bold;
            display: inline-block;
          ">
          ${buttonText}
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
          <div style="text-align: center; background-color: rgba(0, 194, 255, 0.22); padding: 25px 20px;">
          <img
            src="https://res.cloudinary.com/dlsiyrp36/image/upload/v1760704843/electrahub_mwxx9p.png"
            alt="Electra Hub Logo"
            style="max-width: 120px; height: 50px; display: block; margin: 0 auto 10px;"
          />
          <h2 style="color: #333; margin: 0; font-size: 22px; font-weight: 600;">
            Electra Hub ⚡
          </h2>
        </div>
        <div style="padding: 20px;">
          <p style="font-size: 16px; color: #333;">${greeting}</p>
          <p style="font-size: 15px; color: #555;">${introText}</p>
          ${actionButton}
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
