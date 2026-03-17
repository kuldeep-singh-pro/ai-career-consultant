import { model } from "../config/openai";
import { SYSTEM_PROMPT } from "../ai/prompts/system.prompt";

export async function getAIResponse(question: string) {
  const response = await model.invoke([
    { role: "user", content: `${SYSTEM_PROMPT}\n\n${question}` },
  ]);

  return response.content;
}