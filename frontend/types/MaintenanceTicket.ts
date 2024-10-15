import { z } from "zod";
import { maintenanceTicketSchema } from "@/schemas/maintenance";

export type MaintenanceTicket = z.infer<typeof maintenanceTicketSchema>;
