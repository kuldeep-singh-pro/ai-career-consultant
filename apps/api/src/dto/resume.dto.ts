import z from "zod";


export const UploadResumeDto = z.object({
  resume: z.any()
});

export const ExperienceLevelEnum = z.enum([
  "Beginner",
  "Intermediate",
  "Advanced",
]);


export const ResumeAnalysisResponseDto = z.object({
  score: z.number().min(0).max(100),

  skills: z.array(z.string()),

  missingSkills: z.array(z.string()),

  experienceLevel: ExperienceLevelEnum,

  suggestions: z.array(z.string()),

  recommendedRoles: z.array(z.string()),

  strengths: z.array(z.string()),

  weaknesses: z.array(z.string()),

  careerRoadmap: z.array(z.string()),
});


export const CreateResumeInternalDto = z.object({
  userId: z.string(),

  fileUrl: z.string(),

  extractedText: z.string(),
});


export const CreateResumeAnalysisDto = z.object({
  userId: z.string(),

  resumeId: z.string(),

  score: z.number(),

  skills: z.array(z.string()),

  missingSkills: z.array(z.string()),

  suggestions: z.array(z.string()),

  recommendedRoles: z.array(z.string()),

  strengths: z.array(z.string()),

  weaknesses: z.array(z.string()),

  careerRoadmap: z.array(z.string()),

  experienceLevel: ExperienceLevelEnum,
});