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
    <div>
      <Button onClick={handleSignOut}>ออกจากระบบ</Button>
    </div>
  );
};

export default withRoleGuard(StaffHome, [...STAFF_ROLES]);
