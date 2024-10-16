"use client";

import StaffAccountPage from "@/components/pages/staff/account/StaffAccountPage";
import { ManageStaffAccountProvider } from "@/providers/ManageStaffAccountProvider";

const Page = () => {
  return (
    <ManageStaffAccountProvider>
      <StaffAccountPage />
    </ManageStaffAccountProvider>
  );
};

export default Page;
