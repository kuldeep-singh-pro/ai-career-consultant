import { Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { successResponse } from "../utils/ApiResponse";
import {
  getDashboardStats,
  getDashboardOverview,
  getProgressAnalytics,
  getSkillAnalytics,
} from "../services/dashboard.service";
import { AuthRequest } from "../types/auth.types";

export const getDashboardStatsController = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const stats = await getDashboardStats(req.user._id);

    return successResponse(res, "Dashboard stats retrieved successfully", stats);
  }
);

export const getDashboardOverviewController = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const overview = await getDashboardOverview(req.user._id);

    return successResponse(res, "Dashboard overview retrieved successfully", overview);
  }
);

export const getProgressAnalyticsController = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const analytics = await getProgressAnalytics(req.user._id);

    return successResponse(res, "Progress analytics retrieved successfully", analytics);
  }
);

export const getSkillAnalyticsController = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const analytics = await getSkillAnalytics(req.user._id);

    return successResponse(res, "Skill analytics retrieved successfully", analytics);
  }
);
