import { LoginRequest, RegisterRequest, VerifyOTPRequest, ResetPasswordRequest } from "../types";
export declare const authService: {
    register(data: RegisterRequest): Promise<{
        token: string;
        user: import("../types").User;
    }>;
    verifyOTP(data: VerifyOTPRequest): Promise<any>;
    resendOTP(email: string): Promise<any>;
    login(data: LoginRequest): Promise<{
        token: string;
        user: import("../types").User;
    }>;
    forgotPassword(email: string): Promise<any>;
    verifyResetOtp(email: string, otp: string): Promise<any>;
    resetPassword(data: ResetPasswordRequest): Promise<any>;
    getMe(): Promise<any>;
    logout(): void;
};
//# sourceMappingURL=auth.service.d.ts.map