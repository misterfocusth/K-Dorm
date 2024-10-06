import { ChevronRight, CircleAlert, CircleCheck } from "lucide-react";
import { useMemo } from "react";

type MaintenanceHistoryItemProps = {
  isResolved: boolean;
  title: string;
  description: string;
  createdAt: string;
};

const MaintenanceHistoryItem = ({
  isResolved,
  title,
  description,
  createdAt,
}: MaintenanceHistoryItemProps) => {
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

    return `${day} ${month} ${year} - ${hours}.${minutes}`;
  }, [createdAt]);

  return (
    <div className="flex flex-row items-center justify-between">
      <div>
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

      <div className="flex flex-col gap-1">
        <p>{title}</p>
        <p className="text-gray-400">{description}</p>
        <p className="text-gray-400">{formattedDate}</p>
      </div>

      <div>
        <ChevronRight className="w-8 h-8" />
      </div>
    </div>
  );
};

export default MaintenanceHistoryItem;
