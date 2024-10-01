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
  accountId: z.string(),
  account: accountSchema,

  // User Role: STUDENT, STAFF,
  role: z.string(),

  // User Data based on role
  student: studentSchema.optional(),
});

type SignInResult = z.infer<typeof signInResultSchema>;

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
});
