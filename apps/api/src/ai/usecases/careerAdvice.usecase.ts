import { askAI } from "../../services/ai.service";
import { careerPrompt } from "../agent/career.agent";

export const getCareerAdvice = async (input: string) => {
  const prompt = careerPrompt(input);
  return await askAI(prompt);
};