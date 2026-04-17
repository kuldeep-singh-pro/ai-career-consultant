import axiosInstance from "../api/axiosInstance";

export const careerService = {
  async generateCareerPath() {
    const response = await axiosInstance.post("/career/generate");
    return response.data.data;
  },

  async generateQuickCareerPath(role: string) {
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

  async getCareerPath(pathId: string) {
    const response = await axiosInstance.get(`/career/${pathId}`);
    return response.data.data;
  },

  async deleteCareerPath(pathId: string) {
    const response = await axiosInstance.delete(`/career/${pathId}`);
    return response.data.data;
  },

  async updateMilestone(
    careerPathId: string,
    milestoneIndex: number,
    completed: boolean
  ) {
    const response = await axiosInstance.patch(
      `/career/${careerPathId}/milestone`,
      {
        index: milestoneIndex,
        completed,
      }
    );
    return response.data.data;
  },

  async updateResource(
    careerPathId: string,
    resourceIndex: number,
    completed: boolean
  ) {
    const response = await axiosInstance.patch(
      `/career/${careerPathId}/resource`,
      {
        resourceIndex,
        completed,
      }
    );
    return response.data.data;
  },

  async updateStatus(careerPathId: string, status: string) {
    const response = await axiosInstance.patch(
      `/career/${careerPathId}/status`,
      { status }
    );
    return response.data.data;
  },

  async refreshProgress(careerPathId: string, progress: number) {
    const response = await axiosInstance.patch(
      `/career/${careerPathId}/progress`,
      { progress }
    );
    return response.data.data;
  },
};