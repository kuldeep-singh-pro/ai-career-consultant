import { model } from "../config/openai";
import { SYSTEM_PROMPT } from "../ai/prompts/system.prompt";
import { ApiError } from "../utils/apiError";

function isQuotaError(errorMessage: string) {
  return (
    errorMessage.includes("429 Too Many Requests") ||
    errorMessage.toLowerCase().includes("quota exceeded")
  );
}

function isAuthError(errorMessage: string) {
  return (
    errorMessage.includes("401") ||
    errorMessage.toLowerCase().includes("api key")
  );
}

export async function getAIResponse(question: string) {
  try {
    const response = await model.invoke([
      { role: "user", content: `${SYSTEM_PROMPT}\n\n${question}` },
    ]);

    return response.content;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown AI service error";

    if (isQuotaError(errorMessage)) {
      throw new ApiError(
        429,
        "Gemini API quota exceeded. Add billing or wait for quota reset, then retry."
      );
    }

    if (isAuthError(errorMessage)) {
      throw new ApiError(
        401,
        "Invalid Google API key. Verify GOOGLE_API_KEY in your environment."
      );
    }

    throw new ApiError(502, "AI provider failed to generate a response.");
  }
}
