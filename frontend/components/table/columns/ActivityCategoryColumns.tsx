"use client";

import { ColumnDef } from "@tanstack/react-table";

import { ActivityCategory } from "@/types/Activity";
import { Button } from "@/components/ui/button";
import { CircleCheck, CircleX, Eye, Pencil, Trash } from "lucide-react";

const activityCategoryColumns: ColumnDef<ActivityCategory>[] = [
  {
    accessorKey: "handle",
    header: "ไอดีของประเภทกิจกรรม",
  },
  {
    accessorKey: "name",
    header: "ชื่อของประเภทกิจกรรม",
  },
  {
    accessorKey: "visibleToStudents",
    header: "สำหรักนักศึกษา",
    cell: ({ row }) => {
      return (
        <div>
          {row.original.visibleToStudents ? (
            <div className="flex flex-row gap-2 text-bold items-center p-2 px-4 bg-green-300 rounded-xl w-fit text-sm">
              <CircleCheck className="w-4 h-4" />
              <p>แสดง</p>
            </div>
          ) : (
            <div className="flex flex-row gap-2 text-bold items-center p-2 px-4 bg-red-300 rounded-xl w-fit text-sm">
              <CircleX className="w-4 h-4" />
              <p>ไม่แสดง</p>
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "visibleToStaffs",
    header: "สำหรับพนักงาน",
    cell: ({ row }) => {
      return (
        <div>
          {row.original.visibleToStaffs ? (
            <div className="flex flex-row gap-2 text-bold items-center p-2 px-4 bg-green-300 rounded-xl w-fit text-sm">
              <CircleCheck className="w-4 h-4" />
              <p>แสดง</p>
            </div>
          ) : (
            <div className="flex flex-row gap-2 text-bold items-center p-2 px-4 bg-red-300 rounded-xl w-fit text-sm">
              <CircleX className="w-4 h-4" />
              <p>ไม่แสดง</p>
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "visibleToSecurityStaffs",
    header: "สำหรับพนักงาน รปภ.",
    cell: ({ row }) => {
      return (
        <div>
          {row.original.visibleToSecurityStaffs ? (
            <div className="flex flex-row gap-2 text-bold items-center p-2 px-4 bg-green-300 rounded-xl w-fit text-sm">
              <CircleCheck className="w-4 h-4" />
              <p>แสดง</p>
            </div>
          ) : (
            <div className="flex flex-row gap-2 text-bold items-center p-2 px-4 bg-red-300 rounded-xl w-fit text-sm">
              <CircleX className="w-4 h-4" />
              <p>ไม่แสดง</p>
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "การดำเนินการ",
    cell: () => {
      return (
        <div className="flex flex-row items-center gap-2 ">
          <Button variant="outline" size="icon" className="rounded-full">
            <Pencil className="h-4 w-4" />
          </Button>

          <Button variant="outline" size="icon" className="rounded-full">
            <Trash className="h-4 w-4" />
          </Button>

          <Button variant="outline" size="icon" className="rounded-full">
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];

export default activityCategoryColumns;
