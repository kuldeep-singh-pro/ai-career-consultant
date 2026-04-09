import { useMutation } from '@tanstack/react-query';
import { authService } from '../services/auth.service';
import { LoginRequest, RegisterRequest } from '../types';

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: LoginRequest) => authService.login(data),
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: (data: RegisterRequest) => authService.register(data),
  });
};

export const useVerifyOTP = () => {
  return useMutation({
    mutationFn: (data: any) => authService.verifyOTP(data),
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: (data: any) => authService.resetPassword(data),
  });
};
