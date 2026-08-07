const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // If nodemailer credentials are non-default, try sending via SMTP transport
  if (
    process.env.EMAIL_USER &&
    process.env.EMAIL_USER !== 'noreply.careerforge@gmail.com'
  ) {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const message = {
      from: `CareerForge <${process.env.EMAIL_USER}>`,
      to: options.email,
      subject: options.subject,
      text: options.message,
      html: options.html,
    };

    const info = await transporter.sendMail(message);
    console.log(`[Email Service] Email sent successfully to ${options.email}: ${info.messageId}`);
    return info;
  }

  // Development fallback: Log reset token details to console so testing is instantaneous
  console.log('====================================================');
  console.log(`[EMAIL SIMULATION] Sent To: ${options.email}`);
  console.log(`[EMAIL SIMULATION] Subject: ${options.subject}`);
  console.log(`[EMAIL SIMULATION] Message:\n${options.message}`);
  console.log('====================================================');
  return { simulated: true };
};

module.exports = sendEmail;
