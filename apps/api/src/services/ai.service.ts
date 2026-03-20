import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { env } from "../config/env";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: env.GEMINI_API_KEY,
   maxOutputTokens: 300,
});

export const askAI = async (prompt: string) => {
  const response = await model.invoke(prompt);
  return response.content;
};