import { z } from "zod";
import { baseSchema } from "./base-schema";
import { accountSchema, studentSchema } from "./account";
import { fileSchema } from "./file";

export const maintenanceTicketSchema = baseSchema.extend({
  title: z.string(),
  note: z.string(),
  assignedTo: studentSchema, // Student
  assignedBy: accountSchema, // Maintenance Staff
  files: fileSchema,
  isResolved: z.boolean().default(false),
  resolvedAt: z.string().nullable(),
});
