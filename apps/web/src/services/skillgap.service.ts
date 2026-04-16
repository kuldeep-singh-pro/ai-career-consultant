import axiosInstance from "../api/axiosInstance";
import { SkillGap } from "../types";

export const skillGapService =
{
  async generateSkillGap(
    targetRole: string
  )
  {
    const response =
      await axiosInstance.post<
        {
          success: boolean;
          data: SkillGap;
        }
      >(
        "/skillgap/analyze",
        {
          targetRole
        }
      );

    return response.data.data;
  },

  async getSkillGap()
  {
    const response =
      await axiosInstance.get<
        {
          success: boolean;
          data: SkillGap | null;
        }
      >(
        "/skillgap/analysis"
      );

    return response.data.data;
  },

  async deleteSkillGap()
  {
    const response =
      await axiosInstance.delete(
        "/skillgap/analysis"
      );

    return response.data.data;
  }
};