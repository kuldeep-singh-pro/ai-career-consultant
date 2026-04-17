import axiosInstance from "../api/axiosInstance";
export const careerService = {
    async generateCareerPath() {
        const response = await axiosInstance.post("/career/generate");
        return response.data.data;
    },
    async generateQuickCareerPath(role) {
        const response = await axiosInstance.post("/career/generate-quick", { role });
        return response.data.data;
    },
    async generateRoadmap() {
        const response = await axiosInstance.post("/career/roadmap/generate");
        return response.data.data;
    },
    async getLatestCareerPath() {
        const response = await axiosInstance.get("/career/latest");
        return response.data.data;
    },
    async getCareerPathsWithProgress() {
        const response = await axiosInstance.get("/career/all-with-progress");
        return response.data.data;
    },
    async getCareerPath(pathId) {
        const response = await axiosInstance.get(`/career/${pathId}`);
        return response.data.data;
    },
    async deleteCareerPath(pathId) {
        const response = await axiosInstance.delete(`/career/${pathId}`);
        return response.data.data;
    },
    async updateMilestone(careerPathId, milestoneIndex, completed) {
        const response = await axiosInstance.patch(`/career/${careerPathId}/milestone`, {
            index: milestoneIndex,
            completed,
        });
        return response.data.data;
    },
    async updateResource(careerPathId, resourceIndex, completed) {
        const response = await axiosInstance.patch(`/career/${careerPathId}/resource`, {
            resourceIndex,
            completed,
        });
        return response.data.data;
    },
    async updateStatus(careerPathId, status) {
        const response = await axiosInstance.patch(`/career/${careerPathId}/status`, { status });
        return response.data.data;
    },
    async refreshProgress(careerPathId, progress) {
        const response = await axiosInstance.patch(`/career/${careerPathId}/progress`, { progress });
        return response.data.data;
    },
};
