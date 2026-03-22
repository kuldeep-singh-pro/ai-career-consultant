import { OTP } from "../models/otp.model";
import { sendMail } from "./mail.service";

export const generateOtp = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

export const createAndSendOtp = async (
  email: string,
  type: "verify" | "reset"
) => {
  const otp = generateOtp();

  await OTP.deleteMany({ email, type });

  await OTP.create({
    email,
    otp,
    type,
    expiresAt: new Date(Date.now() + 5 * 60 * 1000),
  });

  const subject =
    type === "verify"
      ? "Verify your account"
      : "Reset your password";

  await sendMail(
    email,
    subject,
    `<h2>Your OTP is ${otp}</h2>`
  );
};

export const verifyStoredOtp = async (
  email: string,
  otp: string,
  type: "verify" | "reset"
) => {
  const record = await OTP.findOne({ email, type });

  if (!record) return false;

  if (record.expiresAt < new Date()) return false;

  if (record.otp !== otp) return false;

  return true;
};