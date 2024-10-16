import { FC, useMemo, useState } from "react";
import { Separator } from "../ui/separator";
import MaintenanceStaffSelect from "../staff/maintenance/MaintenanceStaffSelect";
import { getTHFormattedDateTime } from "@/libs/datetime";
import { Account, MaintenanceTicket } from "@/types";
import useStaffAccount from "@/hooks/accout/useStaffAccount";

type MaintenanceTicketDetailProps = {
  maintenanceTicket: MaintenanceTicket;
  staffView?: boolean;
  onSelectStaff?: (staff: Account) => void;
};

const MaintenanceTicketDetail: FC<MaintenanceTicketDetailProps> = ({
  maintenanceTicket,
  staffView,
  onSelectStaff,
}) => {
  const { isLoading, isFetching, maintenanceStaffAccounts } = useStaffAccount();

  const formattedCreateAt = useMemo(
    () => (maintenanceTicket?.createdAt ? getTHFormattedDateTime(maintenanceTicket.createdAt) : ""),
    [maintenanceTicket]
  );

  const formattedResolvedAt = useMemo(
    () =>
      maintenanceTicket?.resolvedAt ? getTHFormattedDateTime(maintenanceTicket.resolvedAt) : "",
    [maintenanceTicket]
  );

  if (!maintenanceTicket || (staffView && !maintenanceStaffAccounts)) return null;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-between">
        <p className="flex-1 text-gray-400">หัวข้อแจ้งซ่อม</p>
        <p className="flex-1 text-end">{maintenanceTicket.title}</p>
      </div>

      <div className="flex flex-row justify-between">
        <p className="flex-1 text-gray-400">สถานที่</p>
        <p className="flex-1 text-end">{maintenanceTicket.location}</p>
      </div>

      <div className="flex flex-row justify-between">
        <p className="flex-1 text-gray-400">รายละเอียด</p>
        <p className="flex-1 text-end">{maintenanceTicket.description}</p>
      </div>

      <div className="flex flex-row justify-between">
        <p className="flex-1 text-gray-400">วันและเวลาที่แจ้ง</p>
        <p className="flex-1 text-end">{formattedCreateAt}</p>
      </div>

      <Separator className="my-2" />

      {staffView && (
        <div className="flex flex-row justify-between">
          <p className="flex-1 text-gray-400">สถานะ</p>
          {maintenanceTicket.isResolved ? (
            <p className="flex-1 text-[#84CC16] font-bold text-end">ดำเนินการซ่อมแล้ว</p>
          ) : (
            <p className="flex-1 text-[#9E9E9E] font-bold text-end">ยังไม่ดำเนินการซ่อม</p>
          )}
        </div>
      )}

      {staffView && !maintenanceTicket.resolvedAt && (
        <div className="flex flex-row justify-between items-center">
          <p className="flex-1 text-gray-400">เจ้าหน้าที่ผู้รับผิดชอบ</p>

          <div className="flex-1">
            {staffView && maintenanceStaffAccounts && onSelectStaff && (
              <MaintenanceStaffSelect
                onSelectStaff={onSelectStaff}
                maintenanceStaffAccounts={maintenanceStaffAccounts}
                isLoading={isLoading || isFetching}
              />
            )}
          </div>
        </div>
      )}

      {!staffView ||
        (maintenanceTicket.resolvedAt && maintenanceTicket.assignedTo && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-row justify-between">
              <p className="flex-1 text-gray-400">ดำเนินการซ่อมโดย</p>
              <p className="flex-1 text-end">
                {maintenanceTicket.assignedTo.account.firstName +
                  " " +
                  maintenanceTicket.assignedTo.account.lastName}
              </p>
            </div>

            <div className="flex flex-row justify-between">
              <p className="flex-1 text-gray-400">วันและเวลาที่ซ่อม</p>
              <p className="flex-1 text-end">{formattedResolvedAt}</p>
            </div>
          </div>
        ))}

      {!staffView && !maintenanceTicket.isResolved && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-row justify-between">
            <p className="flex-1 text-gray-400">ดำเนินการซ่อมโดย</p>
            <p className="flex-1 text-end">-</p>
          </div>

          <div className="flex flex-row justify-between">
            <p className="flex-1 text-gray-400">วันและเวลาที่ซ่อม</p>
            <p className="flex-1 text-end">-</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MaintenanceTicketDetail;
