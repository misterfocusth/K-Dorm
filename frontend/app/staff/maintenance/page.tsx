"use client";

import StaffMaintenancePage from "@/components/pages/staff/maintenance/StaffMaintenancePage";
import MaintenanceTicketContextProvider from "@/contexts/MaintenanceTicketContext";

const Page = () => {
  return (
    <MaintenanceTicketContextProvider>
      <StaffMaintenancePage />
    </MaintenanceTicketContextProvider>
  );
};

export default Page;
