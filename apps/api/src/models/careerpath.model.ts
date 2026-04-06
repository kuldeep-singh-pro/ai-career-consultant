import mongoose, { Schema, Types } from "mongoose";

export interface ICareerPath {
  userId: Types.ObjectId;
  currentRole: string;
  targetRole: string;
  currentSkills: string[];
  requiredSkills: string[];
  matchPercentage: number;
  estimatedDuration: number;
  salaryRange: {
    current: number;
    target: number;
  };
  milestones: {
    title: string;
    duration: number;
    skills: string[];
    description: string;
    completed: boolean;
  }[];
  learningResources: {
    name: string;
    type: "course" | "book" | "project" | "certification";
    duration: number;
    difficulty: "Beginner" | "Intermediate" | "Advanced";
    url?: string;
    completed: boolean;
  }[];
  status: "active" | "completed" | "paused";
  startDate: Date;
  targetDate?: Date;
  progress: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const CareerPathSchema = new Schema<ICareerPath>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    currentRole: {
      type: String,
      required: true,
    },
    targetRole: {
      type: String,
      required: true,
    },
    currentSkills: [String],
    requiredSkills: [String],
    matchPercentage: Number,
    estimatedDuration: Number,
    salaryRange: {
      current: Number,
      target: Number,
    },
    milestones: [
      {
        title: String,
        duration: Number,
        skills: [String],
        description: String,
        completed: {
          type: Boolean,
          default: false,
        },
      },
    ],
    learningResources: [
      {
        name: String,
        type: {
          type: String,
          enum: ["course", "book", "project", "certification"],
        },
        duration: Number,
        difficulty: {
          type: String,
          enum: ["Beginner", "Intermediate", "Advanced"],
        },
        url: String,
        completed: {
          type: Boolean,
          default: false,
        },
      },
    ],
    status: {
      type: String,
      enum: ["active", "completed", "paused"],
      default: "active",
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    targetDate: Date,
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
  },
  { timestamps: true }
);

export default mongoose.model<ICareerPath>(
  "CareerPath",
  CareerPathSchema
);
