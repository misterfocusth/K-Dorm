import { Separator } from "@/components/ui/separator";
import { useMaintenanceTicketContext } from "@/contexts/MaintenanceTicketContext";
import { getTHFormattedDateTime } from "@/libs/datetime";
import { MaintenanceTicket } from "@/types";
import { ChevronRight, CircleAlert, CircleCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

type MaintenanceHistoryItemProps = {
  maintenanceTicket: MaintenanceTicket;
  staffView?: boolean;
};

const MaintenanceHistoryItem = ({ maintenanceTicket, staffView }: MaintenanceHistoryItemProps) => {
  const { setSelectedTicket, selectedTicket } = useMaintenanceTicketContext();
  const router = useRouter();

  const formattedDate = useMemo(
    () => getTHFormattedDateTime(maintenanceTicket.createdAt),
    [maintenanceTicket.createdAt]
  );

  const handleOnStaffSelectTicket = useCallback(() => {
    setSelectedTicket(maintenanceTicket);
  }, [maintenanceTicket, setSelectedTicket]);

  const handleStudentSelectTicket = useCallback(() => {
    router.push(`/student/maintenance/${maintenanceTicket.id}`);
  }, [maintenanceTicket, router]);

  return (
    <div
      className={`flex flex-row items-center justify-between hover:bg-gray-100 cursor-pointer p-2 lg:p-4 rounded-3xl gap-6 ${
        selectedTicket?.id === maintenanceTicket.id && "bg-gray-100"
      }`}
      onClick={staffView ? handleOnStaffSelectTicket : handleStudentSelectTicket}
    >
      <div className="max-w-[20%]">
        {maintenanceTicket.isResolved ? (
          <div className="w-13 h-13 bg-[#84CC16] rounded-full text-white flex items-center justify-center p-2">
            <CircleCheck className="w-10 h-10" strokeWidth={2} />
          </div>
        ) : (
          <div className="w-13 h-13 bg-[#9E9E9E] rounded-full flex items-center justify-center text-white p-2">
            <CircleAlert className="w-10 h-10" strokeWidth={2} />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1 max-w-[70%] w-full">
        <p>{maintenanceTicket.title}</p>
        <p className="text-gray-400 ">
          {maintenanceTicket.description.length > 100
            ? maintenanceTicket.description.slice(0, 100) + "..."
            : maintenanceTicket.description}
        </p>
        <p className="text-gray-400">{formattedDate}</p>

        {staffView && (
          <div className="mt-1">
            <p className="text-gray-400">
              แจ้งโดย:{" "}
              {maintenanceTicket.assignedBy.account.firstName +
                " " +
                maintenanceTicket.assignedBy.account.lastName}
            </p>

            <p className="text-gray-400">
              เจ้าหน้าที่ผู้รับผิดชอบ:{" "}
              {maintenanceTicket.assignedTo
                ? maintenanceTicket.assignedTo.account.firstName +
                  " " +
                  maintenanceTicket.assignedBy.account.lastName
                : "-"}
            </p>
          </div>
        )}
      </div>

      <div className="max-w-[10%] w-full">
        <ChevronRight className="w-8 h-8" />
      </div>
    </div>
  );
};

export default MaintenanceHistoryItem;
