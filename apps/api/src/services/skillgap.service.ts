import { Types } from "mongoose";
import skillgapModel from "../models/skillgap.model";

export interface SkillGapInput {
  userId: Types.ObjectId | string;
  targetRole: string;
  currentSkills: string[];
  missingSkills: string[];
  matchPercentage: number;
  learningPlan: {
    skill: string;
    priority: string;
    weeks: number;
  }[];
}

export const createSkillGapAnalysis = async (skillGapData: SkillGapInput) => {
  const skillGapAnalysis = await skillgapModel.create(skillGapData);
  return skillGapAnalysis;
};

export const getLatestSkillGapAnalysis = async (userId: Types.ObjectId | string) => {
  return skillgapModel.findOne({ userId })
    .sort({ createdAt: -1 })
    .lean();
};
