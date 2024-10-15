import { initContract } from "@ts-rest/core";
import { z } from "zod";

// API Response Schema
import { ErrorResponse, Response } from "@/interface/api-response";
import { accountSchema } from "@/schemas/account";

const c = initContract();

const getAllStaffAccount = accountSchema.array();
type GetAllStaffAccount = z.infer<typeof getAllStaffAccount>;

const editStaffAccount = accountSchema;
type EditStaffAccount = z.infer<typeof editStaffAccount>;

const createStaffAccount = accountSchema;
type CreateStaffAccount = z.infer<typeof createStaffAccount>;

export const staffAccountContract = c.router({
  getAllStaffAccount: {
    method: "GET",
    path: "/staff/account",
    responses: {
      200: c.type<Response<GetAllStaffAccount>>(),
      400: c.type<ErrorResponse>(),
    },
    summary: "Get all staff account",
  },
  createStaffAccount: {
    method: "POST",
    path: "/staff/account",
    body: z.object({
      email: z.string(),
      firstName: z.string(),
      lastName: z.string(),
      type: z.enum(["STAFF", "MAINTENANCE_STAFF", "SECURITY_STAFF"]),
    }),
    responses: {
      201: c.type<Response<CreateStaffAccount>>(),
      400: c.type<ErrorResponse>(),
    },
    summary: "Create a staff account",
  },
  editStaffAccount: {
    method: "PUT",
    path: "/staff/account/:id",
    pathParams: z.object({
      id: z.string(),
    }),
    body: z.object({
      email: z.string(),
      firstName: z.string(),
      lastName: z.string(),
      type: z.enum(["STAFF", "MAINTENANCE_STAFF", "SECURITY_STAFF"]),
      isDisabled: z.boolean(),
    }),
    responses: {
      200: c.type<Response<EditStaffAccount>>(),
      400: c.type<ErrorResponse>(),
    },
    summary: "Edit a staff account",
  },
});
