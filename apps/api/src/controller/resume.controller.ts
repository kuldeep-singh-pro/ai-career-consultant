import { Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { extractTextFromPdf } from "../utils/pdfparser";
import { BadRequest } from "../errorHandler/httpError";
import { successResponse } from "../utils/ApiResponse";

import {
  processResumeUpload,
  getLatestResumeAnalysis,
} from "../services/resume.service";

import { AuthRequest } from "../types/auth.types";

export const uploadResumeController = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    if (!req.file) {
      throw new BadRequest("Resume file required");
    }

    const extractedText = await extractTextFromPdf(
      req.file.buffer
    );

    const analysis = await processResumeUpload(
      req.user._id,
      req.file.originalname,
      extractedText
    );

    return successResponse(
      res,
      "Resume uploaded and analyzed successfully",
      analysis
    );
  }
);

export const getResumeAnalysisController =
  asyncHandler(
    async (
      req: AuthRequest,
      res: Response
    ) => {
      const analysis =
        await getLatestResumeAnalysis(
          req.user._id
        );

      return successResponse(
        res,
        "Resume analysis retrieved successfully",
        analysis
      );
    }
  );