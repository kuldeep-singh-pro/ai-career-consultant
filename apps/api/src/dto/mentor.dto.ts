import z from "zod";

export const SendMessageRequestDto = z.object({
  message: z.string().min(1).max(1000),
  sessionId: z.string().optional(),
  context: z.object({
    currentModule: z.string().optional(),
    userSkills: z.array(z.string()).optional(),
    careerGoals: z.string().optional(),
  }).optional(),
});

export const ChatHistoryRequestDto = z.object({
  sessionId: z.string().optional(),
  limit: z.number().min(1).max(100).optional(),
});

export const MessageResponseDto = z.object({
  message: z.string(),
  response: z.string(),
  sessionId: z.string(),
  timestamp: z.date(),
  messageType: z.string(),
  context: z.object({
    currentModule: z.string().optional(),
    userSkills: z.array(z.string()).optional(),
    careerGoals: z.string().optional(),
  }).optional(),
});

export const ChatHistoryResponseDto = z.array(
  z.object({
    message: z.string(),
    response: z.string(),
    timestamp: z.date(),
    messageType: z.string(),
  })
);

export const ClearChatRequestDto = z.object({
  sessionId: z.string(),
});
