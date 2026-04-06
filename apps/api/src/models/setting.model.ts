import mongoose, { Schema, Types } from "mongoose";

export interface ISettings {
  userId: Types.ObjectId;
  notifications: {
    email: boolean;
    push: boolean;
    careerUpdates: boolean;
    skillReminders: boolean;
    mentorMessages: boolean;
  };
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

const SettingsSchema = new Schema<ISettings>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    notifications: {
      email: { type: Boolean, default: true },
      push: { type: Boolean, default: true },
      careerUpdates: { type: Boolean, default: true },
      skillReminders: { type: Boolean, default: true },
      mentorMessages: { type: Boolean, default: true },
    },
    privacy: {
      profileVisibility: { type: String, enum: ["public", "private", "connections"], default: "public" },
      dataSharing: { type: Boolean, default: false },
      analytics: { type: Boolean, default: true },
    },
    preferences: {
      language: { type: String, default: "en" },
      timezone: { type: String, default: "UTC" },
      theme: { type: String, enum: ["light", "dark", "auto"], default: "auto" },
      emailFrequency: { type: String, enum: ["daily", "weekly", "monthly", "never"], default: "weekly" },
    },
    career: {
      targetRoles: [String],
      industries: [String],
      salaryRange: {
        min: { type: Number, default: 0 },
        max: { type: Number, default: 0 },
        currency: { type: String, default: "USD" },
      },
      workPreferences: {
        remote: { type: Boolean, default: true },
        hybrid: { type: Boolean, default: true },
        onsite: { type: Boolean, default: false },
        travel: { type: Boolean, default: false },
      },
    },
    skills: {
      focusAreas: [String],
      learningStyle: { type: String, enum: ["visual", "auditory", "kinesthetic", "reading"], default: "visual" },
      timeCommitment: { type: String, enum: ["low", "medium", "high"], default: "medium" },
    },
  },
  { timestamps: true }
);

export default mongoose.model<ISettings>(
  "Settings",
  SettingsSchema
);
