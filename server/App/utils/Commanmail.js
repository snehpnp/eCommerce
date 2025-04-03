const nodemailer = require("nodemailer");

const sendMail = async (to, subject, htmlContent) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465, // Secure port for Gmail SMTP
      secure: true, // Use SSL
      auth: {
        user: process.env.EMAIL_USER, // Sender Email
        pass: process.env.EMAIL_PASS, // App Password (Not your actual password)
      },
    });

    const mailOptions = {
      from: `"Your Bedding Lenen " <${process.env.EMAIL_USER}>`, // Sender Name
      to,
      cc: process.env.CC_EMAIL, // CC Email (if needed)
      subject,
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${to}: ${info.messageId}`);
    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.error("❌ Error sending email:", error.message);
    return { success: false, message: "Failed to send email", error };
  }
};

module.exports = sendMail;
