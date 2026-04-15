import { Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { successResponse } from "../utils/ApiResponse";
import {
  generateCareerPathWithAi,
  generateRoadmapWithAi,
} from "../ai/agents/career.agent";
import {
  createCareerPath,
  getCareerPathsByUserId,
  getLatestCareerPath,
  getCareerPathById,
  updateCareerPathProgress,
  updateMilestoneCompletion,
  updateResourceCompletion,
  updateCareerPathStatus,
  deleteCareerPath,
  getUserCareerPathsWithProgress,
} from "../services/career.service";
import { AuthRequest } from "../types/auth.types";
import { ResumeAnalysis } from "../models/resume.analysis";

export const generateCareerPathController = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { currentRole, targetRole, skills } = req.body;

    const aiResult = await generateCareerPathWithAi(
      currentRole,
      targetRole,
      skills
    );

    const careerPath = await createCareerPath({
      userId: req.user._id,
      ...aiResult,
    });

    return successResponse(
      res,
      "Career path generated successfully",
      careerPath,
      201
    );
  }
);

export const generateRoadmapController = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { currentRole, targetRole, timeframe } = req.body;

    const roadmap = await generateRoadmapWithAi(
      currentRole,
      targetRole,
      timeframe
    );

    return successResponse(
      res,
      "Roadmap generated successfully",
      roadmap
    );
  }
);

export const getCareerPathsController = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const careerPaths = await getCareerPathsByUserId(req.user._id);

    return successResponse(
      res,
      "Career paths retrieved successfully",
      careerPaths
    );
  }
);

export const getLatestCareerPathController = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const careerPath = await getLatestCareerPath(req.user._id);

    return successResponse(
      res,
      "Latest career path retrieved successfully",
      careerPath
    );
  }
);

export const getCareerPathDetailController = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    const careerPath = await getCareerPathById(id);

    return successResponse(
      res,
      "Career path details retrieved successfully",
      careerPath
    );
  }
);

export const updateProgressController = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    const updated =
      await updateCareerPathProgress(id);

    return successResponse(
      res,
      "Progress updated successfully",
      updated
    );
  }
);

export const updateMilestoneController = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const { milestoneIndex, completed } = req.body;

    const updated = await updateMilestoneCompletion(
      id,
      milestoneIndex,
      completed
    );

    return successResponse(
      res,
      "Milestone status updated successfully",
      updated
    );
  }
);

export const updateResourceController = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const { resourceIndex, completed } = req.body;

    const updated = await updateResourceCompletion(
      id,
      resourceIndex,
      completed
    );

    return successResponse(
      res,
      "Resource completion updated successfully",
      updated
    );
  }
);

export const updateStatusController = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;

    const updated = await updateCareerPathStatus(id, status);

    return successResponse(
      res,
      "Career path status updated successfully",
      updated
    );
  }
);

export const deleteCareerPathController = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    await deleteCareerPath(id);

    return successResponse(
      res,
      "Career path deleted successfully"
    );
  }
);

export const getCareerPathsWithProgressController = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const careerPaths = await getUserCareerPathsWithProgress(req.user._id);

    return successResponse(
      res,
      "Career paths with progress retrieved successfully",
      careerPaths
    );
  }
);

export const generateQuickCareerPathController = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { targetRole } = req.body;

    const resumeAnalysis = await ResumeAnalysis.findOne({
      userId: req.user._id,
    })
      .sort({ createdAt: -1 })
      .lean();

    const existingSkills = resumeAnalysis?.skills || [];
    const currentRole = resumeAnalysis?.experienceLevel || "Professional";

    const aiResult = await generateCareerPathWithAi(
      currentRole,
      targetRole,
      existingSkills
    );

    const careerPath = await createCareerPath({
      userId: req.user._id,
      ...aiResult,
    });

    return successResponse(
      res,
      "Quick career path generated from resume successfully",
      careerPath,
      201
    );
  }
);
