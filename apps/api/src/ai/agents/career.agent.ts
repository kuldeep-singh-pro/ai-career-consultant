import { InternalServerError } from "../../errorHandler/httpError";
import { geminiModel } from "./gemini.agent";
import { HumanMessage } from "langchain";

const extractAndParseJson = (text: string) => {
  try {
    const cleaned = text.replace(/```json/g, "").replace(/```/g, "").trim();
    const jsonStart = cleaned.indexOf("{");
    const jsonEnd = cleaned.lastIndexOf("}") + 1;
    if (jsonStart === -1 || jsonEnd === -1) throw new Error();
    return JSON.parse(cleaned.substring(jsonStart, jsonEnd));
  } catch (error) {
    return {
      description: "AI-generated career roadmap",
      matchPercentage: 0,
      milestones: [
        {
          title: "Initial Assessment",
          duration: 2,
          skills: [],
          description: "Review current technical standing",
          completed: false,
        },
      ],
    };
  }
};

export const generateCareerPathWithAi = async (
  currentRole: string,
  targetRole: string,
  skills: string[]
) => {
  try {
    const prompt = `
You are an expert career consultant. Return STRICT JSON only:
{
  "description": string,
  "matchPercentage": number,
  "milestones": [
    {
      "title": string,
      "duration": number,
      "skills": string[],
      "description": string,
      "completed": false
    }
  ]
}
Current Role: ${currentRole}
Target Role: ${targetRole}
Skills: ${skills.join(", ")}`;

    const response = await geminiModel.invoke([new HumanMessage(prompt)]);
    return extractAndParseJson(response.content as string);
  } catch (error) {
    throw new InternalServerError("AI generation failed");
  }
};

export const generateRoadmapWithAi = async (
  currentRole: string,
  targetRole: string,
  timeframe: number
) => {
  const prompt = `Return STRICT JSON for a ${timeframe} month roadmap from ${currentRole} to ${targetRole}.`;
  const response = await geminiModel.invoke([new HumanMessage(prompt)]);
  return extractAndParseJson(response.content as string);
};