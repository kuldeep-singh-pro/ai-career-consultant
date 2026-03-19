import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(__dirname, "../../.env"),
});

export const env = {
  PORT: process.env.PORT || 5000,
  ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
  OPENAI_API_KEY:process.env.OPENAI_API_KEY,
  GEMINI_API_KEY:process.env.GEMINI_API_KEY
  
};

if (!env.OPENAI_API_KEY) {
  throw new Error(" OPENAI_API_KEY is missing in .env file");
}

if (!env.ANTHROPIC_API_KEY) {
  throw new Error(" ANTHROPIC_API_KEY is missing in .env file");
}

if (!env.GEMINI_API_KEY) {
  throw new Error(" GEMINI_API_KEY is missing in .env file");
}

console.log(" Env loaded successfully");