"use client";

// Context
import { NavbarContext } from "@/contexts/NavbarContext";

// React
import { useContext, useEffect } from "react";

// UI Components
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import MaintenanceHistoryList from "@/components/student/list/MaintenanceHistoryList";

const StudentMaintenancePage = () => {
  const { setShowButtonNavbar, setShowHeaderNavbar } = useContext(NavbarContext);

  useEffect(() => {
    setShowButtonNavbar(true);
    setShowHeaderNavbar(false);
  }, []);

  return (
    <div className="bg-[#FDBA74] bg-opacity-50 relative ">
      <div className="py-10 pb-16 h-full">
        <div className="px-6 ">
          <p className="text-xl font-bold">รายการแจ้งซ่อมของฉัน</p>

          <div className="flex flex-row gap-2 mt-4">
            <Input type="text" placeholder="ค้นหารายการแจ้งซ่อม" />

            <div className="w-[150px] relative">
              <div className="z-0 absolute bottom-6 flex justify-center w-full">
                <Image
                  src={"/assets/maintenance/toolkit.png"}
                  width={80}
                  height={80}
                  alt="maintenance logo"
                />
              </div>

              <div className="absolute w-full z-10">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="ทั้งหมด" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>ทั้งหมด</SelectLabel>
                      <SelectItem value="1">ซ่อมแล้ว</SelectItem>
                      <SelectItem value="2">ยังไม่ซ่อม</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white absolute top-[85%] w-full rounded-t-3xl p-6">
        <div className="flex flex-row items-center justify-between">
          <p className="font-bold">ประวัติย้อนหลัง</p>

          <Button variant="outline" size="icon" className="rounded-full">
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-8">
          <MaintenanceHistoryList />
        </div>
      </div>
    </div>
  );
};

export default StudentMaintenancePage;
