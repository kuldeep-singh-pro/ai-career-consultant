import { Schema, model, Types } from "mongoose";

export interface IResumeAnalysis {
  userId: Types.ObjectId;
  resumeId: Types.ObjectId;

  score: number;
  skills: string[];

  suggestions: string[];
  recommendedRoles: string[];

  strengths: string[];
  weaknesses: string[];

  experienceLevel: string;

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

    suggestions: [String],

    recommendedRoles: [String],

    strengths: [String],

    weaknesses: [String],

    experienceLevel: String
  },
  { timestamps: true }
);

export const ResumeAnalysis = model<IResumeAnalysis>(
  "ResumeAnalysis",
  ResumeAnalysisSchema
);