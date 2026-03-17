
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(__dirname, "../../.env"),
});




export const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.0-flash",
  temperature: 0.7,
  apiKey: process.env.GOOGLE_API_KEY,
});

export const openai = model;
