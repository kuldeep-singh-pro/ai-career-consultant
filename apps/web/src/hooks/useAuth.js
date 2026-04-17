import { useMutation } from '@tanstack/react-query';
import { authService } from '../services/auth.service';
export const useLogin = () => {
    return useMutation({
        mutationFn: (data) => authService.login(data),
    });
};
export const useRegister = () => {
    return useMutation({
        mutationFn: (data) => authService.register(data),
    });
};
export const useVerifyOTP = () => {
    return useMutation({
        mutationFn: (data) => authService.verifyOTP(data),
    });
};
export const useResetPassword = () => {
    return useMutation({
        mutationFn: (data) => authService.resetPassword(data),
    });
};
