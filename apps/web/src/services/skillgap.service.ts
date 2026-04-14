import axiosInstance from "../api/axiosInstance";
import { SkillGap } from "../types";

export const skillGapService = {
  async generateSkillGap(payload: any) {
    const response = await axiosInstance.post<{
      success: boolean;
      data: SkillGap;
    }>("/skillgap/analyze", payload);

    return response.data.data;
  },

  async getSkillGap() {
    const response = await axiosInstance.get<{
      success: boolean;
      data: SkillGap;
    }>("/skillgap/analysis");

    return response.data.data;
  },
};