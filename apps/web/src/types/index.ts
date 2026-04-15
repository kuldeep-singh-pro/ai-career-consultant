export interface User {
  id: string;
  email: string;
  name: string;
  role: "user" | "admin";
  profilePicture?: string;
  isVerified?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: User;
  };
}

export interface OTPRequest {
  email: string;
}

export interface VerifyOTPRequest {
  email: string;
  otp: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface ResetPasswordRequest {
  email: string;
  password: string;
}

export interface Resume {
  id: string;
  userId: string;
  fileName: string;
  fileUrl: string;
  uploadedAt: string;
  status: string;
}

export interface ResumeAnalysis {
  id: string;
  userId: string;
  resumeId: string;
  summary: string;
  skills: string[];
  keyHighlights: string[];
  improvementAreas: string[];
  aiSuggestions: string;
  createdAt: string;
}

export interface SkillGap {
  id: string;
  userId: string;
  targetRole: string;
  currentSkills: string[];
  missingSkills: string[];
  matchPercentage: number;
  learningPlan: {
    skill: string;
    priority: string;
    weeks: number;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface CareerMilestone {
  title: string;
  description: string;
  completed: boolean;
}

export interface CareerPath {
  id: string;
  userId: string;
  targetRole: string;
  currentRole: string;
  matchPercentage: number;
  milestones: CareerMilestone[];
  progress: number;
  totalProgress?: number;
  createdAt: string;
  updatedAt?: string;
}

export interface RoadmapMilestone {
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
}

export interface Roadmap {
  id: string;
  userId: string;
  careerPathId: string;
  title: string;
  milestones: RoadmapMilestone[];
  progress: number;
  createdAt: string;
}

export interface MentorMessage {
  id: string;
  userId: string;
  sessionId: string;
  message: string;
  response: string;
  messageType: "user" | "assistant";
  timestamp: string;
}

export interface MentorSession {
  sessionId: string;
  messageCount: number;
  firstMessage: string;
  lastMessage: string;
  title?: string;
}

export interface UserSettings {
  id: string;
  userId: string;
  privacy: {
    profileVisibility: "public" | "private" | "connections";
    dataSharing: boolean;
    analytics: boolean;
  };
  preferences: {
    language: string;
    timezone: string;
    theme: "light" | "dark" | "auto";
    emailFrequency: "daily" | "weekly" | "monthly" | "never";
  };
  career: {
    targetRoles: string[];
    industries: string[];
    salaryRange: {
      min: number;
      max: number;
      currency: string;
    };
    workPreferences: {
      remote: boolean;
      hybrid: boolean;
      onsite: boolean;
      travel: boolean;
    };
  };
  skills: {
    focusAreas: string[];
    learningStyle: "visual" | "auditory" | "kinesthetic" | "reading";
    timeCommitment: "low" | "medium" | "high";
  };
}

export interface DashboardStats {
  resume: {
    hasResume: boolean;
    skillsCount: number;
    lastAnalyzed?: string;
  };
  skillGap: {
    hasAnalysis: boolean;
    matchPercentage: number;
    missingSkillsCount: number;
    lastAnalyzed?: string;
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
    lastConversation?: string;
  };
  settings: {
    isConfigured: boolean;
    theme: string;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}