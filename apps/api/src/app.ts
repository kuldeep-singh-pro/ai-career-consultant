import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
// import { ChatOpenAI } from "@langchain/openai"; // Use ChatOpenAI for gpt models
import express, { Express, Request, Response } from "express";
import { env } from "./config/env";

const app: Express = express();
app.use(express.json());

// Initialize Models
const geminiModel = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite", 
  apiKey: env.GEMINI_API_KEY
});

// Example route to test the connection
app.post("/ask-gemini", async (req: Request, res: Response) => {
  try {
    const { prompt } = req.body;
    
    // IMPORTANT: You must use 'await' here
    const response = await geminiModel.invoke(prompt || "Why do parrots talk?");
    
    // response.content contains the actual string answer
    res.json({ 
      source: "Gemini 2.5",
      answer: response.content 
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch AI response" });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;