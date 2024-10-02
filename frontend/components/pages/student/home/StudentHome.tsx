"use client";

import { Button } from "@/components/ui/button";
import { AuthContext } from "@/contexts/AuthContext";
import { useCallback, useContext } from "react";

const StudentHome = () => {
  const { currentUser, role, logout } = useContext(AuthContext);

  const handleLogout = useCallback(async () => {
    await logout();
  }, [logout]);

  return (
    <div>
      <p>Role: {role}</p>
      <p>Current User: {JSON.stringify(currentUser)}</p>

      <Button onClick={handleLogout}>ออกจากระบบ</Button>
    </div>
  );
};

export default StudentHome;
