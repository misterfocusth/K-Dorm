import { z } from "zod";
import { baseSchema } from "./base-schema";

export const activityCategorySchema = baseSchema.extend({
  handle: z.string(),
  name: z.string(),
  visibleToStudents: z.boolean(),
  visibleToStaffs: z.boolean(),
  visibleToSecurityStaffs: z.boolean(),
});
