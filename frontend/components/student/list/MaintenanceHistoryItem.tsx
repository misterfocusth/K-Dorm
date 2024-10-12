import { useMaintenanceTicketContext } from "@/contexts/MaintenanceTicketContext";
import { getTHFormattedDateTime } from "@/libs/datetime";
import { MaintenanceTicket } from "@/types";
import { ChevronRight, CircleAlert, CircleCheck } from "lucide-react";
import { useCallback, useMemo } from "react";

type MaintenanceHistoryItemProps = {
  maintenanceTicket: MaintenanceTicket;
  staffView?: boolean;
  onClickListItem?: () => void;
};

const MaintenanceHistoryItem = ({
  maintenanceTicket,
  staffView,
  onClickListItem,
}: MaintenanceHistoryItemProps) => {
  const { setSelectedTicket } = useMaintenanceTicketContext();

  const formattedDate = useMemo(
    () => getTHFormattedDateTime(maintenanceTicket.createdAt),
    [maintenanceTicket.createdAt]
  );

  const handleOnStaffSelectTicket = useCallback(() => {
    setSelectedTicket(maintenanceTicket);
  }, [maintenanceTicket, setSelectedTicket]);

  return (
    <div
      className="flex flex-row items-center justify-between hover:bg-gray-100 cursor-pointer p-2 lg:p-4 rounded-3xl gap-6 lg:gap-0"
      onClick={onClickListItem ? onClickListItem : handleOnStaffSelectTicket}
    >
      <div className="w-[20%]">
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

      <div className="flex flex-col gap-1 w-[70%]">
        <p>{maintenanceTicket.title}</p>
        <p className="text-gray-400 ">
          {maintenanceTicket.description.length > 100
            ? maintenanceTicket.description.slice(0, 100) + "..."
            : maintenanceTicket.description}
        </p>
        <p className="text-gray-400">{formattedDate}</p>

        {staffView && (
          <div>
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

      <div className="w-[10%]">
        <ChevronRight className="w-8 h-8" />
      </div>
    </div>
  );
};

export default MaintenanceHistoryItem;
