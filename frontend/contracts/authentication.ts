// TS-Rest
import { initContract } from "@ts-rest/core";

// Schemas
import { accountSchema } from "@/schemas/account";
import { baseSchema } from "@/schemas/base-schema";

// Zod
import { z } from "zod";

// Interfaces
import { ErrorResponse, Response } from "@/interface/api-response";
import { studentSchema } from "@/schemas/student";

const signInResultSchema = baseSchema.extend({
  user: accountSchema.extend({
    // User Data based on role
    student: studentSchema.optional(),
  }),

  // User Role: STUDENT, STAFF, MAINTENANCE_STAFF, SECURITY_STAFF
  role: z.string(),
});

export type SignInResult = z.infer<typeof signInResultSchema>;

const c = initContract();

export const authenticationContract = c.router({
  signIn: {
    method: "POST",
    path: "/auth/signin",
    body: z.null(),
    responses: {
      200: c.type<Response<SignInResult>>(),
      400: c.type<ErrorResponse<{ code: string; message: string }>>(),
    },
    summary: "Sign-In then create user if not exist, or get user data if user already exist",
  },
  getMe: {
    method: "GET",
    path: "/auth/me",
    responses: {
      200: c.type<Response<SignInResult>>(),
      400: c.type<ErrorResponse<{ code: string; message: string }>>(),
    },
    summary: "Get current logged in user's data",
  },
});
