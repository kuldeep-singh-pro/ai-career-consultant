import axiosInstance from '../api/axiosInstance';
import { AuthResponse, LoginRequest, RegisterRequest, VerifyOTPRequest, ResetPasswordRequest } from '../types';

export const authService = {
  async register(data: RegisterRequest) {
    const response = await axiosInstance.post<AuthResponse>('/auth/register', data);
    return response.data.data;
  },

  async verifyOTP(data: VerifyOTPRequest) {
    const response = await axiosInstance.post('/auth/verify-otp', data);
    return response.data.data;
  },

  async login(data: LoginRequest) {
    const response = await axiosInstance.post<AuthResponse>('/auth/login', data);
    return response.data.data;
  },

  async resetPassword(data: ResetPasswordRequest) {
    const response = await axiosInstance.post('/auth/reset-password', data);
    return response.data.data;
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};
