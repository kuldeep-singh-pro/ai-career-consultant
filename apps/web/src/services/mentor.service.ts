import axiosInstance from '../api/axiosInstance';
import { MentorMessage, MentorSession } from '../types';

export const mentorService = {
  async sendMessage(sessionId: string, message: string) {
    const response = await axiosInstance.post<{ success: boolean; data: MentorMessage }>('/mentor/send', {
      sessionId,
      message,
    });
    return response.data.data;
  },

  async getMessageHistory(sessionId: string, limit: number = 50) {
    const response = await axiosInstance.get<{ success: boolean; data: MentorMessage[] }>('/mentor/history', {
      params: { sessionId, limit },
    });
    return response.data.data;
  },

  async getSessions() {
    const response = await axiosInstance.get<{ success: boolean; data: MentorSession[] }>('/mentor/sessions');
    return response.data.data;
  },

  async createSession(topic: string) {
    const response = await axiosInstance.post<{ success: boolean; data: MentorSession }>('/mentor/session', {
      topic,
    });
    return response.data.data;
  },

  async clearSession(sessionId: string) {
    const response = await axiosInstance.delete(`/mentor/session/${sessionId}`);
    return response.data.data;
  },
};
