import { InternalServerError } from "../../errorHandler/httpError";
import { geminiModel } from "./gemini.agent";
import { HumanMessage } from "langchain";

export const generateCareerPathWithAi = async (
  currentRole: string,
  targetRole: string,
  skills: string[]
) => {
  try {
    const prompt = `
You are an expert career consultant and career path strategist.

Given current role, target role, and existing skills, generate a detailed career path with roadmap.

Return STRICT JSON only:

{
  "currentRole": string,
  "targetRole": string,
  "currentSkills": string[],
  "requiredSkills": string[],
  "matchPercentage": number,
  "estimatedDuration": number (in months),
  "salaryRange": {
    "current": number,
    "target": number
  },
  "milestones": [
    {
      "title": string,
      "duration": number (weeks),
      "skills": string[],
      "description": string
    }
  ],
  "learningResources": [
    {
      "name": string,
      "type": "course | book | project | certification",
      "duration": number (weeks),
      "difficulty": "Beginner | Intermediate | Advanced"
    }
  ]
}

Current Role: ${currentRole}
Target Role: ${targetRole}
Existing Skills: ${skills.join(", ")}
`;

    const response = await geminiModel.invoke([
      new HumanMessage(prompt),
    ]);

    const raw = response.content as string;

    console.log("Gemini raw response received for career path generation");

    const cleaned = raw
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const jsonStart = cleaned.indexOf("{");
    const jsonEnd = cleaned.lastIndexOf("}") + 1;

    if (jsonStart === -1 || jsonEnd === -1) {
      throw new InternalServerError("Invalid JSON returned from Gemini for career path generation");
    }

    const jsonString = cleaned.substring(jsonStart, jsonEnd);

    const parsedData = JSON.parse(jsonString);

    return parsedData;
  } catch (error: any) {
    console.error("Career path generation error:", error);
    throw error;
  }
};

export const generateRoadmapWithAi = async (
  currentRole: string,
  targetRole: string,
  timeframe: number
) => {
  try {
    const prompt = `
You are an expert career strategist and learning path designer.

Create a detailed roadmap for career transition with specific action items and timeline.

Return STRICT JSON only:

{
  "title": string,
  "description": string,
  "phases": [
    {
      "phase": number,
      "title": string,
      "duration": number (weeks),
      "focus": string,
      "actionItems": [
        {
          "title": string,
          "description": string,
          "priority": "High | Medium | Low"
        }
      ],
      "resources": string[]
    }
  ],
  "keyMetrics": [
    {
      "metric": string,
      "target": string,
      "timeline": number (weeks)
    }
  ]
}

Current Role: ${currentRole}
Target Role: ${targetRole}
Timeframe: ${timeframe} months
`;

    const response = await geminiModel.invoke([
      new HumanMessage(prompt),
    ]);

    const raw = response.content as string;

    console.log("Gemini raw response received for roadmap generation");

    const cleaned = raw
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const jsonStart = cleaned.indexOf("{");
    const jsonEnd = cleaned.lastIndexOf("}") + 1;

    if (jsonStart === -1 || jsonEnd === -1) {
      throw new InternalServerError("Invalid JSON returned from Gemini for roadmap generation");
    }

    const jsonString = cleaned.substring(jsonStart, jsonEnd);

    const parsedData = JSON.parse(jsonString);

    return parsedData;
  } catch (error: any) {
    console.error("Roadmap generation error:", error);
    throw error;
  }
};
