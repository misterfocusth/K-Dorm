"use client";

// Context
import { NavbarContext } from "@/contexts/NavbarContext";

// React
import { useCallback, useContext, useEffect, useMemo, useState } from "react";

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
import { Button } from "@/components/ui/button";

// Image
import Image from "next/image";

// Icons
import { Plus } from "lucide-react";

// Components
import MaintenanceHistoryList from "@/components/student/list/MaintenanceHistoryList";
import { useRouter } from "next/navigation";

// Route Guard HOC
import withRoleGuard from "@/components/hoc/withRoleGuard";
import { QUERY_KEYS } from "@/constants";
import { getApiService } from "@/libs/tsr-react-query";
import LoadingSpinner from "@/components/LoadingSpinner";

const StudentMaintenancePage = () => {
  const router = useRouter();

  const { setShowBottomNavbar, setShowHeaderNavbar } = useContext(NavbarContext);

  const [searchText, setSearchText] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string | null>(null);

  const { isLoading, isFetching, data } =
    getApiService().maintenance.getStudentMaintenanceTickets.useQuery({
      queryKey: QUERY_KEYS.maintenance.getStudentMaintenanceTickets,
    });

  const maintenanceTickets = useMemo(() => {
    if (!data?.body.result) return [];
    else
      return data.body.result.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
  }, [data?.body.result]);

  const filteredMaintenanceTickets = useMemo(() => {
    if (!maintenanceTickets) return [];
    let filtered = maintenanceTickets;

    if (searchText) {
      filtered = filtered.filter(
        (ticket) => ticket.title.includes(searchText) || ticket.description.includes(searchText)
      );
    }

    if (filterStatus === "2") {
      filtered = filtered.filter((ticket) => ticket.isResolved);
    } else if (filterStatus === "3") {
      filtered = filtered.filter((ticket) => !ticket.isResolved);
    }

    return filtered;
  }, [maintenanceTickets, searchText, filterStatus]);

  useEffect(() => {
    setShowBottomNavbar(true);
    setShowHeaderNavbar(false);
  }, []);

  if (isLoading || isFetching) {
    return <LoadingSpinner loading />;
  }

  return (
    <div className="bg-[#FDBA74] bg-opacity-50 relative">
      <div className="py-10 pb-16 h-full">
        <div className="px-6 ">
          <p className="text-xl font-bold">รายการแจ้งซ่อมของฉัน</p>

          <div className="flex flex-row gap-2 mt-4">
            <Input
              type="text"
              placeholder="ค้นหารายการแจ้งซ่อม"
              onChange={(e) => setSearchText(e.target.value)}
            />

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
                <Select onValueChange={setFilterStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="สถานะ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="1">ทั้งหมด</SelectItem>
                      <SelectItem value="2">ซ่อมแล้ว</SelectItem>
                      <SelectItem value="3">ยังไม่ซ่อม</SelectItem>
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

          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={() => router.push("/student/maintenance/new")}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-6 pb-24">
          <MaintenanceHistoryList maintenanceTickets={filteredMaintenanceTickets} />
        </div>
      </div>
    </div>
  );
};

export default withRoleGuard(StudentMaintenancePage, ["STUDENT"]);
