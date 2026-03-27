import z from "zod";

export const SkillGapRequestDto = z.object({

  targetRole: z.string().min(2)

});


export const SkillGapResponseDto = z.object({

  currentSkills: z.array(z.string()),

  missingSkills: z.array(z.string()),

  matchPercentage: z.number(),

  learningPlan: z.array(
    z.object({
      skill: z.string(),
      priority: z.string(),
      weeks: z.number()
    })
  )

});