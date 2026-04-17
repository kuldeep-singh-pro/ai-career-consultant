import axiosInstance from "../api/axiosInstance";
export const authService = {
    async register(data) {
        const response = await axiosInstance.post("/auth/register", data);
        return response.data.data;
    },
    async verifyOTP(data) {
        const response = await axiosInstance.post("/auth/verify-otp", data);
        return response.data.data;
    },
    async resendOTP(email) {
        const response = await axiosInstance.post("/auth/resend-otp", { email });
        return response.data.data;
    },
    async login(data) {
        const response = await axiosInstance.post("/auth/login", data);
        const result = response.data.data;
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));
        return result;
    },
    async forgotPassword(email) {
        const response = await axiosInstance.post("/auth/forgot-password", { email });
        return response.data.data;
    },
    async verifyResetOtp(email, otp) {
        const response = await axiosInstance.post("/auth/verify-reset-otp", { email, otp });
        return response.data.data;
    },
    async resetPassword(data) {
        const response = await axiosInstance.post("/auth/reset-password", data);
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
