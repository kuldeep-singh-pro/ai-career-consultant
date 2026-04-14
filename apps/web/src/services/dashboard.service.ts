import axiosInstance from "../api/axiosInstance";
import { DashboardStats } from "../types";

export const dashboardService = {
  async getStats() {
    const response = await axiosInstance.get<{
      success: boolean;
      data: DashboardStats;
    }>("/dashboard/stats");

    return response.data.data;
  },

  async getOverview() {
    const response = await axiosInstance.get<{
      success: boolean;
      data: any;
    }>("/dashboard/overview");

    return response.data.data;
  },

  async getProgress() {
    const response = await axiosInstance.get<{
      success: boolean;
      data: any;
    }>("/dashboard/progress");

    return response.data.data;
  },

  async getSkillsAnalytics() {
    const response = await axiosInstance.get<{
      success: boolean;
      data: any;
    }>("/dashboard/skills");

    return response.data.data;
  },
};