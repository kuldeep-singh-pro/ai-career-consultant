import axiosInstance from "../api/axiosInstance";
import { CareerPath, Roadmap } from "../types";

export const careerService = {
  async generateCareerPath(payload: any) {
    const response = await axiosInstance.post<{
      success: boolean;
      data: CareerPath;
    }>("/career/generate", payload);

    return response.data.data;
  },

  async generateQuickCareerPath() {
    const response = await axiosInstance.post<{
      success: boolean;
      data: CareerPath;
    }>("/career/generate-quick");

    return response.data.data;
  },

  async getCareerPaths() {
    const response = await axiosInstance.get<{
      success: boolean;
      data: CareerPath[];
    }>("/career/all");

    return response.data.data;
  },

  async getCareerPathsWithProgress() {
    const response = await axiosInstance.get<{
      success: boolean;
      data: CareerPath[];
    }>("/career/all-with-progress");

    return response.data.data;
  },

  async getLatestCareerPath() {
    const response = await axiosInstance.get<{
      success: boolean;
      data: CareerPath;
    }>("/career/latest");

    return response.data.data;
  },

  async getCareerPath(pathId: string) {
    const response = await axiosInstance.get<{
      success: boolean;
      data: CareerPath;
    }>(`/career/${pathId}`);

    return response.data.data;
  },

  async updateProgress(pathId: string, progress: number) {
    const response = await axiosInstance.patch(
      `/career/${pathId}/progress`,
      { progress }
    );

    return response.data.data;
  },

  async updateMilestone(pathId: string, milestoneId: string) {
    const response = await axiosInstance.patch(
      `/career/${pathId}/milestone`,
      { milestoneId }
    );

    return response.data.data;
  },

  async updateResource(pathId: string, resourceId: string) {
    const response = await axiosInstance.patch(
      `/career/${pathId}/resource`,
      { resourceId }
    );

    return response.data.data;
  },

  async updateStatus(pathId: string, status: string) {
    const response = await axiosInstance.patch(
      `/career/${pathId}/status`,
      { status }
    );

    return response.data.data;
  },

  async deleteCareerPath(pathId: string) {
    const response = await axiosInstance.delete(
      `/career/${pathId}`
    );

    return response.data.data;
  },

  async generateRoadmap(payload: any) {
    const response = await axiosInstance.post<{
      success: boolean;
      data: Roadmap;
    }>("/career/roadmap/generate", payload);

    return response.data.data;
  },
};