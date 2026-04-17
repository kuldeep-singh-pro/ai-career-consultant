import axiosInstance from "../api/axiosInstance";
import { User } from "../types";

export const userService = {
  async getCurrentUser(): Promise<User> {
    const response =
      await axiosInstance.get(
        "/user/me"
      );

    return response.data.data;
  },

  async updateCurrentUser(
    data: Partial<User>
  ): Promise<User> {
    const response =
      await axiosInstance.patch(
        "/user/me",
        data
      );

    return response.data.data;
  },

  async uploadProfilePicture(
    file: File
  ): Promise<User> {
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

  async deleteAccount(): Promise<void> {
    await axiosInstance.delete(
      "/user/me"
    );
  },
};