import { Types } from "mongoose";
import skillgapModel from "../models/skillgap.model";

export interface SkillGapInput {
  userId: Types.ObjectId | string;
  resumeId: Types.ObjectId | string;
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

export const createSkillGapAnalysis = async (
  skillGapData: SkillGapInput
) => {
  await skillgapModel.deleteMany({
    userId: skillGapData.userId,
    resumeId: skillGapData.resumeId,
  });

  const newAnalysis =
    await skillgapModel.create(skillGapData);

  return newAnalysis;
};

export const getLatestSkillGapAnalysis = async (
  userId: Types.ObjectId | string,
  resumeId: Types.ObjectId | string
) => {
  return skillgapModel
    .findOne({
      userId,
      resumeId,
    })
    .sort({ createdAt: -1 })
    .lean();
};

export const deleteSkillGapAnalysis = async (
  userId: Types.ObjectId | string,
  resumeId: Types.ObjectId | string
) => {
  const result =
    await skillgapModel.deleteMany({
      userId,
      resumeId,
    });

  return result.deletedCount > 0;
};