import z from "zod";

export const GenerateCareerPathRequestDto = z.object({
  currentRole: z.string().min(2),
  targetRole: z.string().min(2),
  skills: z.array(z.string()).min(1),
});

export const GenerateRoadmapRequestDto = z.object({
  currentRole: z.string().min(2),
  targetRole: z.string().min(2),
  timeframe: z.number().min(1).max(60),
});

export const CareerPathResponseDto = z.object({
  currentRole: z.string(),
  targetRole: z.string(),
  currentSkills: z.array(z.string()),
  requiredSkills: z.array(z.string()),
  matchPercentage: z.number(),
  estimatedDuration: z.number(),
  salaryRange: z.object({
    current: z.number(),
    target: z.number(),
  }),
  milestones: z.array(
    z.object({
      title: z.string(),
      duration: z.number(),
      skills: z.array(z.string()),
      description: z.string(),
    })
  ),
  learningResources: z.array(
    z.object({
      name: z.string(),
      type: z.string(),
      duration: z.number(),
      difficulty: z.string(),
    })
  ),
});

export const RoadmapResponseDto = z.object({
  title: z.string(),
  description: z.string(),
  phases: z.array(
    z.object({
      phase: z.number(),
      title: z.string(),
      duration: z.number(),
      focus: z.string(),
      actionItems: z.array(
        z.object({
          title: z.string(),
          description: z.string(),
          priority: z.string(),
        })
      ),
      resources: z.array(z.string()),
    })
  ),
  keyMetrics: z.array(
    z.object({
      metric: z.string(),
      target: z.string(),
      timeline: z.number(),
    })
  ),
});

export const GetCareerPathRequestDto = z.object({
  id: z.string().optional(),
});
