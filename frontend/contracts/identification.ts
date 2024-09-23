// TS-Rest
import { initContract } from "@ts-rest/core";

// Schemas
import { accountSchema } from "@/schemas/account";
import { baseSchema } from "@/schemas/base-schema";

// Zod
import { z } from "zod";

// Interfaces
import { ErrorResponse, Response } from "@/interface";

const getIdentificationSchema = baseSchema.extend({
  accountId: z.string(),
  account: accountSchema,
});

type GetIdentificationKey = z.infer<typeof getIdentificationSchema>;

const c = initContract();

export const identificationKeyContract = c.router({
  getIdentificationKey: {
    method: "GET",
    path: "/student/identification",
    responses: {
      200: c.type<Response<GetIdentificationKey>>(),
      400: c.type<ErrorResponse<{ code: string; message: string }>>(),
    },
    summary: "Get student identification key",
  },
});
