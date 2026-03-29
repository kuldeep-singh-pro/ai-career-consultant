import { Router } from "express";

import {
  registerController,
  verifyOtpController,
  resendOtpController,
  loginController,
  forgotPasswordController,
  verifyResetOtpController,
  resetPasswordController,
  getMeController,
} from "../controller/auth.controller";

import { validate } from "../middleware/validate.middleware";
import protect from "../middleware/auth.middleware";

import {
  registerDto,
  verifyOtpDto,
  loginDto,
  resendOtpDto,
  forgotPasswordDto,
  verifyResetOtpDto,
  resetPasswordDto,
} from "../dto/auth.dto";

const router: Router = Router();

router.post("/register", validate(registerDto), registerController);

router.post("/verify-otp", validate(verifyOtpDto), verifyOtpController);

router.post("/resend-otp", validate(resendOtpDto), resendOtpController);

router.post("/login", validate(loginDto), loginController);

router.post(
  "/forgot-password",
  validate(forgotPasswordDto),
  forgotPasswordController
);

router.post(
  "/verify-reset-otp",
  validate(verifyResetOtpDto),
  verifyResetOtpController
);

router.post(
  "/reset-password",
  validate(resetPasswordDto),
  resetPasswordController
);

router.get("/me", protect, getMeController);

export default router;