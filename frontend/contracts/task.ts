import { initContract } from "@ts-rest/core";
import { z } from "zod";

// Task Schema
import { newTaskSchema, taskSchema } from "@/schemas/task";

// API Response Schema
import { ErrorResponse, Response } from "@/interface/api-response";

// Zod Infered Type
type Task = z.infer<typeof taskSchema>;

const c = initContract();

export const taskContract = c.router({
  getTasks: {
    method: "GET",
    path: "/tasks",
    responses: {
      200: c.type<Response<Task[]>>(),
      400: c.type<ErrorResponse>(),
    },
    summary: "Get all tasks",
  },
  getTask: {
    method: "GET",
    path: "/tasks/:id",
    pathParams: z.object({
      id: z.string(),
    }),
    responses: {
      200: c.type<Response<Task>>(),
      404: c.type<ErrorResponse>(),
    },
    summary: "Get a task by id",
  },
  createTask: {
    method: "POST",
    path: "/tasks",
    body: newTaskSchema,
    responses: {
      201: c.type<Response<Task>>(),
      400: c.type<ErrorResponse>(),
    },
    summary: "Create a task",
  },
  updateTask: {
    method: "PUT",
    path: "/tasks/:id",
    pathParams: z.object({
      id: z.string(),
    }),
    body: taskSchema,
    responses: {
      200: c.type<Response<Task>>(),
      400: c.type<ErrorResponse>(),
    },
    summary: "Update a task",
  },
});
