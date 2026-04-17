import { Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { successResponse } from "../utils/ApiResponse";
import { AuthRequest } from "../types/auth.types";
import skillgapModel from "../models/skillgap.model";
import CareerPath from "../models/careerpath.model";
import * as careerService from "../services/career.service";
import * as careerAi from "../ai/agents/career.agent";

export const generateCareerPathController = asyncHandler(async (req: AuthRequest, res: Response) => {
  const skillgap = await skillgapModel.findOne({ userId: req.user._id }).sort({ createdAt: -1 });
  if (!skillgap) throw new Error("Skill gap required");
  const skills = skillgap.currentSkills.map((s: any) => (typeof s === "string" ? s : s.name));
  const ai = await careerAi.generateCareerPathWithAi("Student", skillgap.targetRole, skills);
  const path = await careerService.createCareerPath({
    userId: req.user._id,
    title: skillgap.targetRole,
    description: ai.description,
    milestones: ai.milestones,
    currentRole: "Student",
    currentSkills: skills,
    matchPercentage: ai.matchPercentage,
  });
  return successResponse(res, "Generated", path);
});

export const generateQuickCareerPathController = asyncHandler(async (req: AuthRequest, res: Response) => {
  const ai = await careerAi.generateCareerPathWithAi("Entry Level", req.body.role, []);
  const path = await careerService.createCareerPath({
    userId: req.user._id,
    title: req.body.role,
    description: ai.description,
    milestones: ai.milestones,
    currentRole: "Entry Level",
    currentSkills: [],
    matchPercentage: ai.matchPercentage,
  });
  return successResponse(res, "Quick path generated", path);
});

export const generateRoadmapController = asyncHandler(async (req: AuthRequest, res: Response) => {
  const skillgap = await skillgapModel.findOne({ userId: req.user._id }).sort({ createdAt: -1 });
  if (!skillgap) throw new Error("Skill gap required");
  const roadmap = await careerAi.generateRoadmapWithAi("Student", skillgap.targetRole, 6);
  return successResponse(res, "Roadmap generated", roadmap);
});

export const getCareerPathsController = asyncHandler(async (req: AuthRequest, res: Response) => {
  const paths = await CareerPath.find({ userId: req.user._id }).sort({ createdAt: -1 });
  return successResponse(res, "Fetched", paths);
});

export const getCareerPathsWithProgressController = asyncHandler(async (req: AuthRequest, res: Response) => {
  const paths = await careerService.getCareerPathsWithProgress(req.user._id);
  return successResponse(res, "Fetched with progress", paths);
});

export const getLatestCareerPathController = asyncHandler(async (req: AuthRequest, res: Response) => {
  const paths = await careerService.getCareerPathsWithProgress(req.user._id);
  return successResponse(res, "Latest fetched", paths[0]);
});

export const getCareerPathDetailController = asyncHandler(async (req: AuthRequest, res: Response) => {
  const path = await CareerPath.findOne({ _id: req.params.id, userId: req.user._id });
  return successResponse(res, "Detail fetched", path);
});

export const updateProgressController = asyncHandler(async (req: AuthRequest, res: Response) => {
  const updated = await careerService.refreshCareerProgress(req.params.id, req.body.progress);
  return successResponse(res, "Progress updated", updated);
});

export const updateMilestoneController = asyncHandler(async (req: AuthRequest, res: Response) => {
  const updated = await careerService.updateMilestoneStatus(req.params.id, req.body.index, req.body.completed);
  return successResponse(res, "Milestone updated", updated);
});

export const updateResourceController = asyncHandler(async (req: AuthRequest, res: Response) => {
  const path = await CareerPath.findById(req.params.id);
  return successResponse(res, "Resource status updated", path);
});

export const updateStatusController = asyncHandler(async (req: AuthRequest, res: Response) => {
  const updated = await careerService.updateCareerStatus(req.params.id, req.body.status);
  return successResponse(res, "Status updated", updated);
});

export const deleteCareerPathController = asyncHandler(async (req: AuthRequest, res: Response) => {
  await careerService.deleteCareerPathById(req.params.id, req.user._id);
  return successResponse(res, "Deleted");
});