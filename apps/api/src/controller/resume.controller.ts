import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { uploadResumeService } from "../services/resume.service";

export const uploadResumeController =
  asyncHandler(async (req: Request, res: Response) => {
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "Resume file required",
      });
    }

    const user = (req as any).user;

    const resume = await uploadResumeService(
      user._id,
      file.originalname,
      file.buffer
    );

    return res.json({
      success: true,
      data: resume,
    });
  });