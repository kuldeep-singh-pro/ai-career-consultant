import { Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { successResponse } from "../utils/ApiResponse";
import {
  skillgapAnalysisWithAi,
} from "../ai/agents/skillgap.agent";
import {
  createSkillGapAnalysis,
  getLatestSkillGapAnalysis,
} from "../services/skillgap.service";
import { AuthRequest } from "../types/auth.types";

export const generateSkillGapAnalysisController = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { targetRole } = req.body as { targetRole: string };

    const aiResult = await skillgapAnalysisWithAi(targetRole);

    const analysis = await createSkillGapAnalysis({
      userId: req.user._id,
      targetRole,
      ...aiResult,
    });

    return successResponse(
      res,
      "Skill gap analysis created successfully",
      analysis
    );
  }
);

export const getSkillGapAnalysisController = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const analysis = await getLatestSkillGapAnalysis(req.user._id);

    return successResponse(res, "Skill gap analysis retrieved successfully", analysis);
  }
);
