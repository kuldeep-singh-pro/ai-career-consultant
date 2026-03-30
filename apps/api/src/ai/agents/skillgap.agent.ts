import { SkillGapResponseDto } from "../../dto/skillgap.dto";
import { InternalServerError } from "../../errorHandler/httpError";
import { geminiModel } from "./gemini.agent";
import { HumanMessage } from "langchain";

export const  skillgapAnalysisWithAi = async(targetRole: string) => {

    try {
        
const prompt = `

You are an expert career mentor and skill gap analyst.

Given a target role, analyze the skill gap and return STRICT JSON only:

{
  "currentSkills": string[],
  "missingSkills": string[],
  "matchPercentage": number,
  "learningPlan": [
    {
      "skill": string,
      "priority": "High | Medium | Low",
      "weeks": number
    }
  ]
}

Target Role:
${targetRole}
`;

const response = await geminiModel.invoke([
    new HumanMessage(prompt),
]);

const raw = response.content as string;

console.log("Gemini raw response received for skill gap analysis");

const cleaned = raw
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();

const jsonStart = cleaned.indexOf("{");
const jsonEnd = cleaned.lastIndexOf("}") + 1;

if (jsonStart === -1 || jsonEnd === -1) {
  throw new InternalServerError("Invalid JSON returned from Gemini for skill gap analysis");
}

const safeJson = cleaned.slice(jsonStart, jsonEnd);

const parsed = JSON.parse(safeJson);

const validated = SkillGapResponseDto.parse(parsed);

return validated;   
    
    } catch (error) {
        
        console.error("Gemini skill gap analysis error:", error);
        throw new InternalServerError("Failed to analyze skill gap with AI");
    }

}
