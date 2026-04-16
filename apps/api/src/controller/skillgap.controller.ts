import { Response } from "express";

import { asyncHandler } from "../utils/asyncHandler";
import { successResponse } from "../utils/ApiResponse";

import {
  skillgapAnalysisWithAi
} from "../ai/agents/skillgap.agent";

import {
  createSkillGapAnalysis,
  getLatestSkillGapAnalysis,
  deleteSkillGapAnalysis
} from "../services/skillgap.service";

import { ResumeAnalysis } from "../models/resume.analysis";

import { AuthRequest } from "../types/auth.types";


export const generateSkillGapAnalysisController =
asyncHandler(
async (
  req: AuthRequest,
  res: Response
) =>
{
  const {
    targetRole
  } =
  req.body as {
    targetRole: string
  };

  const latestResumeAnalysis =
    await ResumeAnalysis
      .findOne({
        userId: req.user._id
      })
      .sort({
        createdAt: -1
      });

  if (!latestResumeAnalysis)
  {
    return successResponse(
      res,
      "Upload resume first",
      null
    );
  }

  const aiResult =
    await skillgapAnalysisWithAi(
      targetRole
    );

  const analysis =
    await createSkillGapAnalysis({
      userId: req.user._id,
      resumeId:
        latestResumeAnalysis.resumeId,
      targetRole,
      ...aiResult
    });

  return successResponse(
    res,
    "Skill gap analysis created successfully",
    analysis
  );
});


export const getSkillGapAnalysisController =
asyncHandler(
async (
  req: AuthRequest,
  res: Response
) =>
{
  const latestResumeAnalysis =
    await ResumeAnalysis
      .findOne({
        userId: req.user._id
      })
      .sort({
        createdAt: -1
      });

  if (!latestResumeAnalysis)
  {
    return successResponse(
      res,
      "No skill gap analysis found",
      null
    );
  }

  const analysis =
    await getLatestSkillGapAnalysis(
      req.user._id,
      latestResumeAnalysis.resumeId
    );

  return successResponse(
    res,
    "Skill gap analysis retrieved successfully",
    analysis
  );
});


export const deleteSkillGapAnalysisController =
asyncHandler(
async (
  req: AuthRequest,
  res: Response
) =>
{
  const latestResumeAnalysis =
    await ResumeAnalysis
      .findOne({
        userId: req.user._id
      })
      .sort({
        createdAt: -1
      });

  if (!latestResumeAnalysis)
  {
    return successResponse(
      res,
      "No skill gap analysis found",
      null
    );
  }

  await deleteSkillGapAnalysis(
    req.user._id,
    latestResumeAnalysis.resumeId
  );

  return successResponse(
    res,
    "Skill gap analysis deleted successfully",
    null
  );
});