"use client";

import withRoleGuard from "@/components/hoc/withRoleGuard";
import { staffTableColumns } from "@/components/staff/account/table/Columns";
import StaffAccountTable from "@/components/staff/account/table/StaffAccountTable";
import CreateStaffAccountSection from "@/components/staff/maintenance/CreateStaffAccountSection";
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
import { useManageStaffAccountContext } from "@/contexts/ManageStaffAccountContext";
import { Account } from "@/types";
import { UserPlusIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const staffs: Account[] = [
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
  const { showCreateStaffAccountSection } = useManageStaffAccountContext();

  const [searchText, setSearchText] = useState<string>("");
  const [staffType, setStaffType] = useState<string>("ALL");
  const [accountStatus, setAccountStatus] = useState<string>("ALL");
  const [filteredStaffs, setFilteredStaffs] = useState<Account[]>(staffs);

  const filterStaffAccounts = useCallback(
    (searchText: string, staffType: string, accountStatus: string) => {
      let filtered = staffs;

      if (!filtered) return;

      if (searchText) {
        filtered = filtered.filter(
          (staff) =>
            staff.email.includes(searchText) ||
            staff.firstName.includes(searchText) ||
            staff.lastName.includes(searchText)
        );
      }

      if (staffType !== "STAFF") filtered = filtered.filter((staff) => !!staff.staff);
      if (staffType !== "MAINTENANCE_STAFF")
        filtered = filtered.filter((staff) => !!staff.maintenanceStaff);
      if (staffType !== "SECURITY_STAFF")
        filtered = filtered.filter((staff) => !!staff.securityStaff);

      if (accountStatus === "ENABLED") filtered = filtered.filter((staff) => !staff.isDisabled);
      if (accountStatus === "DISABLED") filtered = filtered.filter((staff) => staff.isDisabled);

      setFilteredStaffs(filtered);
    },
    []
  );

  useEffect(() => {
    filterStaffAccounts(searchText, staffType, accountStatus);
  }, [searchText, staffType, accountStatus, filterStaffAccounts]);

  return (
    <div className="p-10">
      <p className="text-2xl font-bold">จัดการบัญชีการเข้าสู่ระบบของพนักงาน</p>

      <div className=" mt-8 flex flex-row items-center gap-6 ">
        <Input
          placeholder="ค้นหาโดยใช้อีเมล หรือ ชื่อของพนักงาน"
          onChange={(e) => setSearchText(e.target.value)}
        />

        <Select onValueChange={setStaffType}>
          <SelectTrigger className="w-[50%]">
            <SelectValue placeholder="เลือกดูตามประเภทพนักงาน" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>ประเภทพนักงาน</SelectLabel>
              <SelectItem value="ALL">ทั้งหมด</SelectItem>
              <SelectItem value="STAFF">เจ้าหน้าที่</SelectItem>
              <SelectItem value="MAINTENANCE_STAFF">เจ้าหน้าที่ซ่อมบำรุง</SelectItem>
              <SelectItem value="SECURITY_STAFF">เจ้าหน้าที่รักษาความปลอดภัย</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select onValueChange={setAccountStatus}>
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

        <Button onClick={showCreateStaffAccountSection}>
          <UserPlusIcon className="mr-2 h-4 w-4" />
          เพิ่มพนักงาน
        </Button>
      </div>

      <div className="mt-8">{<CreateStaffAccountSection />}</div>

      {/* STAFF ACCOUNT TABLE */}
      <div className="mt-8">
        <StaffAccountTable columns={staffTableColumns} data={staffs} />
      </div>
    </div>
  );
};

export default withRoleGuard(StaffAccountPage, ["STAFF"]);
