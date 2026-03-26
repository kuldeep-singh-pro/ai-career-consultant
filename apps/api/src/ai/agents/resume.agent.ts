import { HumanMessage } from "@langchain/core/messages";
import { geminiModel } from "./gemini.agent";
import  {ResumeAnalysisResponseDto}  from "../../dto/resume.dto";

export const analyzeResumeWithAI = async (resumeText: string) => {
  try {
    const prompt = `
You are an expert ATS resume analyzer and AI career mentor.

Analyze this resume and return STRICT JSON only:

{
  "score": number,
  "skills": string[],
  "missingSkills": string[],
  "experienceLevel": "Beginner | Intermediate | Advanced",
  "suggestions": string[],
  "recommendedRoles": string[],
  "strengths": string[],
  "weaknesses": string[],
  "careerRoadmap": string[]
}

Resume:
${resumeText}
`;

    const response = await geminiModel.invoke([
      new HumanMessage(prompt),
    ]);

    const raw = response.content as string;

    console.log("Gemini raw response received");

    const cleaned = raw
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const jsonStart = cleaned.indexOf("{");
    const jsonEnd = cleaned.lastIndexOf("}") + 1;

    if (jsonStart === -1 || jsonEnd === -1) {
      throw new Error("Invalid JSON returned from Gemini");
    }

    const safeJson = cleaned.slice(jsonStart, jsonEnd);

    const parsed = JSON.parse(safeJson);


    const validated = ResumeAnalysisResponseDto.parse(parsed);

    return validated;

  } catch (error) {
    console.error("Gemini analysis error:", error);
    throw new Error("Failed to analyze resume with AI");
  }
};