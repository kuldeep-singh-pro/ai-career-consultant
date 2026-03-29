import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { BadRequest } from "../errorHandler/httpError";
import { successResponse } from "../utils/ApiResponse";

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

    return successResponse(res, "OTP sent successfully");
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
      throw new BadRequest("Invalid OTP");
    }

    await verifyUserService(email);

    return successResponse(res, "Account verified successfully");
  }
);

export const resendOtpController = asyncHandler(
  async (req: Request, res: Response) => {
    const { email } = req.body;

    await checkUserForOtpResendService(email);

    await createAndSendOtp(email, "verify");

    return successResponse(res, "OTP resent successfully");
  }
);

export const loginController = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const data = await loginUserService(email, password);

    return successResponse(res, "Login successful", data);
  }
);

export const forgotPasswordController = asyncHandler(
  async (req: Request, res: Response) => {
    const { email } = req.body;

    await createAndSendOtp(email, "reset");

    return successResponse(res, "Reset OTP sent successfully");
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
      throw new BadRequest("Invalid OTP");
    }

    return successResponse(res, "OTP verified");
  }
);

export const resetPasswordController = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    await resetPasswordService(email, password);

    return successResponse(res, "Password reset successfully");
  }
);

export const getMeController = asyncHandler(
  async (req: Request, res: Response) => {
    const user = (req as any).user;

    return successResponse(res, "User retrieved successfully", user);
  }
);