import axiosInstance from "../api/axiosInstance";
import { Resume, ResumeAnalysis } from "../types";

export const resumeService = {
  async uploadResume(file: File) {
    const formData = new FormData();

    formData.append("resume", file);

    const response = await axiosInstance.post<{
      success: boolean;
      data: Resume;
    }>("/resume/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data.data;
  },

  async analyzeResume() {
    const response = await axiosInstance.get<{
      success: boolean;
      data: ResumeAnalysis;
    }>("/resume/analysis");

    return response.data.data;
  },

  async getAnalysis() {
    const response = await axiosInstance.get<{
      success: boolean;
      data: ResumeAnalysis;
    }>("/resume/analysis");

    return response.data.data;
  },
};