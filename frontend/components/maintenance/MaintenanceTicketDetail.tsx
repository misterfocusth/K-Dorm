import { FC, useMemo, useState } from "react";
import { Separator } from "../ui/separator";
import MaintenanceStaffSelect from "../staff/maintenance/MaintenanceStaffSelect";
import { getTHFormattedDateTime } from "@/libs/datetime";
import { useMaintenanceTicketContext } from "@/contexts/MaintenanceTicketContext";

type MaintenanceTicketDetailProps = {
  staffView?: boolean;
};

const MaintenanceTicketDetail: FC<MaintenanceTicketDetailProps> = ({ staffView }) => {
  const [selectedStaff, setSelectedStaff] = useState<any | null>(null);
  const { selectedTicket } = useMaintenanceTicketContext();

  const formattedCreateAt = useMemo(
    () => (selectedTicket?.createdAt ? getTHFormattedDateTime(selectedTicket.createdAt) : ""),
    [selectedTicket]
  );

  const formattedResolvedAt = useMemo(
    () => (selectedTicket?.resolvedAt ? getTHFormattedDateTime(selectedTicket.resolvedAt) : ""),
    [selectedTicket]
  );

  if (!selectedTicket) return null;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-between">
        <p className="flex-1 text-gray-400">หัวข้อแจ้งซ่อม</p>
        <p className="flex-1">{selectedTicket.title}</p>
      </div>

      <div className="flex flex-row justify-between">
        <p className="flex-1 text-gray-400">สถานที่</p>
        <p className="flex-1">{selectedTicket.location}</p>
      </div>

      <div className="flex flex-row justify-between">
        <p className="flex-1 text-gray-400">รายละเอียด</p>
        <p className="flex-1">{selectedTicket.description}</p>
      </div>

      <div className="flex flex-row justify-between">
        <p className="flex-1 text-gray-400">วันและเวลาที่แจ้ง</p>
        <p className="flex-1">{formattedCreateAt}</p>
      </div>

      <Separator className="my-2" />

      {staffView && (
        <div className="flex flex-row justify-between">
          <p className="flex-1 text-gray-400">สถานะ</p>
          {selectedTicket.isResolved ? (
            <p className="flex-1 text-[#84CC16] font-bold">ดำเนินการซ่อมแล้ว</p>
          ) : (
            <p className="flex-1 text-[#9E9E9E] font-bold">ยังไม่ดำเนินการซ่อม</p>
          )}
        </div>
      )}

      {staffView && !selectedTicket.resolvedAt && (
        <div className="flex flex-row justify-between items-center">
          <p className="flex-1 text-gray-400">เจ้าหน้าที่ผู้รับผิดชอบ</p>

          <div className="flex-1">
            <MaintenanceStaffSelect
              selectedStaff={selectedStaff}
              onSelectStaff={setSelectedStaff}
            />
          </div>
        </div>
      )}

      {!staffView ||
        (selectedTicket.resolvedAt && selectedTicket.assignedTo && (
          <div>
            <div className="flex flex-row justify-between">
              <p className="flex-1 text-gray-400">ดำเนินการซ่อมโดย</p>
              <p className="flex-1">
                {selectedTicket.assignedTo.account.firstName +
                  " " +
                  selectedTicket.assignedTo.account.lastName}
              </p>
            </div>

            <div className="flex flex-row justify-between">
              <p className="flex-1 text-gray-400">วันและเวลาที่ซ่อม</p>
              <p className="flex-1">{formattedResolvedAt}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default MaintenanceTicketDetail;
