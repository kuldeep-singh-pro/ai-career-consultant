import { Types } from "mongoose";
import CareerPathModel from "../models/careerpath.model";

export interface CareerPathInput {
  userId: Types.ObjectId | string;
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
  }[];
  learningResources: {
    name: string;
    type: "course" | "book" | "project" | "certification";
    duration: number;
    difficulty: "Beginner" | "Intermediate" | "Advanced";
  }[];
}

export const createCareerPath = async (careerPathData: CareerPathInput) => {
  const careerPath = await CareerPathModel.create({
    ...careerPathData,
    milestones: careerPathData.milestones.map((m) => ({
      ...m,
      completed: false,
    })),
    learningResources: careerPathData.learningResources.map((r) => ({
      ...r,
      completed: false,
    })),
  });
  return careerPath;
};

export const getCareerPathsByUserId = async (
  userId: Types.ObjectId | string
) => {
  return CareerPathModel.find({ userId })
    .sort({ createdAt: -1 })
    .lean();
};

export const getLatestCareerPath = async (
  userId: Types.ObjectId | string
) => {
  return CareerPathModel.findOne({ userId })
    .sort({ createdAt: -1 })
    .lean();
};

export const getCareerPathById = async (id: string) => {
  return CareerPathModel.findById(id).lean();
};

export const updateCareerPathProgress = async (
  id: string,
  progress: number
) => {
  return CareerPathModel.findByIdAndUpdate(
    id,
    { progress },
    { new: true }
  ).lean();
};

export const updateMilestoneCompletion = async (
  careerPathId: string,
  milestoneIndex: number,
  completed: boolean
) => {
  const careerPath = await CareerPathModel.findById(careerPathId);
  
  if (!careerPath) {
    throw new Error("Career path not found");
  }

  if (careerPath.milestones[milestoneIndex]) {
    careerPath.milestones[milestoneIndex].completed = completed;
    await careerPath.save();
  }

  return careerPath;
};

export const updateResourceCompletion = async (
  careerPathId: string,
  resourceIndex: number,
  completed: boolean
) => {
  const careerPath = await CareerPathModel.findById(careerPathId);
  
  if (!careerPath) {
    throw new Error("Career path not found");
  }

  if (careerPath.learningResources[resourceIndex]) {
    careerPath.learningResources[resourceIndex].completed = completed;
    await careerPath.save();
  }

  return careerPath;
};

export const updateCareerPathStatus = async (
  id: string,
  status: "active" | "completed" | "paused"
) => {
  return CareerPathModel.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  ).lean();
};

export const deleteCareerPath = async (id: string) => {
  return CareerPathModel.findByIdAndDelete(id);
};

export const getUserCareerPathsWithProgress = async (
  userId: Types.ObjectId | string
) => {
  const careerPaths = await CareerPathModel.find({ userId }).lean();
  
  return careerPaths.map((path: any) => {
    const totalMilestones = path.milestones?.length || 0;
    const completedMilestones =
      path.milestones?.filter((m: any) => m.completed).length || 0;

    const totalResources = path.learningResources?.length || 0;
    const completedResources =
      path.learningResources?.filter((r: any) => r.completed).length || 0;

    const milestonesProgress =
      totalMilestones > 0 ? (completedMilestones / totalMilestones) * 100 : 0;
    const resourcesProgress =
      totalResources > 0 ? (completedResources / totalResources) * 100 : 0;

    return {
      ...path,
      milestonesProgress,
      resourcesProgress,
      totalProgress: (milestonesProgress + resourcesProgress) / 2,
    };
  });
};
