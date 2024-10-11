import { MaintenanceTicket } from "@/types";
import { FC } from "react";
import { Separator } from "../ui/separator";

type MaintenanceTicketDetailProps = {
  staffView?: boolean;
  maintenanceTicket?: MaintenanceTicket; // TODO: implement with data from api.
};

const MaintenanceTicketDetail: FC<MaintenanceTicketDetailProps> = ({
  staffView,
  maintenanceTicket,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-between">
        <p className="flex-1 text-gray-400">หัวข้อแจ้งซ่อม</p>
        <p className="flex-1">ซ่อมแซมประตูห้อง</p>
      </div>

      <div className="flex flex-row justify-between">
        <p className="flex-1 text-gray-400">สถานที่</p>
        <p className="flex-1">หอพักนักศึกษา ทางเข้าหลักที่ 1</p>
      </div>

      <div className="flex flex-row justify-between">
        <p className="flex-1 text-gray-400">รายละเอียด</p>
        <p className="flex-1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit adipiscing elit
        </p>
      </div>

      <div className="flex flex-row justify-between">
        <p className="flex-1 text-gray-400">วันและเวลาที่แจ้ง</p>
        <p className="flex-1">24 ก.ย. 2567 - 12:00</p>
      </div>

      <Separator className="my-2" />

      {staffView && (
        <div className="flex flex-row justify-between">
          <p className="flex-1 text-gray-400">สถานะ</p>
          <p className="flex-1 text-[#84CC16] font-bold">ดำเนินการซ่อมแล้ว</p>
        </div>
      )}

      <div className="flex flex-row justify-between">
        <p className="flex-1 text-gray-400">ดำเนินการซ่อมโดย</p>
        <p className="flex-1">นางสาวศรุตา โทรัตน</p>
      </div>

      <div className="flex flex-row justify-between">
        <p className="flex-1 text-gray-400">วันและเวลาที่ซ่อม</p>
        <p className="flex-1">24 ก.ย. 2567 - 12:00</p>
      </div>
    </div>
  );
};

export default MaintenanceTicketDetail;
