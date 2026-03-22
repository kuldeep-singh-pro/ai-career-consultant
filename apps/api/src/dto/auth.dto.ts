import { z } from "zod";

export const registerDto = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

export const verifyOtpDto = z.object({
  email: z.string().email(),
  otp: z.string().length(6),
});

export const loginDto = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const resendOtpDto = z.object({
  email: z.string().email(),
});

export const forgotPasswordDto = z.object({
  email: z.string().email(),
});

export const verifyResetOtpDto = z.object({
  email: z.string().email(),
  otp: z.string().length(6),
});

export const resetPasswordDto = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});