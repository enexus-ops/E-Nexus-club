require('dotenv').config();
const nodemailer = require('nodemailer');

const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  CLUB_EMAIL
} = process.env;

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: Number(SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS
  }
});

async function sendContactEmail(req) {
  const { userName, userEmail, subject, message } = req.body;

  if (!userName || !userEmail || !subject || !message) {
    throw new Error('userName, userEmail, subject, and message are required');
  }

  const htmlContent = `
    <h3>New contact form submission</h3>
    <p><strong>Name:</strong> ${userName}</p>
    <p><strong>Email:</strong> <a href="mailto:${userEmail}">${userEmail}</a></p>
    <p><strong>Message:</strong></p>
    <p>${message.replace(/\n/g, '<br>')}</p>
  `;

  const info = await transporter.sendMail({
    from: `"ENexus" <enexus@klu.ac.in>`, 
    to: CLUB_EMAIL,
    replyTo: userEmail,
    subject: subject,
    html: htmlContent
  });

  console.log('Message sent:', info.messageId);
  return info;
}

module.exports = { sendContactEmail };
