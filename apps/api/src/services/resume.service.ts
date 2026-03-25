import { Resume } from "../models/resume.model";
import { ResumeAnalysis } from "../models/resume.analysis";
import { analyzeResumeWithAI } from "../ai/agents/resume.agent";

export const processResumeUpload = async (
  userId: any,
  fileUrl: string,
  extractedText: string
) => {

  const resume = await Resume.create({
    userId,
    fileUrl,
    extractedText
  });

  const aiResult = await analyzeResumeWithAI(extractedText);

  const analysis = await ResumeAnalysis.create({
    userId,
    resumeId: resume._id,
    ...aiResult
  });

  return analysis;
};


export const getLatestResumeAnalysis = async (userId: any) => {

  return ResumeAnalysis.findOne({ userId })
    .sort({ createdAt: -1 })
    .lean();

};