"use client";

import StaffMaintenancePage from "@/components/pages/staff/maintenance/StaffMaintenancePage";
import MaintenanceTicketProvider from "@/providers/MaintenanceTicketProvider";

const Page = () => {
  return (
    <MaintenanceTicketProvider>
      <StaffMaintenancePage />
    </MaintenanceTicketProvider>
  );
};

export default Page;
