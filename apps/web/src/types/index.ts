export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  profilePicture?: string;
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

export interface CareerPath {
  id: string;
  userId: string;
  title: string;
  description: string;
  milestones: Milestone[];
  progress: number;
  createdAt: string;
}

export interface CareerStep {
  id: string;
  step: number;
  title: string;
  description: string;
  duration: string;
  skills: string[];
  resources: string[];
}

export interface Roadmap {
  id: string;
  userId: string;
  careerPathId: string;
  title: string;
  description: string;
  milestones: Milestone[];
  timeline: string;
  currentMilestone: number;
  progress: number;
  createdAt: string;
}

export interface Milestone {
  id: string;
  number: number;
  title: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'in-progress' | 'completed';
  tasks: string[];
}

export interface MentorMessage {
  id: string;
  userId: string;
  sessionId: string;
  sender: 'user' | 'mentor';
  message: string;
  timestamp: string;
  type?: 'text' | 'suggestion' | 'recommendation';
}

export interface MentorSession {
  id: string;
  userId: string;
  topic: string;
  createdAt: string;
  updatedAt: string;
  messageCount: number;
}

export interface UserSettings {
  id: string;
  userId: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  darkMode: boolean;
  theme: 'light' | 'dark' | 'auto';
  language: string;
  timezone: string;
  privacy: {
    profileVisibility: 'public' | 'private';
    showEmail: boolean;
    showPhone: boolean;
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