"use client";

import StaffAccountPage from "@/components/pages/staff/account/StaffAccountPage";
import { ManageStaffAccountContextProvider } from "@/contexts/ManageStaffAccountContext";

const Page = () => {
  return (
    <ManageStaffAccountContextProvider>
      <StaffAccountPage />
    </ManageStaffAccountContextProvider>
  );
};

export default Page;
