import { Request, Response } from "express";
import { getAIResponse } from "../services/ai.service";
import { ApiResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";

export const aiChatController = asyncHandler(
  async (req: Request, res: Response) => {
    const { question } = req.body;

    const answer = await getAIResponse(question);

    res.json(new ApiResponse(true, "AI response generated", answer));
  }
);