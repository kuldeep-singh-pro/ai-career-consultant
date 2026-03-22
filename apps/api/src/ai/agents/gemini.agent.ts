import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { env } from "../../config/env";

export const geminiModel = new ChatGoogleGenerativeAI({
  model: env.GEMINI_MODEL,
  apiKey: env.GEMINI_API_KEY,
  temperature: 0.3
});
