"use client";

import withRoleGuard from "@/components/hoc/withRoleGuard";
import { STAFF_ROLES } from "@/types";

const StaffHome = () => {
  return (
    <div className="p-10">
      <p className="text-2xl font-bold">หน้าแรก</p>
    </div>
  );
};

export default withRoleGuard(StaffHome, [...STAFF_ROLES]);
