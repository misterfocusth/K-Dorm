import { z } from "zod";
import { baseSchema } from "./base-schema";
import { studentSchema } from "./account";
import { activityCategorySchema } from "./activity_category";

export const activity = baseSchema.extend({
  name: z.string(),
  note: z.string(),
  date: z.string(),
  location: z.string(),
  earnedVolunteerHours: z.number(),
  student: studentSchema,
  categories: activityCategorySchema.array(),
});
