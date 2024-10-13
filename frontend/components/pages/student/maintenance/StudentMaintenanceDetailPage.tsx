"use client";

// Route Guard HOC
import withRoleGuard from "@/components/hoc/withRoleGuard";

// Components
import ImageGallery from "@/components/ImageGallery";
import MaintenanceTicketDetail from "@/components/maintenance/MaintenanceTicketDetail";
import { Separator } from "@/components/ui/separator";

// Context
import { NavbarContext } from "@/contexts/NavbarContext";

// Icons
import { CheckCircle2 } from "lucide-react";

// React
import { useContext, useEffect } from "react";

type StudentMaintenanceDetailPageProps = {
  id: string;
};

const StudentMaintenanceDetailPage = ({ id }: StudentMaintenanceDetailPageProps) => {
  const { setShowHeaderNavbar, setHeaderNavbarTitle, setShowBottomNavbar } =
    useContext(NavbarContext);

  useEffect(() => {
    setShowBottomNavbar(true);
    setShowHeaderNavbar(true);
    setHeaderNavbarTitle("รายละเอียดการแจ้งซ่อม");
  }, []);

  return (
    <div className="px-6 mt-6">
      <div className="flex flex-row items-center justify-between shadow-lg rounded-3xl p-8 w-full">
        <div className="font-semibold flex flex-col gap-1">
          <p>ดำเนินการซ่อมแล้ว</p>
          <p className="text-[#9E9E9E]">รายการนี้ถูกซ่อมแล้วเรียบร้อย</p>
        </div>

        <div className="rounded-full p-2 bg-[#84CC16] text-white">
          <CheckCircle2 strokeWidth={3} className=" w-16 h-16" />
        </div>
      </div>

      <div className="mt-8">
        <ImageGallery
          imagesSrc={[
            "https://picsum.photos/1920/1080",
            "https://picsum.photos/1920/1080",
            "https://picsum.photos/1920/1080",
            "https://picsum.photos/1920/1080",
            "https://picsum.photos/1920/1080",
          ]}
        />
      </div>

      <div className="rounded-3xl p-6 w-full shadow-lg  mt-8">
        <MaintenanceTicketDetail />
      </div>
    </div>
  );
};

export default withRoleGuard(StudentMaintenanceDetailPage, ["STUDENT"]);
