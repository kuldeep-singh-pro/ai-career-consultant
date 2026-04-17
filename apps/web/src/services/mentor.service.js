import axiosInstance from "../api/axiosInstance";
export const mentorService = {
    async sendMessage(sessionId, message) {
        const response = await axiosInstance.post("/mentor/send", {
            sessionId,
            message,
        });
        return response.data.data;
    },
    async getMessageHistory(sessionId, limit = 50) {
        const response = await axiosInstance.get("/mentor/history", {
            params: {
                sessionId,
                limit,
            },
        });
        return response.data.data;
    },
    async getSessions() {
        const response = await axiosInstance.get("/mentor/sessions");
        return response.data.data;
    },
    async clearSession(sessionId) {
        const response = await axiosInstance.delete("/mentor/clear", {
            data: { sessionId },
        });
        return response.data.data;
    },
    async getChatContext() {
        const response = await axiosInstance.get("/mentor/context");
        return response.data.data;
    },
};
