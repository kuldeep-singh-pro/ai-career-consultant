import axiosInstance from '../api/axiosInstance';
import { Profile } from '../types';

export const profileService = {
  async getProfile() {
    const response = await axiosInstance.get<{ success: boolean; data: Profile }>('/profile');
    return response.data.data;
  },

  async updateProfile(data: Partial<Profile>) {
    const response = await axiosInstance.put('/profile', data);
    return response.data.data;
  },

  async uploadProfilePicture(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axiosInstance.post('/profile/upload-picture', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data;
  },
};
