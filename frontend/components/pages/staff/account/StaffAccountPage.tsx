"use client";

import withRoleGuard from "@/components/hoc/withRoleGuard";
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
import { UserPlusIcon } from "lucide-react";

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
    </div>
  );
};

export default withRoleGuard(StaffAccountPage, ["STAFF"]);
