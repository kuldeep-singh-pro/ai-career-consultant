import axiosInstance from "../api/axiosInstance";
import { Profile } from "../types";

export const userService = {
  async getCurrentUser() {
    const response =
      await axiosInstance.get(
        "/user/me"
      );

    return response.data.data;
  },

  async updateCurrentUser(
    data: Partial<Profile>
  ) {
    const response =
      await axiosInstance.patch(
        "/user/me",
        data
      );

    return response.data.data;
  },

  async uploadProfilePicture(
    file: File
  ) {
    const formData =
      new FormData();

    formData.append(
      "profilePicture",
      file
    );

    const response =
      await axiosInstance.post(
        "/user/upload-picture",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    return response.data.data;
  },

  async deleteAccount() {
    const response =
      await axiosInstance.delete(
        "/user/me"
      );

    return response.data.data;
  },
};