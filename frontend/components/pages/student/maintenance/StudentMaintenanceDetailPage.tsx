"use client";

import { NavbarContext } from "@/contexts/NavbarContext";
import { useContext, useEffect } from "react";

type StudentMaintenanceDetailPageProps = {
  id: string;
};

const StudentMaintenanceDetailPage = ({ id }: StudentMaintenanceDetailPageProps) => {
  const { setShowHeaderNavbar, setHeaderNavbarTitle, setShowButtonNavbar } =
    useContext(NavbarContext);

  useEffect(() => {
    setShowButtonNavbar(true);
    setShowHeaderNavbar(true);
    setHeaderNavbarTitle("รายละเอียดการแจ้งซ่อม");
  }, []);

  return <div className="px-6">{id}</div>;
};

export default StudentMaintenanceDetailPage;
