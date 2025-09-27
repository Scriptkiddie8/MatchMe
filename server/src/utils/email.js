const nodemailer = require("nodemailer");

let transporter = null;

function initTransporter({ host, port, user, pass }) {
  transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for 465, false for other ports
    auth: {
      user,
      pass,
    },
  });
}

async function sendMail({ from, to, subject, html, text }) {
  if (!transporter) throw new Error("Email transporter not initialized");
  const info = await transporter.sendMail({
    from,
    to,
    subject,
    text,
    html,
  });
  return info;
}

module.exports = { initTransporter, sendMail };
