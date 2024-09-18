import { z } from "zod";

export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  date_created: z.string(),
  complete: z.boolean(),
});
