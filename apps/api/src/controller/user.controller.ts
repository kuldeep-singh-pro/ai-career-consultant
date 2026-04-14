import { Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { successResponse } from "../utils/ApiResponse";
import { User } from "../models/user.model";
import { AuthRequest } from "../types/auth.types";

export const getCurrentUserController = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const user = await User.findById(req.user._id).select("-password");

    return successResponse(res, "User retrieved successfully", user);
  }
);

export const updateCurrentUserController = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { password, role, ...safeUpdates } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      safeUpdates,
      { new: true, runValidators: true }
    ).select("-password");

    return successResponse(res, "User updated successfully", updatedUser);
  }
);

export const uploadProfilePictureController = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        profilePicture: req.file?.path,
      },
      { new: true }
    );

    return successResponse(
      res,
      "Profile picture uploaded successfully",
      updatedUser
    );
  }
);