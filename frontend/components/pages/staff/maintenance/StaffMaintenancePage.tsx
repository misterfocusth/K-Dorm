"use client";

import { useCallback, useState } from "react";

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
import MaintenanceHistoryItem from "@/components/student/list/MaintenanceHistoryItem";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const StaffMaintenancePage = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [orderBy, setOrderBy] = useState<string | null>(null);
  const { selectedTicket } = useMaintenanceTicketContext();

  const handleFilterStatusChange = useCallback((value: string) => {
    setFilterStatus(value);
  }, []);

  const handleOrderByChange = useCallback((value: string) => {
    setOrderBy(value);
  }, []);

  return (
    <div className="p-10 grid grid-cols-5 ">
      <div className="col-span-2">
        <div>
          <p className="text-2xl font-bold">จัดการการแจ้งซ่อม</p>

          <div className="w-full flex flex-row items-center gap-4 mt-8">
            <Input type="text" placeholder="ค้นหาโดยใช้ชื่อ หรือรหัสนักศึกษา" />
            <Button>ค้นหา</Button>
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
            <MaintenanceHistoryList staffView />
          </ScrollArea>
        </div>
      </div>

      <div className="col-span-3 px-14 2xl:px-20">
        {selectedTicket && <ManageMaintenanceTicket />}
      </div>
    </div>
  );
};

export default StaffMaintenancePage;
