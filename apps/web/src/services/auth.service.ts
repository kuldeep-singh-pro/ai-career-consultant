import axiosInstance from "../api/axiosInstance";
import {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  VerifyOTPRequest,
  ResetPasswordRequest,
} from "../types";

export const authService = {
  async register(data: RegisterRequest) {
    const response = await axiosInstance.post<AuthResponse>(
      "/auth/register",
      data
    );

    return response.data.data;
  },

  async verifyOTP(data: VerifyOTPRequest) {
    const response = await axiosInstance.post(
      "/auth/verify-otp",
      data
    );

    return response.data.data;
  },

  async resendOTP(email: string) {
    const response = await axiosInstance.post(
      "/auth/resend-otp",
      { email }
    );

    return response.data.data;
  },

  async login(data: LoginRequest) {
    const response = await axiosInstance.post<AuthResponse>(
      "/auth/login",
      data
    );

    const result = response.data.data;

    localStorage.setItem("token", result.token);
    localStorage.setItem("user", JSON.stringify(result.user));

    return result;
  },

  async forgotPassword(email: string) {
    const response = await axiosInstance.post(
      "/auth/forgot-password",
      { email }
    );

    return response.data.data;
  },

  async verifyResetOtp(email: string, otp: string) {
    const response = await axiosInstance.post(
      "/auth/verify-reset-otp",
      { email, otp }
    );

    return response.data.data;
  },

  async resetPassword(data: ResetPasswordRequest) {
    const response = await axiosInstance.post(
      "/auth/reset-password",
      data
    );

    return response.data.data;
  },

  async getMe() {
    const response = await axiosInstance.get("/auth/me");

    return response.data.data;
  },

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },
};