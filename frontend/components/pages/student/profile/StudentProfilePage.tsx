"use client";

import { Button } from "@/components/ui/button";
import { AuthContext } from "@/contexts/AuthContext";
import { NavbarContext } from "@/contexts/NavbarContext";
import { useCallback, useContext, useEffect } from "react";

const StudentProfilePage = () => {
  const { logout } = useContext(AuthContext);
  const { setShowHeaderNavbar } = useContext(NavbarContext);

  const handleLogout = useCallback(async () => {
    await logout();
  }, [logout]);

  useEffect(() => {
    setShowHeaderNavbar(false);
  }, []);

  return (
    <div className="px-9">
      {" "}
      <Button onClick={handleLogout} className="w-full">
        ออกจากระบบ
      </Button>
    </div>
  );
};

export default StudentProfilePage;
