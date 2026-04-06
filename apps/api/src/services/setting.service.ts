import { Types } from "mongoose";
import Settings from "../models/setting.model";

export interface SettingsInput {
  userId: Types.ObjectId | string;
  notifications?: {
    email?: boolean;
    push?: boolean;
    careerUpdates?: boolean;
    skillReminders?: boolean;
    mentorMessages?: boolean;
  };
  privacy?: {
    profileVisibility?: "public" | "private" | "connections";
    dataSharing?: boolean;
    analytics?: boolean;
  };
  preferences?: {
    language?: string;
    timezone?: string;
    theme?: "light" | "dark" | "auto";
    emailFrequency?: "daily" | "weekly" | "monthly" | "never";
  };
  career?: {
    targetRoles?: string[];
    industries?: string[];
    salaryRange?: {
      min?: number;
      max?: number;
      currency?: string;
    };
    workPreferences?: {
      remote?: boolean;
      hybrid?: boolean;
      onsite?: boolean;
      travel?: boolean;
    };
  };
  skills?: {
    focusAreas?: string[];
    learningStyle?: "visual" | "auditory" | "kinesthetic" | "reading";
    timeCommitment?: "low" | "medium" | "high";
  };
}

export const createDefaultSettings = async (userId: Types.ObjectId | string) => {
  const defaultSettings = {
    userId,
    notifications: {
      email: true,
      push: true,
      careerUpdates: true,
      skillReminders: true,
      mentorMessages: true,
    },
    privacy: {
      profileVisibility: "public" as const,
      dataSharing: false,
      analytics: true,
    },
    preferences: {
      language: "en",
      timezone: "UTC",
      theme: "auto" as const,
      emailFrequency: "weekly" as const,
    },
    career: {
      targetRoles: [],
      industries: [],
      salaryRange: {
        min: 0,
        max: 0,
        currency: "USD",
      },
      workPreferences: {
        remote: true,
        hybrid: true,
        onsite: false,
        travel: false,
      },
    },
    skills: {
      focusAreas: [],
      learningStyle: "visual" as const,
      timeCommitment: "medium" as const,
    },
  };

  return Settings.create(defaultSettings);
};

export const getUserSettings = async (userId: Types.ObjectId | string) => {
  let settings = await Settings.findOne({ userId }).lean();

  if (!settings) {
    settings = await createDefaultSettings(userId);
  }

  return settings;
};

export const updateUserSettings = async (
  userId: Types.ObjectId | string,
  updates: Partial<SettingsInput>
) => {
  let settings = await Settings.findOne({ userId });

  if (!settings) {
    settings = await createDefaultSettings(userId);
  }

  if (updates.notifications) {
    settings.notifications = { ...settings.notifications, ...updates.notifications };
  }

  if (updates.privacy) {
    settings.privacy = { ...settings.privacy, ...updates.privacy };
  }

  if (updates.preferences) {
    settings.preferences = { ...settings.preferences, ...updates.preferences };
  }

  if (updates.career) {
    if (updates.career.targetRoles !== undefined) {
      settings.career.targetRoles = updates.career.targetRoles;
    }
    if (updates.career.industries !== undefined) {
      settings.career.industries = updates.career.industries;
    }
    if (updates.career.salaryRange) {
      settings.career.salaryRange = { ...settings.career.salaryRange, ...updates.career.salaryRange };
    }
    if (updates.career.workPreferences) {
      settings.career.workPreferences = { ...settings.career.workPreferences, ...updates.career.workPreferences };
    }
  }

  if (updates.skills) {
    if (updates.skills.focusAreas !== undefined) {
      settings.skills.focusAreas = updates.skills.focusAreas;
    }
    if (updates.skills.learningStyle !== undefined) {
      settings.skills.learningStyle = updates.skills.learningStyle;
    }
    if (updates.skills.timeCommitment !== undefined) {
      settings.skills.timeCommitment = updates.skills.timeCommitment;
    }
  }

  await settings.save();
  return settings;
};

export const resetSettings = async (
  userId: Types.ObjectId | string,
  section?: "notifications" | "privacy" | "preferences" | "career" | "skills" | "all"
) => {
  let settings = await Settings.findOne({ userId });

  if (!settings) {
    return createDefaultSettings(userId);
  }

  if (section === "all" || !section) {
    return createDefaultSettings(userId);
  }

  const defaultSettings = await createDefaultSettings(userId.toString() + "_temp");
  const defaultData = defaultSettings.toObject();

  if (section === "notifications") {
    settings.notifications = defaultData.notifications;
  } else if (section === "privacy") {
    settings.privacy = defaultData.privacy;
  } else if (section === "preferences") {
    settings.preferences = defaultData.preferences;
  } else if (section === "career") {
    settings.career = defaultData.career;
  } else if (section === "skills") {
    settings.skills = defaultData.skills;
  }

  await settings.save();
  await Settings.findByIdAndDelete(defaultSettings._id);

  return settings;
};

export const deleteUserSettings = async (userId: Types.ObjectId | string) => {
  return Settings.findOneAndDelete({ userId });
};

export const getSettingsSummary = async (userId: Types.ObjectId | string) => {
  const settings = await getUserSettings(userId);

  return {
    notificationsEnabled: Object.values(settings.notifications).some(v => v),
    privacyLevel: settings.privacy.profileVisibility,
    theme: settings.preferences.theme,
    language: settings.preferences.language,
    targetRolesCount: settings.career.targetRoles.length,
    focusAreasCount: settings.skills.focusAreas.length,
  };
};
