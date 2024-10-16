"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import ActivityCategoryDataTable from "@/components/table/activity/ActivityCategoryDataTable";
import activityCategoryColumns from "@/components/table/columns/ActivityCategoryColumns";
import { useActivityCategoryContext } from "@/providers/ActivityCategoryProvider";
import { ACTIVITIES, Activity, CATEGORIES } from "@/types/Activity";
import { ColumnDef } from "@tanstack/react-table";

import { ActivityCategory } from "@/types/Activity";
import { Button } from "@/components/ui/button";
import { CircleCheck, CircleFadingPlus, CircleX, Eye, Pencil, Trash } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { getTHFormattedDateTime } from "@/libs/datetime";
import EditCategoryDialog from "@/components/dialog/EditCategoryDialog";
import CreateCategorySection from "@/components/activity/CreateCategorySection";
import { getApiService } from "@/libs/tsr-react-query";
import { QUERY_KEYS } from "@/constants";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useMutation } from "@tanstack/react-query";

const ManageActivityCategoryPage = () => {
  const {
    selectedCategory,
    deleteCategoryById,
    showEditCategoryModal,
    setSelectedCategory,
    showCreateCategorySection,
  } = useActivityCategoryContext();
  const [filteredActivities, setFilteredActivities] = useState<Activity[]>([]);

  const { isLoading, isFetching, data, refetch } =
    getApiService().activityCategory.getAllActivityCategory.useQuery({
      queryKey: QUERY_KEYS.activityCategory.getAllActivityCategory,
    });

  const allCategories = useMemo(() => data?.body.result, [data]);

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
      cell: ({ row }) => {
        return (
          <div className="flex flex-row items-center gap-2 ">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={() => {
                console.log(row.original);
                setSelectedCategory(row.original);
                showEditCategoryModal();
              }}
            >
              <Pencil className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={() => deleteCategoryById(row.original.id, refetch)}
            >
              <Trash className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={() => setSelectedCategory(row.original)}
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
  ];

  const activityColumns: ColumnDef<Activity>[] = [
    {
      accessorKey: "id",
      header: "ไอดี",
    },
    {
      accessorKey: "name",
      header: "ชื่อกิจกรรม",
    },
    {
      accessorKey: "note",
      header: "รายละเอียด",
      cell: ({ row }) => {
        return row.original.note || "-";
      },
    },
    {
      accessorKey: "location",
      header: "สถานที่",
    },
    {
      accessorKey: "student",
      header: "รหัสนักศึกษา",
      cell: ({ row }) => {
        return row.original.student.id;
      },
    },
    {
      accessorKey: "date",
      header: "วันที่บันทึกกิจกรรม",
      cell: ({ row }) => {
        return getTHFormattedDateTime(row.original.date);
      },
    },
  ];

  // useEffect(() => {
  //   if (selectedCategory && allActivities) {
  //     const filtered = allActivities.filter((activity) => activity.categoryId === selectedCategory.id);
  //     setFilteredActivities(filtered);
  //   }
  // }, [selectedCategory]);

  if (isLoading || isFetching) return <LoadingSpinner loading />;

  return (
    <div className="p-10">
      <div className="flex flex-row items-center justify-between">
        <p className="text-2xl font-bold">จัดการหมวดหมู่กิจกรรม</p>
        <Button onClick={showCreateCategorySection}>
          <CircleFadingPlus className="mr-2 h-4 w-4" />
          เพิ่มหมวดหมู่กิจกรรมใหม่
        </Button>
      </div>

      <div className="mt-8">
        <CreateCategorySection refetch={refetch} />
      </div>

      <div className="mt-8">
        {allCategories && (
          <ActivityCategoryDataTable columns={activityCategoryColumns} data={allCategories} />
        )}
      </div>

      <div className="flex flex-row items-center justify-between mt-8">
        <p className="text-2xl font-bold  flex-1">กิจกรรมของหมวดหมู่ที่เลือก</p>

        <Select disabled={false} value={selectedCategory?.id + ""}>
          <SelectTrigger className="flex-1">
            <SelectValue placeholder="เลือกประเภทที่ต้องการดูกิจกรรม" />
          </SelectTrigger>

          <SelectContent>
            {allCategories &&
              allCategories.map((category) => (
                <SelectItem
                  key={category.id + ""}
                  onClick={() => setSelectedCategory(category)}
                  value={category.id + ""}
                >
                  {category.handle}: {category.name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>

      <div className="mt-8">
        <ActivityCategoryDataTable columns={activityColumns} data={filteredActivities} />
      </div>

      <div>
        <EditCategoryDialog refetch={refetch} />
      </div>
    </div>
  );
};

export default ManageActivityCategoryPage;
