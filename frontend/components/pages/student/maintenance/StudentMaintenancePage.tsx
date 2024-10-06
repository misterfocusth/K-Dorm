"use client";

// Context
import { NavbarContext } from "@/contexts/NavbarContext";

// React
import { useContext, useEffect } from "react";

const StudentMaintenancePage = () => {
  const { setShowButtonNavbar, setShowHeaderNavbar } = useContext(NavbarContext);

  useEffect(() => {
    setShowButtonNavbar(true);
    setShowHeaderNavbar(false);
  }, []);

  return <div className="bg-[#FDBA74]">s</div>;
};

export default StudentMaintenancePage;
