import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(__dirname, "../../.env"),
});

let modelInstance: ChatGoogleGenerativeAI | null = null;

function getGoogleApiKey(): string {
  const apiKey = process.env.GOOGLE_API_KEY?.trim();

  if (!apiKey) {
    throw new Error(
      "GOOGLE_API_KEY is not set. Add it to apps/api/.env before starting the API."
    );
  }

  return apiKey;
}

export function getModel(): ChatGoogleGenerativeAI {
  if (!modelInstance) {
    modelInstance = new ChatGoogleGenerativeAI({
      model: "gemini-2.0-flash",
      temperature: 0.7,
      apiKey: getGoogleApiKey(),
    });
  }

  return modelInstance;
}

export const getOpenAI = getModel;
