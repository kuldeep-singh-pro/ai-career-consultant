import { openai } from "../../config/openai";
import { SYSTEM_PROMPT } from "../prompts/system.prompt";

export async function runCareerAgent(question: string) {
  const response = await openai.invoke([
    { role: "system", content: SYSTEM_PROMPT },
    { role: "user", content: question },
  ]);

  return response.content;
}
