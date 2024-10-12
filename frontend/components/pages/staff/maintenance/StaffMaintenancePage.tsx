"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

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
import { Input } from "@/components/ui/input";
import { QUERY_KEYS } from "@/constants";
import LoadingSpinner from "@/components/LoadingSpinner";
import withRoleGuard from "@/components/hoc/withRoleGuard";
import { getApiService } from "@/libs/tsr-react-query";

const StaffMaintenancePage = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [orderBy, setOrderBy] = useState<string | null>(null);
  const { selectedTicket } = useMaintenanceTicketContext();

  const { isLoading, isFetching, data } =
    getApiService().maintenance.getAllMaintenanceTickets.useQuery({
      queryKey: QUERY_KEYS.maintenance.getAllMaintenanceTickets,
    });

  const maintenanceTickets = useMemo(
    () =>
      data?.body.result.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ),
    [data]
  );

  const [filteredMaintenanceTickets, setFilteredMaintenanceTickets] = useState(maintenanceTickets);

  const filterMaintenanceTickets = useCallback(
    (searchText: string, filterStatus: string | null, orderBy: string | null) => {
      let filtered = maintenanceTickets;

      if (!filtered) return;

      if (searchText) {
        filtered = filtered.filter(
          (ticket) =>
            ticket.assignedBy.account.firstName.includes(searchText) ||
            ticket.assignedBy.account.lastName.includes(searchText) ||
            ticket.assignedBy.studentId.includes(searchText)
        );
      }

      if (filterStatus === "2") {
        filtered = filtered.filter((ticket) => ticket.isResolved);
      } else if (filterStatus === "3") {
        filtered = filtered.filter((ticket) => !ticket.isResolved);
      }

      if (orderBy === "1") {
        filtered = filtered.sort((a, b) => {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
      } else if (orderBy === "2") {
        filtered = filtered.sort((a, b) => {
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        });
      }

      setFilteredMaintenanceTickets(filtered);
    },
    [maintenanceTickets]
  );

  useEffect(() => {
    filterMaintenanceTickets(searchText, filterStatus, orderBy);
  }, [searchText, filterStatus, orderBy, filterMaintenanceTickets]);

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
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
            />
          </div>

          <div className="flex flex-row w-full gap-8 items-center mt-4">
            <div className="w-full">
              <Select onValueChange={setFilterStatus} value={filterStatus || ""}>
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
              <Select onValueChange={setOrderBy} value={orderBy || ""}>
                <SelectTrigger className="rounded-xl p-4">
                  <SelectValue placeholder="ดูตามวันและเวลา" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">ใหม่สุด - เก่าสุด</SelectItem>
                  <SelectItem value="2">เก่าสุด - ใหม่สุด</SelectItem>
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
