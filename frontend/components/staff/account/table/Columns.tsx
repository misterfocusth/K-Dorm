"use client";

import { Account } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { CircleCheck, CircleX, Shield, UserIcon, Wrench } from "lucide-react";

import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const staffTableColumns: ColumnDef<Account>[] = [
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
            <DropdownMenuItem>แก้ไขข้อมูลพนักงาน</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const StaffAccountColumns = () => {
  return <div>StaffAccountColumns</div>;
};

export default StaffAccountColumns;
