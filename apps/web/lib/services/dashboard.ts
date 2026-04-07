import { apiClient } from "./api";

export interface DashboardStats {
  resume: {
    hasResume: boolean;
    skillsCount: number;
    lastAnalyzed: string | null;
  };
  skillGap: {
    hasAnalysis: boolean;
    matchPercentage: number;
    missingSkillsCount: number;
    lastAnalyzed: string | null;
  };
  career: {
    totalPaths: number;
    activePaths: number;
    completedPaths: number;
    overallProgress: number;
    resourceProgress: number;
  };
  mentor: {
    totalConversations: number;
    lastConversation: string | null;
  };
  settings: {
    isConfigured: boolean;
    theme: string;
  };
}

export interface RecentActivity {
  careerPaths: Array<{
    id: string;
    title: string;
    progress: number;
    status: string;
    updatedAt: string;
  }>;
  skillGaps: Array<{
    id: string;
    targetRole: string;
    matchPercentage: number;
  }>;
  chats: Array<{
    id: string;
    message: string;
    timestamp: string;
  }>;
}

export interface DashboardOverview {
  stats: DashboardStats;
  recentActivity: RecentActivity;
}

export const dashboardService = {
  async getStats(): Promise<DashboardStats> {
    const response = await apiClient.get<{ success: boolean; data: DashboardStats }>("/dashboard/stats");
    return response.data;
  },

  async getOverview(): Promise<DashboardOverview> {
    const response = await apiClient.get<{ success: boolean; data: DashboardOverview }>("/dashboard/overview");
    return response.data;
  },

  async getProgressAnalytics() {
    const response = await apiClient.get("/dashboard/progress");
    return response.data;
  },

  async getSkillAnalytics() {
    const response = await apiClient.get("/dashboard/skills");
    return response.data;
  },
};