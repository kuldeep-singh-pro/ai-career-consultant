import { Types } from "mongoose";
import skillgapModel from "../models/skillgap.model";
import { DeleteResult } from "mongodb";
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
    resumeId: skillGapData.resumeId
  });

  return skillgapModel.create(skillGapData);
};

export const getLatestSkillGapAnalysis = async (
  userId: Types.ObjectId | string,
  resumeId: Types.ObjectId | string
) => {
  return skillgapModel
    .findOne({
      userId,
      resumeId
    })
    .sort({ createdAt: -1 })
    .lean();
};

export const deleteSkillGapAnalysis = async (
  userId: Types.ObjectId | string,
  resumeId: Types.ObjectId | string
): Promise<DeleteResult> => {
  return skillgapModel.deleteMany({
    userId,
    resumeId,
  });
};