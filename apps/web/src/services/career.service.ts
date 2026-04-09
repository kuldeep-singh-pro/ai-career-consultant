import axiosInstance from '../api/axiosInstance';
import { CareerPath, Roadmap, Milestone } from '../types';

export const careerService = {
  async generateCareerPath() {
    const response = await axiosInstance.post<{ success: boolean; data: CareerPath }>('/career/generate');
    return response.data.data;
  },

  async getCareerPaths() {
    const response = await axiosInstance.get<{ success: boolean; data: CareerPath[] }>('/career/paths');
    return response.data.data;
  },

  async getCareerPath(pathId: string) {
    const response = await axiosInstance.get<{ success: boolean; data: CareerPath }>(`/career/paths/${pathId}`);
    return response.data.data;
  },

  async updateCareerPath(pathId: string, data: Partial<CareerPath>) {
    const response = await axiosInstance.put(`/career/paths/${pathId}`, data);
    return response.data.data;
  },

  async deleteCareerPath(pathId: string) {
    const response = await axiosInstance.delete(`/career/paths/${pathId}`);
    return response.data.data;
  },

  async generateRoadmap(careerPathId: string) {
    const response = await axiosInstance.post<{ success: boolean; data: Roadmap }>('/roadmap/generate', {
      careerPathId,
    });
    return response.data.data;
  },

  async getRoadmaps() {
    const response = await axiosInstance.get<{ success: boolean; data: Roadmap[] }>('/roadmap');
    return response.data.data;
  },

  async getRoadmap(roadmapId: string) {
    const response = await axiosInstance.get<{ success: boolean; data: Roadmap }>(`/roadmap/${roadmapId}`);
    return response.data.data;
  },

  async updateMilestone(roadmapId: string, milestoneId: string, status: string) {
    const response = await axiosInstance.put(`/roadmap/${roadmapId}/milestone/${milestoneId}`, { status });
    return response.data.data;
  },
};
