"use client";

// Route Guard HOC
import withRoleGuard from "@/components/hoc/withRoleGuard";

// Components
import ImageGallery from "@/components/ImageGallery";
import LoadingSpinner from "@/components/LoadingSpinner";
import MaintenanceTicketDetail from "@/components/maintenance/MaintenanceTicketDetail";
import { QUERY_KEYS } from "@/constants";

// Context
import { NavbarContext } from "@/providers/NavbarProvider";
import { getApiService } from "@/libs/tsr-react-query";

// Icons
import { CheckCircle2, CircleAlert } from "lucide-react";

// React
import { useContext, useEffect, useMemo } from "react";

type StudentMaintenanceDetailPageProps = {
  id: string;
};

const StudentMaintenanceDetailPage = ({ id }: StudentMaintenanceDetailPageProps) => {
  const { setShowHeaderNavbar, setHeaderNavbarTitle, setShowBottomNavbar } =
    useContext(NavbarContext);

  const { isLoading, isFetching, data } =
    getApiService().maintenance.getMaintenanceTicketById.useQuery({
      queryData: { params: { id } },
      queryKey: [...QUERY_KEYS.maintenance.getStudentMaintenanceTickets, id],
    });

  const maintenanceTicket = useMemo(() => data?.body.result, [data?.body.result]);

  useEffect(() => {
    setShowBottomNavbar(true);
    setShowHeaderNavbar(true);
    setHeaderNavbarTitle("รายละเอียดการแจ้งซ่อม");
  }, []);

  if (isLoading || isFetching) return <LoadingSpinner loading />;

  if (!maintenanceTicket) return null;

  return (
    <div className="px-6 mt-6">
      <div className="flex flex-row items-center justify-between shadow-lg rounded-3xl p-8 w-full">
        <div className="font-semibold flex flex-col gap-1">
          {maintenanceTicket.isResolved ? (
            <>
              <p>ดำเนินการซ่อมแล้ว</p>
              <p className="text-[#9E9E9E]">รายการนี้ถูกซ่อมแล้วเรียบร้อย</p>
            </>
          ) : (
            <>
              <p>กยังไม่ดำเนินการซ่อม</p>
              <p className="text-[#9E9E9E]">รายการนี้รอดำเนินการซ่อมแซม</p>
            </>
          )}
        </div>

        <div
          className={`rounded-full p-2 text-white ${maintenanceTicket.isResolved ? "bg-[#84CC16]" : "bg-[#9E9E9E]"
            }`}
        >
          {maintenanceTicket.isResolved ? (
            <CheckCircle2 strokeWidth={3} className=" w-16 h-16" />
          ) : (
            <CircleAlert strokeWidth={3} className=" w-16 h-16" />
          )}
        </div>
      </div>

      <div className="mt-8">
        <ImageGallery imagesSrc={maintenanceTicket.files.map((file: any) => file.path)} />
      </div>

      <div className="rounded-3xl p-6 w-full shadow-lg  mt-8">
        <MaintenanceTicketDetail maintenanceTicket={maintenanceTicket} />
      </div>
    </div>
  );
};

export default withRoleGuard(StudentMaintenanceDetailPage, ["STUDENT"]);
