import axiosInstance from '../api/axiosInstance';
import { Resume, ResumeAnalysis } from '../types';

export const resumeService = {
  async uploadResume(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axiosInstance.post<{ success: boolean; data: Resume }>('/resume/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data;
  },

  async analyzeResume(resumeId: string) {
    const response = await axiosInstance.post<{ success: boolean; data: ResumeAnalysis }>('/resume/analyze', {
      resumeId,
    });
    return response.data.data;
  },

  async getAnalysis(analysisId: string) {
    const response = await axiosInstance.get<{ success: boolean; data: ResumeAnalysis }>(`/resume/analysis/${analysisId}`);
    return response.data.data;
  },
};
