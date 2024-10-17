"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Activity, ActivityCategory } from "@/types/Activity";
import { Button } from "@/components/ui/button";
import { CircleCheck, CircleX, Eye, Pencil, Trash } from "lucide-react";
import { getTHFormattedDateTime } from "@/libs/datetime";

const studentActivityColumns: ColumnDef<Activity>[] = [
  {
    accessorKey: "name",
    header: "กิจกรรม",
  },
  {
    accessorKey: "note",
    header: "คำอธิบายกิจกรรม",
  },
  {
    accessorKey: "location",
    header: "สถานที่",
  },
  {
    accessorKey: "categories",
    header: "ประเภทกิจกรรม",
    cell: ({ row }) => {
      return row.original.categories.map((category: ActivityCategory) => category.name).join(", ");
    },
  },
  {
    accessorKey: "date",
    header: "วันที่",
    cell: ({ row }) => {
      return getTHFormattedDateTime(row.original.date);
    },
  },
];

export default studentActivityColumns;
