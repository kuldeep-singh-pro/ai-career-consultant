import { systemPrompt } from "../prompts/system.prompt";

export const careerPrompt = (input: string) => {
  return `
${systemPrompt}

User Input:
${input}

Give:
- Career suggestions
- Required skills
- Roadmap (step-by-step)
- Tools to learn

 Keep answer under 300 words.
`;
};