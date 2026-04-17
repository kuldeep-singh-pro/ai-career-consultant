import axiosInstance from "../api/axiosInstance";
export const settingsService = {
    async getSettings() {
        const response = await axiosInstance.get("/settings");
        return response.data.data;
    },
    async updateSettings(data) {
        const response = await axiosInstance.patch("/settings", data);
        return response.data.data;
    },
    async getSummary() {
        const response = await axiosInstance.get("/settings/summary");
        return response.data.data;
    },
    async deleteAccount() {
        const response = await axiosInstance.delete("/user/me");
        return response.data.data;
    }
};
