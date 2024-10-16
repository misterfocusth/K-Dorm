// Schemas
import { accountSchema, studentSchema } from "@/schemas/account";
import { baseSchema } from "@/schemas/base-schema";

// Zod
import { z } from "zod";

// Interfaces
import { ErrorResponse, Response } from "@/interface/api-response";
import { initContract } from "@ts-rest/core";
import { activityCategorySchema } from "@/schemas/activity_category";

const getAllActivityCategory = activityCategorySchema.array();
type GetAllActivityCategory = z.infer<typeof getAllActivityCategory>;

const editActivityCategory = activityCategorySchema;
type EditActivityCategory = z.infer<typeof editActivityCategory>;

const c = initContract();

export const activityCategoryContract = c.router({
  getAllActivityCategory: {
    method: "GET",
    path: "/staff/activity_category",
    responses: {
      200: c.type<Response<GetAllActivityCategory>>(),
      400: c.type<ErrorResponse<{ code: string; message: string }>>(),
    },
    summary: "Get all activity categories",
  },
  editActivityCategoryById: {
    method: "PUT",
    path: "/staff/activity_category/:id",
    body: c.type<EditActivityCategory>(),
    responses: {
      200: c.type<Response<EditActivityCategory>>(),
      400: c.type<ErrorResponse<{ code: string; message: string }>>(),
    },
    summary: "Edit activity category by id",
  },
  createActivityCategory: {
    method: "POST",
    path: "/staff/activity_category",
    body: z.object({
      handle: z.string(),
      name: z.string(),
      visibleToStudents: z.boolean(),
      visibleToStaffs: z.boolean(),
      visibleToSecurityStaffs: z.boolean(),
    }),
    responses: {
      200: c.type<Response<EditActivityCategory>>(),
      400: c.type<ErrorResponse<{ code: string; message: string }>>(),
    },
    summary: "Create activity category",
  },
  deleteActivityCategoryById: {
    method: "DELETE",
    path: "/staff/activity_category/:id",
    responses: {
      200: c.type<Response<EditActivityCategory>>(),
      400: c.type<ErrorResponse<{ code: string; message: string }>>(),
    },
    summary: "Delete activity category by id",
  },
});
