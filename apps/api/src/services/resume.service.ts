import { Resume } from "../models/resume.model";
import { extractTextFromPdf } from "../utils/pdfparser";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { env } from "../config/env";

const model = new ChatGoogleGenerativeAI({
  apiKey: env.GEMINI_API_KEY,
  model: "gemini-1.5-flash",
});

export const parseResumeWithAI = async (
  text: string
) => {
  const prompt = `
Extract structured JSON from this resume:

Return format:

{
skills: [{name:"",level:""}],
education: [{degree:"",institution:""}],
experience: [{company:"",role:""}]
}

Resume:
${text}
`;

  const response = await model.invoke(prompt);

  return JSON.parse(response.content as string);
};

export const uploadResumeService = async (
  userId: string,
  fileName: string,
  buffer: Buffer
) => {
  const extractedText = await extractTextFromPdf(
    buffer
  );

  const parsedData = await parseResumeWithAI(
    extractedText
  );

  const resume = await Resume.create({
    user: userId,
    fileName,
    extractedText,
    skills: parsedData.skills,
    education: parsedData.education,
    experience: parsedData.experience,
  });

  return resume;
};