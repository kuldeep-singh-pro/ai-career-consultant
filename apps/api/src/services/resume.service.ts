import { Resume } from "../models/resume.model";
import { ResumeAnalysis } from "../models/resume.analysis";
import skillgapModel from "../models/skillgap.model";
import { analyzeResumeWithAI } from "../ai/agents/resume.agent";

const inferRoleFromSkills = (skills: string[]) => {
  if (!skills || skills.length === 0) return "Beginner";

  const lower = skills.map((s) => s.toLowerCase());

  if (lower.includes("react") && lower.includes("node"))
    return "Full Stack Developer";

  if (lower.includes("react"))
    return "Frontend Developer";

  if (lower.includes("node"))
    return "Backend Developer";

  if (lower.includes("python") && lower.includes("pandas"))
    return "Data Analyst";

  if (lower.includes("tensorflow") || lower.includes("pytorch"))
    return "Machine Learning Engineer";

  return "Software Developer";
};

export const processResumeUpload = async (
  userId: any,
  fileUrl: string,
  extractedText: string
) => {
  const previousAnalysis = await ResumeAnalysis.findOne({
    userId,
  }).sort({ createdAt: -1 });

  if (previousAnalysis) {
    await skillgapModel.deleteMany({
      userId,
      resumeId: previousAnalysis.resumeId,
    });

    await ResumeAnalysis.deleteMany({
      userId,
    });
  }

  const resume = await Resume.create({
    userId,
    fileUrl,
    extractedText,
  });

  const aiResult = await analyzeResumeWithAI(extractedText);

  const safeCurrentRole =
    aiResult.currentRole ||
    aiResult.jobTitle ||
    aiResult.inferredRole ||
    inferRoleFromSkills(aiResult.skills);

  const analysis = await ResumeAnalysis.create({
    userId,
    resumeId: resume._id,
    ...aiResult,
    currentRole: safeCurrentRole,
  });

  return analysis;
};

export const getLatestResumeAnalysis = async (
  userId: any
) => {
  return ResumeAnalysis.findOne({
    userId,
  })
    .sort({ createdAt: -1 })
    .lean();
};