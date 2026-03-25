import { HumanMessage } from "@langchain/core/messages";
import { geminiModel } from "./gemini.agent";

export const analyzeResumeWithAI = async (resumeText: string) => {

  const prompt = `
You are an expert ATS resume analyzer and AI career mentor.

Analyze this resume and return STRICT JSON only:

{
  "score": number,
  "skills": string[],
  "experienceLevel": "Beginner | Intermediate | Advanced",
  "suggestions": string[],
  "recommendedRoles": string[],
  "strengths": string[],
  "weaknesses": string[]
}

Resume:
${resumeText}
`;

  const response = await geminiModel.invoke([
    new HumanMessage(prompt)
  ]);

  const raw = response.content as string;

  const cleaned = raw
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleaned);
};