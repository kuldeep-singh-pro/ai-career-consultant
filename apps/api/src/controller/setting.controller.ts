import { Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { successResponse } from "../utils/ApiResponse";
import {
  getUserSettings,
  updateUserSettings,
  resetSettings,
  deleteUserSettings,
  getSettingsSummary,
} from "../services/setting.service";
import { AuthRequest } from "../types/auth.types";

export const getSettingsController = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const settings = await getUserSettings(req.user._id);

    return successResponse(res, "Settings retrieved successfully", settings);
  }
);

export const updateSettingsController = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const updates = req.body;

    const updatedSettings = await updateUserSettings(req.user._id, updates);

    return successResponse(res, "Settings updated successfully", updatedSettings);
  }
);

export const resetSettingsController = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { section } = req.body;

    const resetResult = await resetSettings(req.user._id, section);

    return successResponse(res, "Settings reset successfully", resetResult);
  }
);

export const getSettingsSummaryController = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const summary = await getSettingsSummary(req.user._id);

    return successResponse(res, "Settings summary retrieved successfully", summary);
  }
);

export const deleteSettingsController = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    await deleteUserSettings(req.user._id);

    return successResponse(res, "Settings deleted successfully");
  }
);
