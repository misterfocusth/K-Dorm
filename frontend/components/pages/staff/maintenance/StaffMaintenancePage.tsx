"use client";

import { useCallback, useMemo, useState } from "react";

// Components
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MaintenanceHistoryList from "@/components/student/list/MaintenanceHistoryList";
import ManageMaintenanceTicket from "@/components/staff/maintenance/ManageMaintenanceTicket";
import { useMaintenanceTicketContext } from "@/contexts/MaintenanceTicketContext";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/libs/tsr-react-query";
import { QUERY_KEYS } from "@/constants";
import LoadingSpinner from "@/components/LoadingSpinner";
import withRoleGuard from "@/components/hoc/withRoleGuard";

const StaffMaintenancePage = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [orderBy, setOrderBy] = useState<string | null>(null);
  const { selectedTicket } = useMaintenanceTicketContext();

  const { isLoading, isFetching, data } = api.maintenance.getAllMaintenanceTickets.useQuery({
    queryKey: QUERY_KEYS.maintenance.getAllMaintenanceTickets,
  });

  const maintenanceTickets = useMemo(() => data?.body.result, [data]);

  const [filteredMaintenanceTickets, setFilteredMaintenanceTickets] = useState(maintenanceTickets);

  const handleFilterStatusChange = useCallback((value: string) => {
    setFilterStatus(value);
  }, []);

  const handleOrderByChange = useCallback((value: string) => {
    setOrderBy(value);
  }, []);

  const handleSearchTextChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchText(e.target.value);

      if (!e.target.value) {
        setFilteredMaintenanceTickets(maintenanceTickets);
        return;
      } else if (maintenanceTickets) {
        const filtered = maintenanceTickets.filter(
          (ticket) =>
            ticket.assignedBy.account.firstName.includes(e.target.value) ||
            ticket.assignedBy.account.lastName.includes(e.target.value) ||
            ticket.assignedBy.studentId.includes(e.target.value)
        );
        setFilteredMaintenanceTickets(filtered);
      }
    },
    [maintenanceTickets]
  );

  if (isLoading || isFetching) return <LoadingSpinner loading />;

  return (
    <div className="p-10 grid grid-cols-5 ">
      <div className="col-span-2">
        <div>
          <p className="text-2xl font-bold">จัดการการแจ้งซ่อม</p>

          <div className="w-full flex flex-row items-center gap-4 mt-8">
            <Input
              type="text"
              placeholder="ค้นหาโดยใช้ชื่อ หรือรหัสนักศึกษา"
              onChange={handleSearchTextChange}
              value={searchText}
            />
          </div>

          <div className="flex flex-row w-full gap-8 items-center mt-4">
            <div className="w-full">
              <Select onValueChange={handleFilterStatusChange}>
                <SelectTrigger className="rounded-xl p-4">
                  <SelectValue placeholder="ดูตามสถานะ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">แสดงรายการทั้งหมด</SelectItem>
                  <SelectItem value="2">ดำเนินการซ่อมแล้ว</SelectItem>
                  <SelectItem value="3">ยังไม่ได้ดำเนินการซ่อม</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="w-full col-span-2">
              <Select onValueChange={handleOrderByChange}>
                <SelectTrigger className="rounded-xl p-4">
                  <SelectValue placeholder="ดูตามวันและเวลา" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">ใหม่สุด - เก่าสุด</SelectItem>
                  <SelectItem value="dark">เก่าสุด - ใหม่สุด</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <ScrollArea className="h-[70dvh] w-full rounded-xl border">
            <MaintenanceHistoryList
              staffView
              maintenanceTickets={filteredMaintenanceTickets || []}
            />
          </ScrollArea>
        </div>
      </div>

      <div className="col-span-3 px-14 2xl:px-20">
        {selectedTicket && <ManageMaintenanceTicket />}
      </div>
    </div>
  );
};

export default withRoleGuard(StaffMaintenancePage, ["STAFF", "MAINTENANCE_STAFF"]);
