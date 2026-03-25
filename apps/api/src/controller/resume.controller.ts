import { Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { extractTextFromPdf } from "../utils/pdfparser";

import {
  processResumeUpload,
  getLatestResumeAnalysis
} from "../services/resume.service";

import { AuthRequest } from "../types/auth.types";

export const uploadResumeController = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume file required"
      });
    }

    console.log("File received:", req.file.originalname);

    const extractedText = await extractTextFromPdf(
      req.file.buffer
    );

    console.log("Extracted text length:", extractedText.length);

    const analysis = await processResumeUpload(
      req.user._id,
      req.file.originalname,
      extractedText
    );

    console.log("AI analysis success");

    return res.json({
      success: true,
      message: "Resume uploaded and analyzed successfully",
      data: analysis
    });
  }
);
export const getResumeAnalysisController = asyncHandler(
  async (req: AuthRequest, res: Response) => {

    const analysis = await getLatestResumeAnalysis(
      req.user._id
    );

    return res.json({
      success: true,
      data: analysis
    });
  }
);