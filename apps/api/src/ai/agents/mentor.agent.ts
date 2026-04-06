import { InternalServerError } from "../../errorHandler/httpError";
import { geminiModel } from "./gemini.agent";
import { HumanMessage } from "langchain";

export const generateMentorResponse = async (
  userMessage: string,
  context?: {
    currentModule?: string;
    userSkills?: string[];
    careerGoals?: string;
    conversationHistory?: Array<{ role: string; content: string }>;
  }
) => {
  try {
    const systemPrompt = `
You are an expert AI career mentor and professional advisor. You provide personalized career guidance, skill development advice, and professional development support.

Context:
- Current Module: ${context?.currentModule || "General"}
- User Skills: ${context?.userSkills?.join(", ") || "Not specified"}
- Career Goals: ${context?.careerGoals || "Not specified"}

Guidelines:
- Be encouraging and supportive
- Provide actionable advice
- Ask clarifying questions when needed
- Reference specific skills and career paths
- Keep responses conversational but professional
- Offer specific next steps and resources
- Be concise but comprehensive

Respond as a knowledgeable career mentor who understands the user's journey.
`;

    const conversationHistory = context?.conversationHistory || [];
    const recentHistory = conversationHistory.slice(-6);

    const fullPrompt = `${systemPrompt}

Recent conversation:
${recentHistory.map(msg => `${msg.role}: ${msg.content}`).join('\n')}

User: ${userMessage}

Mentor:`;

    const response = await geminiModel.invoke([
      new HumanMessage(fullPrompt),
    ]);

    const raw = response.content as string;

    const cleaned = raw
      .replace(/```/g, "")
      .trim();

    return cleaned;
  } catch (error: any) {
    console.error("Mentor response generation error:", error);
    throw new InternalServerError("Failed to generate mentor response");
  }
};

export const analyzeUserIntent = async (message: string) => {
  try {
    const prompt = `
Analyze this user message and categorize their intent. Return JSON only:

{
  "intent": "career_advice|skill_help|resume_feedback|interview_prep|general_question|motivation",
  "confidence": number,
  "keywords": string[],
  "urgency": "high|medium|low"
}

Message: "${message}"
`;

    const response = await geminiModel.invoke([
      new HumanMessage(prompt),
    ]);

    const raw = response.content as string;
    const cleaned = raw.replace(/```json/g, "").replace(/```/g, "").trim();
    const jsonStart = cleaned.indexOf("{");
    const jsonEnd = cleaned.lastIndexOf("}") + 1;

    if (jsonStart === -1 || jsonEnd === -1) {
      return { intent: "general_question", confidence: 0.5, keywords: [], urgency: "medium" };
    }

    const jsonString = cleaned.substring(jsonStart, jsonEnd);
    return JSON.parse(jsonString);
  } catch (error: any) {
    return { intent: "general_question", confidence: 0.5, keywords: [], urgency: "medium" };
  }
};
