import nodemailer from "nodemailer";
import { env } from "../config/env";

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 2525,
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASS,
  },
});

export const sendMail = async (
  to: string,
  subject: string,
  html: string
) => {
  const info = await transporter.sendMail({
    from: `"Ai Carrer consultant" <kuldeepsinghwebdev@gmail.com>`,
    to,
    subject,
    html,
  });

  console.log("Mail sent:", info.messageId);
};