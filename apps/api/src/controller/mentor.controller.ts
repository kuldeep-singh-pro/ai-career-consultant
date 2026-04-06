import { Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { successResponse } from "../utils/ApiResponse";
import {
  sendMessage,
  getChatHistory,
  getChatHistoryBySession,
  clearChatHistory,
  generateChatResponse,
  getChatSessions,
} from "../services/mentor.service";
import { AuthRequest } from "../types/auth.types";

export const sendMessageController = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { message, sessionId, context } = req.body;

    const session = sessionId || `session_${Date.now()}_${req.user._id}`;

    const chatResult = await generateChatResponse(
      req.user._id,
      message,
      session,
      context
    );

    const savedMessage = await sendMessage({
      userId: req.user._id,
      message: chatResult.message,
      response: chatResult.response,
      sessionId: session,
      messageType: "user",
      context: chatResult.context,
    });

    const savedResponse = await sendMessage({
      userId: req.user._id,
      message: chatResult.message,
      response: chatResult.response,
      sessionId: session,
      messageType: "assistant",
      context: chatResult.context,
    });

    return successResponse(res, "Message sent successfully", {
      userMessage: savedMessage,
      assistantMessage: savedResponse,
      sessionId: session,
    });
  }
);

export const getChatHistoryController = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { sessionId, limit = 50 } = req.query;

    const history = sessionId
      ? await getChatHistoryBySession(req.user._id, sessionId as string, Number(limit))
      : await getChatHistory(req.user._id, undefined, Number(limit));

    return successResponse(res, "Chat history retrieved successfully", history);
  }
);

export const getChatSessionsController = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const sessions = await getChatSessions(req.user._id);

    return successResponse(res, "Chat sessions retrieved successfully", sessions);
  }
);

export const clearChatHistoryController = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { sessionId } = req.body;

    await clearChatHistory(req.user._id, sessionId);

    return successResponse(res, "Chat history cleared successfully");
  }
);

export const getChatContextController = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const context = await getChatHistory(req.user._id, undefined, 1);

    return successResponse(res, "Chat context retrieved successfully", {
      hasHistory: context.length > 0,
      lastMessage: context[0] || null,
    });
  }
);
