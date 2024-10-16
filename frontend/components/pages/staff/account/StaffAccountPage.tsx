"use client";

import withRoleGuard from "@/components/hoc/withRoleGuard";
import StaffAccountTable from "@/components/staff/account/table/StaffAccountTable";
import CreateStaffAccountSection from "@/components/staff/account/CreateStaffAccountSection";
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
import { useManageStaffAccountContext } from "@/providers/ManageStaffAccountProvider";
import { Account, STAFF_ROLES } from "@/types";
import { UserPlusIcon } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import EditStaffAccountDialog from "./EditStaffAccountDialog";

import { ColumnDef } from "@tanstack/react-table";
import { CircleCheck, CircleX, Shield, UserIcon, Wrench } from "lucide-react";

import { MoreHorizontal } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LoadingSpinner from "@/components/LoadingSpinner";
import useStaffAccount from "@/hooks/accout/useStaffAccount";

const StaffAccountPage = () => {
  const { showCreateStaffAccountSection, setSelectedStaffAccount, openEditStaffAccountDialog } =
    useManageStaffAccountContext();
  const { isLoading, isFetching, accounts, refetch } = useStaffAccount();

  const [searchText, setSearchText] = useState<string>("");
  const [staffType, setStaffType] = useState<string>("ALL");
  const [accountStatus, setAccountStatus] = useState<string>("ALL");
  const [filteredStaffs, setFilteredStaffs] = useState(accounts);

  const staffTableColumns: ColumnDef<Account>[] = useMemo(() => {
    return [
      {
        accessorKey: "id",
        header: "ไอดีพนักงาน",
      },
      {
        accessorKey: "email",
        header: "อีเมล",
      },
      {
        accessorKey: "firstName",
        header: "ชื่อจริง",
      },
      {
        accessorKey: "lastName",
        header: "นามสกุล",
      },
      {
        accessorKey: "isDisabled",
        header: "สถานะของบัญชี",
        cell: ({ row }) => {
          return !row.original.isDisabled ? (
            <div className="flex flex-row gap-2 text-bold items-center p-2 px-4 bg-green-300 rounded-xl w-fit text-sm">
              <CircleCheck className="w-4 h-4" />
              <p>ใช้งานอยู่</p>
            </div>
          ) : (
            <div className="flex flex-row gap-2 text-bold items-center p-2 px-4 bg-red-300 rounded-xl w-fit text-sm">
              <CircleX className="w-4 h-4" />
              <p>ถูกระงับการใช้งาน</p>
            </div>
          );
        },
      },
      {
        accessorKey: "role",
        header: "ประเภทพนักงาน",
        cell: ({ row }) => {
          if (row.original.staff) {
            return (
              <div className="flex flex-row gap-2 text-bold items-center">
                <UserIcon className="w-5 h-5" />
                <p>พนักงาน</p>
              </div>
            );
          } else if (row.original.securityStaff) {
            return (
              <div className="flex flex-row gap-2 text-bold items-center">
                <Shield className="w-5 h-5" />
                <p>เจ้าหน้าที่รักษาความปลอดภัย</p>
              </div>
            );
          } else if (row.original.maintenanceStaff) {
            return (
              <div className="flex flex-row gap-2 text-bold items-center">
                <Wrench className="w-5 h-5" />
                <p>เจ้าหน้าที่ซ่อมบำรุง</p>
              </div>
            );
          } else {
            return "ไม่มีประเภท";
          }
        },
      },

      {
        id: "actions",
        cell: ({ row }) => {
          const staff = row.original;
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>การดำเนินการ</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => navigator.clipboard.writeText(staff.id + "")}>
                  คัดลอกไอดี
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigator.clipboard.writeText(staff.email)}>
                  คัดลอกอีเมล
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    openEditStaffAccountDialog();
                    setSelectedStaffAccount(staff);
                  }}
                >
                  {" "}
                  แก้ไขข้อมูลพนักงาน
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ];
  }, [setSelectedStaffAccount, openEditStaffAccountDialog]);

  const filterStaffAccounts = useCallback(
    (searchText: string, staffType: string, accountStatus: string) => {
      let filtered = accounts;

      if (!filtered) return;

      if (searchText) {
        filtered = filtered.filter(
          (staff: Account) =>
            staff.email.includes(searchText) ||
            staff.firstName.includes(searchText) ||
            staff.lastName.includes(searchText)
        );
      }

      if (staffType === "STAFF") filtered = filtered.filter((staff) => !!staff.staff);
      else if (staffType === "MAINTENANCE_STAFF")
        filtered = filtered.filter((staff) => !!staff.maintenanceStaff);
      else if (staffType === "SECURITY_STAFF")
        filtered = filtered.filter((staff) => !!staff.securityStaff);

      if (accountStatus === "ENABLED") filtered = filtered.filter((staff) => !staff.isDisabled);
      else if (accountStatus === "DISABLED")
        filtered = filtered.filter((staff) => staff.isDisabled);

      console.log("filtered", filtered);
      setFilteredStaffs(filtered);
    },
    [accounts]
  );

  useEffect(() => {
    filterStaffAccounts(searchText, staffType, accountStatus);
  }, [searchText, staffType, accountStatus, filterStaffAccounts]);

  if (isLoading || isFetching) return <LoadingSpinner loading />;

  return (
    <div className="p-10">
      <EditStaffAccountDialog refetch={refetch} />

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

      <div className="mt-8">{<CreateStaffAccountSection refetch={refetch} />}</div>

      {/* STAFF ACCOUNT TABLE */}
      <div className="mt-8">
        <StaffAccountTable columns={staffTableColumns} data={filteredStaffs || []} />
      </div>
    </div>
  );
};

export default withRoleGuard(StaffAccountPage, {
  requiredRoles: [...STAFF_ROLES],
});
