"use client";

// Route Guard HOC
import withRoleGuard from "@/components/hoc/withRoleGuard";

// Components
import { Button } from "@/components/ui/button";

// Contexts
import { AuthContext } from "@/contexts/AuthContext";
import { NavbarContext } from "@/contexts/NavbarContext";

// React
import { useCallback, useContext, useEffect } from "react";

const StudentProfilePage = () => {
  const { logout } = useContext(AuthContext);
  const { setShowHeaderNavbar, resetNavbarContext, setShowBottomNavbar } =
    useContext(NavbarContext);

  const handleLogout = useCallback(async () => {
    await logout();
    resetNavbarContext();
  }, [logout]);

  useEffect(() => {
    setShowBottomNavbar(true);
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

export default withRoleGuard(StudentProfilePage, ["STUDENT"]);
