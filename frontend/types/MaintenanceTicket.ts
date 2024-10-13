import { Account, Student } from "./Account";

export type MaintenanceTicket = {
  title: string;
  description: string;
  location?: string;
  resolvedAt: string;
  createdAt: string;
  student: Student;
  maintenanceStaff: Account;
};
