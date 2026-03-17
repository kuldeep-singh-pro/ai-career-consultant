import { model } from "../config/openai";
import { SYSTEM_PROMPT } from "../ai/prompts/system.prompt";
import { ApiError } from "../utils/apiError";

function mapGeminiError(error: unknown): never {
  const message = error instanceof Error ? error.message : String(error);
  const normalized = message.toLowerCase();

  const isQuotaExceeded =
    normalized.includes("429") ||
    normalized.includes("quota exceeded") ||
    normalized.includes("too many requests") ||
    normalized.includes("rate limit");

  if (isQuotaExceeded) {
    throw new ApiError(
      429,
      "Gemini API quota exceeded. Please verify billing/quota in Google AI Studio and retry after a short delay."
    );
  }

  throw new ApiError(500, "Failed to generate AI response.");
}

export async function getAIResponse(question: string) {
  try {
    const response = await model.invoke([
      { role: "user", content: `${SYSTEM_PROMPT}\n\n${question}` },
    ]);

    return response.content;
  } catch (error) {
    mapGeminiError(error);
  }
}
