import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { env } from "../../config/env";

console.log("Gemini model:", env.GEMINI_MODEL);
console.log("Gemini API key exists:", !!env.GEMINI_API_KEY);

if (!env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is missing in environment variables");
}

if (!env.GEMINI_MODEL) {
  throw new Error("GEMINI_MODEL is missing in environment variables");
}

export const geminiModel = new ChatGoogleGenerativeAI({
  model: env.GEMINI_MODEL,
  apiKey: env.GEMINI_API_KEY,
  temperature: 0.3,
});