import axiosInstance from "../api/axiosInstance";
import { UserSettings } from "../types";

export const settingsService = {
  async getSettings() {
    const response = await axiosInstance.get<{
      success: boolean;
      data: UserSettings;
    }>("/settings");

    return response.data.data;
  },

  async updateSettings(
    data: Partial<UserSettings>
  ) {
    const response =
      await axiosInstance.patch(
        "/settings",
        data
      );

    return response.data.data;
  },

  async getSummary() {
    const response =
      await axiosInstance.get(
        "/settings/summary"
      );

    return response.data.data;
  },

async deleteAccount() {
  const response =
    await axiosInstance.delete(
      "/user/me"
    );

  return response.data.data;
}
};