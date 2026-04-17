import axiosInstance from "../api/axiosInstance";
export const resumeService = {
    async uploadResume(file) {
        const formData = new FormData();
        formData.append("resume", file);
        const response = await axiosInstance.post("/resume/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data.data;
    },
    async analyzeResume() {
        const response = await axiosInstance.get("/resume/analysis");
        return response.data.data;
    },
    async getAnalysis() {
        const response = await axiosInstance.get("/resume/analysis");
        return response.data.data;
    },
};
