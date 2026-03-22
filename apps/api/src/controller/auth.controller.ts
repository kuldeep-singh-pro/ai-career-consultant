import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";

import {
  registerUserService,
  loginUserService,
  verifyUserService,
  checkUserForOtpResendService,
  resetPasswordService,
} from "../services/auth.service";

import {
  createAndSendOtp,
  verifyStoredOtp,
} from "../services/otp.service";

export const registerController = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    await registerUserService(name, email, password);

    await createAndSendOtp(email, "verify");

    return res.json({
      success: true,
      message: "OTP sent successfully",
    });
  }
);

export const verifyOtpController = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, otp } = req.body;

    const valid = await verifyStoredOtp(
      email,
      otp,
      "verify"
    );

    if (!valid) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    await verifyUserService(email);

    return res.json({
      success: true,
      message: "Account verified successfully",
    });
  }
);

export const resendOtpController = asyncHandler(
  async (req: Request, res: Response) => {
    const { email } = req.body;

    await checkUserForOtpResendService(email);

    await createAndSendOtp(email, "verify");

    return res.json({
      success: true,
      message: "OTP resent successfully",
    });
  }
);

export const loginController = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const data = await loginUserService(email, password);

    return res.json({
      success: true,
      data,
    });
  }
);

export const forgotPasswordController = asyncHandler(
  async (req: Request, res: Response) => {
    const { email } = req.body;

    await createAndSendOtp(email, "reset");

    return res.json({
      success: true,
      message: "Reset OTP sent successfully",
    });
  }
);

export const verifyResetOtpController = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, otp } = req.body;

    const valid = await verifyStoredOtp(
      email,
      otp,
      "reset"
    );

    if (!valid) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    return res.json({
      success: true,
      message: "OTP verified",
    });
  }
);

export const resetPasswordController = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    await resetPasswordService(email, password);

    return res.json({
      success: true,
      message: "Password reset successfully",
    });
  }
);

export const getMeController = asyncHandler(
  async (req: Request, res: Response) => {
    const user = (req as any).user;

    return res.json({
      success: true,
      data: user,
    });
  }
);