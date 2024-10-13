"use client";

import withRoleGuard from "@/components/hoc/withRoleGuard";
import { staffTableColumns } from "@/components/staff/account/table/Columns";
import StaffAccountTable from "@/components/staff/account/table/StaffAccountTable";
import { Button } from "@/components/ui/button";

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
import { Account } from "@/types";
import { UserPlusIcon } from "lucide-react";
export const staffs: Account[] = [
  {
    id: 1,
    email: "staff@kmitl.ac.th",
    firstName: "System",
    lastName: "Admin",
    isDisabled: false,
    staff: true,
    uid: "1",
  },
  {
    id: 2,
    email: "sila.pak@kmitl.ac.th",
    firstName: "Sila",
    lastName: "Pakdeewong",
    isDisabled: false,
    maintenanceStaff: true,
    uid: "2",
  },
  {
    id: 3,
    email: "focus.pak@kmitl.ac.th",
    firstName: "Focus",
    lastName: "Pakdeewong",
    isDisabled: false,
    securityStaff: true,
    uid: "3",
  },
  {
    id: 4,
    email: "saruta.to@kmitl.ac.th",
    firstName: "Saruta",
    lastName: "Torat",
    isDisabled: true,
    staff: true,
    uid: "4",
  },
];

const StaffAccountPage = () => {
  return (
    <div className="p-10">
      <p className="text-2xl font-bold">จัดการบัญชีการเข้าสู่ระบบของพนักงาน</p>

      <div className=" mt-8 flex flex-row items-center gap-6 ">
        <Input placeholder="ค้นหาโดยใช้อีเมล หรือ ชื่อของพนักงาน" />

        <Select>
          <SelectTrigger className="w-[50%]">
            <SelectValue placeholder="เลืิอกดูตามประเภทพนักงาน" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>ประเภทพนักงาน</SelectLabel>
              <SelectItem value="ALL">ทั้งหมด</SelectItem>
              <SelectItem value="STAFF">พนักงาน</SelectItem>
              <SelectItem value="MAINTENANCE_STAFF">เจ้าหน้าที่ซ่อมบำรุง</SelectItem>
              <SelectItem value="SECURITY_STAFF">เจ้าหน้าที่รักษาความปลอดภัย</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-[50%]">
            <SelectValue placeholder="เลือกดูตามสถานะของบัญชี" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>สถานะของบัญชี</SelectLabel>
              <SelectItem value="ALL">ทั้งหมด</SelectItem>
              <SelectItem value="ENABLED">ใช้งานอยู่</SelectItem>
              <SelectItem value="DISABLED">ถูกระงับการใช้งาน</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button>
          <UserPlusIcon className="mr-2 h-4 w-4" />
          เพิ่มพนักงาน
        </Button>
      </div>

      {/* STAFF ACCOUNT TABLE */}
      <div className="mt-8">
        <StaffAccountTable columns={staffTableColumns} data={staffs} />
      </div>
    </div>
  );
};

export default withRoleGuard(StaffAccountPage, ["STAFF"]);
