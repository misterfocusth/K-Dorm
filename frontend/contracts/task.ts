import { initContract } from "@ts-rest/core";
import { z } from "zod";

const c = initContract();

export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  date_created: z.string(),
  complete: z.boolean(),
});

export const taskContract = c.router({
  getTasks: {
    method: "GET",
    path: "/tasks",
    responses: {
      200: z.array(taskSchema),
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
      200: taskSchema,
    },
    summary: "Get a task by id",
  },
  createTask: {
    method: "POST",
    path: "/tasks",
    body: taskSchema,
    responses: {
      201: taskSchema,
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
      200: taskSchema,
    },
    summary: "Update a task",
  },
});
