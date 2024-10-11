"use client";

import withRoleGuard from "@/components/hoc/withRoleGuard";
// Components
import { Button } from "@/components/ui/button";

// Contexts
import { AuthContext } from "@/contexts/AuthContext";
import { STAFF_ROLES } from "@/types";

// React
import { useCallback, useContext } from "react";

const StaffHome = () => {
  const { logout } = useContext(AuthContext);

  const handleSignOut = useCallback(async () => {
    await logout();
  }, []);

  return (
    <div className="p-10">
      <p className="text-2xl font-bold">หน้าแรก</p>
    </div>
  );
};

export default withRoleGuard(StaffHome, [...STAFF_ROLES]);
