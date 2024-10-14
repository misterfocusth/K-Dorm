import { useMaintenanceTicketContext } from "@/contexts/MaintenanceTicketContext";
import { MaintenanceTicket } from "@/types";
import { ChevronRight, CircleAlert, CircleCheck } from "lucide-react";
import { useCallback, useMemo } from "react";

type MaintenanceHistoryItemProps = {
  isResolved: boolean;
  title: string;
  description: string;
  createdAt: string;
  id: string;
  staffView?: boolean;
  onClickListItem?: () => void;
};

const MaintenanceHistoryItem = ({
  id,
  isResolved,
  title,
  description,
  createdAt,
  staffView,
  onClickListItem,
}: MaintenanceHistoryItemProps) => {
  const { setSelectedTicket, selectedTicket } = useMaintenanceTicketContext();

  const formattedDate = useMemo(() => {
    const date = new Date(createdAt);

    const monthsThai = [
      "ม.ค.",
      "ก.พ.",
      "มี.ค.",
      "เม.ย.",
      "พ.ค.",
      "มิ.ย.",
      "ก.ค.",
      "ส.ค.",
      "ก.ย.",
      "ต.ค.",
      "พ.ย.",
      "ธ.ค.",
    ];

    const day = date.getDate();
    const month = monthsThai[date.getMonth()];
    const year = date.getFullYear() + 543;
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${day} ${month} ${year} - ${hours}:${minutes}`;
  }, [createdAt]);

  const handleOnStaffSelectTicket = useCallback(() => {
    console.log("Select ticket", selectedTicket);

    const mockData: MaintenanceTicket = {
      title: title,
      description: description,
      location: "ห้อง 201",
      resolvedAt: new Date().toISOString(),
      createdAt: createdAt,
      maintenanceStaff: {
        id: 1,
        uid: "1",
        email: "staff@kmitl.com",
        firstName: "ศิลา",
        lastName: "ภักดีวงษ์",
        isDisabled: false,
      },
      student: {
        id: 1,
        uid: "1",
        email: "staff@kmitl.com",
        firstName: "ศิลา",
        lastName: "ภักดีวงษ์",
        isDisabled: false,
        studentId: "65070219",
        isOnBoarded: true,
      },
    };

    setSelectedTicket(mockData);
  }, [createdAt, description, setSelectedTicket, title, selectedTicket]);

  return (
    <div
      className="flex flex-row items-center justify-between hover:bg-gray-100 cursor-pointer p-4 rounded-3xl"
      onClick={onClickListItem ? onClickListItem : handleOnStaffSelectTicket}
    >
      <div className="max-w-[20%]">
        {isResolved ? (
          <div className="w-13 h-13 bg-[#84CC16] rounded-full text-white flex items-center justify-center p-2">
            <CircleCheck className="w-10 h-10" strokeWidth={2} />
          </div>
        ) : (
          <div className="w-13 h-13 bg-[#9E9E9E] rounded-full flex items-center justify-center text-white p-2">
            <CircleAlert className="w-10 h-10" strokeWidth={2} />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1 max-w-[70%]">
        <p>{title}</p>
        <p className="text-gray-400 ">
          {description.length > 100 ? description.slice(0, 100) + "..." : description}
        </p>
        <p className="text-gray-400">{formattedDate}</p>
        {staffView && <p className="text-gray-400">เจ้าหน้าที่ผู้รับผิดชอบ: นายศิลา ภักดีวงษ์</p>}
      </div>

      <div className="max-w-[10%]">
        <ChevronRight className="w-8 h-8" />
      </div>
    </div>
  );
};

export default MaintenanceHistoryItem;
