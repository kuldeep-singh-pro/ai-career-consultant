import { Schema, model, Types } from "mongoose";

export interface IResumeAnalysis {
  userId: Types.ObjectId;
  resumeId: Types.ObjectId;

  score: number;

  skills: string[];
  missingSkills: string[];

  suggestions: string[];
  recommendedRoles: string[];

  strengths: string[];
  weaknesses: string[];

  careerRoadmap: string[];

  experienceLevel: string;

  jobTitle?: string | null;
  inferredRole?: string;
  currentRole?: string;

  createdAt?: Date;
  updatedAt?: Date;
}

const ResumeAnalysisSchema = new Schema<IResumeAnalysis>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    resumeId: {
      type: Schema.Types.ObjectId,
      ref: "Resume",
      required: true
    },

    score: Number,

    skills: [String],

    missingSkills: [String],

    suggestions: [String],

    recommendedRoles: [String],

    strengths: [String],

    weaknesses: [String],

    careerRoadmap: [String],

    experienceLevel: String,

    jobTitle: {
      type: String,
      default: null
    },

    inferredRole: {
      type: String
    },

    currentRole: {
      type: String
    }
  },
  { timestamps: true }
);

export const ResumeAnalysis = model<IResumeAnalysis>(
  "ResumeAnalysis",
  ResumeAnalysisSchema
);