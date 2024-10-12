import { z } from "zod";
import { baseSchema } from "./base-schema";
import { accountSchema, studentSchema } from "./account";
import { fileSchema } from "./file";

export const maintenanceTicketSchema = baseSchema.extend({
  title: z.string(),
  description: z.string(),
  assignedTo: z.object({
    account: accountSchema,
  }), // Maintenance Staff
  assignedBy: z.object({
    studentId: z.string(),
    account: accountSchema,
  }), // Student
  files: fileSchema.array(),
  location: z.string(),
  isResolved: z.boolean().default(false),
  resolvedAt: z.string().nullable(),
});
