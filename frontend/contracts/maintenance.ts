// TS-Rest
import { initContract } from "@ts-rest/core";

// Schemas
import { maintenanceTicketSchema } from "@/schemas/maintenance";

// Zod
import { z } from "zod";

// Interfaces
import { ErrorResponse, Response } from "@/interface/api-response";

const getMaintenanceTickets = maintenanceTicketSchema.array();
const getMaintenanceTicketDetailSchema = maintenanceTicketSchema;

type GetMaintenanceTickets = z.infer<typeof getMaintenanceTickets>;
type GetMaintenanceTicketDetail = z.infer<typeof getMaintenanceTicketDetailSchema>;

const c = initContract();

export const maintenanceTicketContract = c.router({
  getStudentMaintenanceTickets: {
    method: "GET",
    path: "/student/maintenance",
    responses: {
      200: c.type<Response<GetMaintenanceTickets>>(),
      400: c.type<ErrorResponse<{ code: string; message: string }>>(),
    },
    summary: "Get student maintenance tickets",
  },
  createMaintenanceTicket: {
    method: "POST",
    path: "/student/maintenance",
    body: z.any(),
    responses: {
      200: c.type<Response<GetMaintenanceTicketDetail>>(),
      400: c.type<ErrorResponse<{ code: string; message: string }>>(),
    },
    summary: "Create student maintenance ticket",
  },
  getMaintenanceTicketById: {
    method: "GET",
    path: "/student/maintenance/:id",
    pathParams: z.object({
      id: z.string(),
    }),
    responses: {
      200: c.type<Response<GetMaintenanceTicketDetail>>(),
      400: c.type<ErrorResponse<{ code: string; message: string }>>(),
    },
    summary: "Get student maintenance ticket by id",
  },
  getAllMaintenanceTickets: {
    method: "GET",
    path: "/staff/maintenance",
    responses: {
      200: c.type<Response<GetMaintenanceTickets>>(),
      400: c.type<ErrorResponse<{ code: string; message: string }>>(),
    },
    summary: "Get all maintenance tickets",
  },
});
