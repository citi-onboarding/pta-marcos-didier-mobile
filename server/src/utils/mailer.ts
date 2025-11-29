import "dotenv/config";
import nodemailer from "nodemailer";
const host = process.env.GMAIL_HOST || "smtp.gmail.com";
const user = process.env.GMAIL_USER!;
const pass = process.env.GMAIL_PASS!;
const transporter = nodemailer.createTransport({
  host,
  port: 465,
  secure: true,
  auth: {
    user,
    pass,
  },
});

export async function sendMail(to: string, subject: string, html: string) {
  const info = await transporter.sendMail({
    from: `"No-Reply" <${user}>`,
    to,
    subject,
    html,
  });
  return info;
}
