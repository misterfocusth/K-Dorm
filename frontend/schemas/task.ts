import { z } from "zod";

export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  date_created: z.string(),
  complete: z.boolean(),
});

export const newTaskSchema = z.object({
  title: z.string(),
  description: z.string(),
  complete: z.boolean().default(false),
});
