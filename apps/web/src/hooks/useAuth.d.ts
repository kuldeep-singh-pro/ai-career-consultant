import { LoginRequest, RegisterRequest } from '../types';
export declare const useLogin: () => import("@tanstack/react-query").UseMutationResult<{
    token: string;
    user: import("../types").User;
}, Error, LoginRequest, unknown>;
export declare const useRegister: () => import("@tanstack/react-query").UseMutationResult<{
    token: string;
    user: import("../types").User;
}, Error, RegisterRequest, unknown>;
export declare const useVerifyOTP: () => import("@tanstack/react-query").UseMutationResult<any, Error, any, unknown>;
export declare const useResetPassword: () => import("@tanstack/react-query").UseMutationResult<any, Error, any, unknown>;
//# sourceMappingURL=useAuth.d.ts.map