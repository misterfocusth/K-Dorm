"use client";

// Components
import { Button } from "@/components/ui/button";

// Contexts
import { AuthContext } from "@/contexts/AuthContext";

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

export default StaffHome;
