import { z } from "zod";

export const aiSchema = z.object({
  question: z.string().min(5).max(300),
});
