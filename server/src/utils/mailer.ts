import "dotenv/config";
import nodemailer from "nodemailer";
const host = process.env.GMAIL_HOST || "smtp.gmail.com";
const user = process.env.GMAIL_USER!;
const pass = process.env.GMAIL_PASS!;

if (!user || !pass) {
  throw new Error("GMAIL_USER and GMAIL_PASS must be set in .env");
}

const transporter = nodemailer.createTransport({
  host,
  port: 587,
  secure: false,
  auth: {
    user,
    pass,
  },
});

transporter
  .verify()
  .then(() => {
    console.log("✅ Mailer connection verified successfully");
  })
  .catch((error) => {
    console.error("❌ Mailer verification failed:", error);
  });

export async function sendMail(to: string, subject: string, html: string) {
  try {
    console.log(`📧 Attempting to send email to: ${to}`);

    const info = await transporter.sendMail({
      from: `"PTA App" <${user}>`,
      to,
      subject,
      html,
    });

    console.log("✅ Email sent successfully:", {
      messageId: info.messageId,
      accepted: info.accepted,
      rejected: info.rejected,
    });

    return info;
  } catch (error) {
    console.error("❌ Error sending email:", error);
    throw error;
  }
}
