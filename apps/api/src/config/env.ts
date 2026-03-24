import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: process.env.PORT || "5000",

  MONGO_URI: process.env.MONGO_URI as string,

  JWT_SECRET: process.env.JWT_SECRET as string,

  JWT_EXPIRE:
    (process.env.JWT_EXPIRE as "7d" | "1d" | "12h" | "30d") || "7d",

  EMAIL_USER: process.env.EMAIL_USER as string,

  EMAIL_PASS: process.env.EMAIL_PASS as string,

  GEMINI_API_KEY: process.env.GEMINI_API_KEY as string,

  GEMINI_MODEL:process.env.GEMINI_MODEL as string 
};