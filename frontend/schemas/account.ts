import { z } from "zod";
import { baseSchema } from "./base-schema";

export const accountSchema = baseSchema.extend({
  uid: z.string(),
  email: z.string(),
  secret: z.string().nullable(),
  salt: z.string().nullable(),
  firstName: z.string(),
  lastName: z.string(),
  isDisabled: z.boolean().default(false),

  student: z.object({}).nullable(),
  staff: z.object({}).nullable(),
  securityStaff: z.object({}).nullable(),
  maintenanceStaff: z.object({}).nullable(),
});

export const studentSchema = accountSchema.extend({
  studentId: z.string(),
});
