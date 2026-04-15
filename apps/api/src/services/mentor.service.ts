import { Types } from "mongoose";
import ChatMessage from "../models/chat.model";
import { generateMentorResponse, analyzeUserIntent } from "../ai/agents/mentor.agent";
import { ResumeAnalysis } from "../models/resume.analysis";

export interface ChatMessageInput {
  userId: Types.ObjectId | string;
  message: string;
  response: string;
  sessionId: string;
  messageType: "user" | "assistant";
  context?: {
    currentModule?: string;
    userSkills?: string[];
    careerGoals?: string;
  };
}

export const sendMessage = async (messageData: ChatMessageInput) => {
  const chatMessage = await ChatMessage.create(messageData);
  return chatMessage;
};

export const getChatHistory = async (
  userId: Types.ObjectId | string,
  sessionId?: string,
  limit: number = 50
) => {
  const query = sessionId ? { userId, sessionId } : { userId };
  return ChatMessage.find(query)
    .sort({ timestamp: -1 })
    .limit(limit)
    .lean();
};

export const getChatHistoryBySession = async (
  userId: Types.ObjectId | string,
  sessionId: string,
  limit: number = 50
) => {
  return ChatMessage.find({ userId, sessionId })
    .sort({ timestamp: 1 })
    .limit(limit)
    .lean();
};

export const clearChatHistory = async (
  userId: Types.ObjectId | string,
  sessionId?: string
): Promise<any> => {
  const query = sessionId ? { userId, sessionId } : { userId };
  return ChatMessage.deleteMany(query);
};

export const getUserContext = async (userId: Types.ObjectId | string) => {
  const resumeAnalysis = await ResumeAnalysis.findOne({ userId })
    .sort({ createdAt: -1 })
    .lean();

  return {
    userSkills: resumeAnalysis?.skills || [],
    careerGoals: resumeAnalysis?.experienceLevel || "",
  };
};

export const generateChatResponse = async (
  userId: Types.ObjectId | string,
  message: string,
  sessionId: string,
  context?: any
) => {
  const userContext = await getUserContext(userId);
  const conversationHistory = await getChatHistoryBySession(userId, sessionId, 10);

  const historyForAI = conversationHistory.map(msg => ({
    role: msg.messageType === "user" ? "user" : "assistant",
    content: msg.messageType === "user" ? msg.message : msg.response,
  }));

  const fullContext = {
    ...userContext,
    ...context,
    conversationHistory: historyForAI,
  };

  const response = await generateMentorResponse(message, fullContext);

  return {
    message,
    response,
    sessionId,
    context: fullContext,
  };
};

export const analyzeMessageIntent = async (message: string) => {
  return analyzeUserIntent(message);
};

export const getChatSessions = async (
  userId: Types.ObjectId | string
) => {
  return ChatMessage.aggregate([
    {
      $match: {
        userId: new Types.ObjectId(
          userId as string
        ),
        messageType: "user",
      },
    },
    {
      $sort: { timestamp: 1 },
    },
    {
      $group: {
        _id: "$sessionId",
        firstMessage: {
          $first: "$message",
        },
        lastMessage: {
          $max: "$timestamp",
        },
        messageCount: {
          $sum: 1,
        },
      },
    },
    {
      $project: {
        sessionId: "$_id",
        title: "$firstMessage",
        messageCount: 1,
        lastMessage: 1,
      },
    },
    {
      $sort: { lastMessage: -1 },
    },
  ]);
};