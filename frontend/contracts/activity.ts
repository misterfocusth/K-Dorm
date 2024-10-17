import { initContract } from "@ts-rest/core";
import { z } from "zod";

// API Response Schema
import { ErrorResponse, Response } from "@/interface/api-response";
import { accountSchema } from "@/schemas/account";
import { activity } from "@/schemas/activity";

const c = initContract();

const getAllActivityByStudent = activity.array();
type GetAllActivityByStudent = z.infer<typeof getAllActivityByStudent>;

const createStudentActivity = activity;
type CreateStudentActivity = z.infer<typeof createStudentActivity>;

export const activityContract = c.router({
  getAllActivityByStudent: {
    method: "GET",
    path: "/student/activity/:studentId",
    pathParams: z.object({
      studentId: z.string(),
    }),
    responses: {
      200: c.type<Response<GetAllActivityByStudent>>(),
      400: c.type<ErrorResponse>(),
    },
    summary: "Get all activity by student",
  },
  createStudentActivity: {
    method: "POST",
    path: "/student/activity/:studentId",
    pathParams: z.object({
      studentId: z.string(),
    }),
    body: z.object({
      name: z.string(),
      note: z.string(),
      location: z.string(),
      earnedVolunteerHours: z.number(),
      studentId: z.string(),
      categories: z.string().array(),
    }),
    responses: {
      201: c.type<Response<CreateStudentActivity>>(),
      400: c.type<ErrorResponse>(),
    },
    summary: "Create a student activity",
  },
});
