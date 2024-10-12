import { z } from "zod";
import { baseSchema } from "./base-schema";
import { accountSchema, studentSchema } from "./account";

export const fileSchema = baseSchema.extend({
  handle: z.string(), // File Name
  note: z.string().nullable(),
  path: z.string(),
  publiclyVisible: z.boolean().default(false),
  visibleToStudents: studentSchema.array().default([]),
  visibleToStaffs: accountSchema.array().default([]),
  visibleToMaintenanceStaffs: accountSchema.array().default([]),
  visibleToSecurityStaffs: accountSchema.array().default([]),
});
