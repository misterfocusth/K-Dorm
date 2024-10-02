import { z } from "zod";
import { baseSchema } from "./base-schema";

export const studentSchema = baseSchema.extend({
  studentId: z.string(),
});
