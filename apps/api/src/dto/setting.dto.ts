import z from "zod";

export const UpdateSettingsRequestDto = z.object({
  notifications: z.object({
    email: z.boolean().optional(),
    push: z.boolean().optional(),
    careerUpdates: z.boolean().optional(),
    skillReminders: z.boolean().optional(),
    mentorMessages: z.boolean().optional(),
  }).optional(),
  privacy: z.object({
    profileVisibility: z.enum(["public", "private", "connections"]).optional(),
    dataSharing: z.boolean().optional(),
    analytics: z.boolean().optional(),
  }).optional(),
  preferences: z.object({
    language: z.string().optional(),
    timezone: z.string().optional(),
    theme: z.enum(["light", "dark", "auto"]).optional(),
    emailFrequency: z.enum(["daily", "weekly", "monthly", "never"]).optional(),
  }).optional(),
  career: z.object({
    targetRoles: z.array(z.string()).optional(),
    industries: z.array(z.string()).optional(),
    salaryRange: z.object({
      min: z.number().optional(),
      max: z.number().optional(),
      currency: z.string().optional(),
    }).optional(),
    workPreferences: z.object({
      remote: z.boolean().optional(),
      hybrid: z.boolean().optional(),
      onsite: z.boolean().optional(),
      travel: z.boolean().optional(),
    }).optional(),
  }).optional(),
  skills: z.object({
    focusAreas: z.array(z.string()).optional(),
    learningStyle: z.enum(["visual", "auditory", "kinesthetic", "reading"]).optional(),
    timeCommitment: z.enum(["low", "medium", "high"]).optional(),
  }).optional(),
});

export const SettingsResponseDto = z.object({
  notifications: z.object({
    email: z.boolean(),
    push: z.boolean(),
    careerUpdates: z.boolean(),
    skillReminders: z.boolean(),
    mentorMessages: z.boolean(),
  }),
  privacy: z.object({
    profileVisibility: z.string(),
    dataSharing: z.boolean(),
    analytics: z.boolean(),
  }),
  preferences: z.object({
    language: z.string(),
    timezone: z.string(),
    theme: z.string(),
    emailFrequency: z.string(),
  }),
  career: z.object({
    targetRoles: z.array(z.string()),
    industries: z.array(z.string()),
    salaryRange: z.object({
      min: z.number(),
      max: z.number(),
      currency: z.string(),
    }),
    workPreferences: z.object({
      remote: z.boolean(),
      hybrid: z.boolean(),
      onsite: z.boolean(),
      travel: z.boolean(),
    }),
  }),
  skills: z.object({
    focusAreas: z.array(z.string()),
    learningStyle: z.string(),
    timeCommitment: z.string(),
  }),
});

export const ResetSettingsRequestDto = z.object({
  section: z.enum(["notifications", "privacy", "preferences", "career", "skills", "all"]).optional(),
});
