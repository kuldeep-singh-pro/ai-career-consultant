import axiosInstance from '../api/axiosInstance';
import { SkillGap } from '../types';

export const skillGapService = {
  async generateSkillGap() {
    const response = await axiosInstance.post<{ success: boolean; data: SkillGap }>('/skillgap/generate');
    return response.data.data;
  },

  async getSkillGap() {
    const response = await axiosInstance.get<{ success: boolean; data: SkillGap }>('/skillgap/latest');
    return response.data.data;
  },

  async updateSkillGap(skillGapId: string, analysis: any) {
    const response = await axiosInstance.put(`/skillgap/${skillGapId}`, { analysis });
    return response.data.data;
  },
};
