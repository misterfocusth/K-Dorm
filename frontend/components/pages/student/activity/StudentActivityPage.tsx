"use client";

import withRoleGuard from "@/components/hoc/withRoleGuard";
import LoadingSpinner from "@/components/LoadingSpinner";
import StudentActivityItem from "@/components/student/activity/StudentActivityItem";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { getApiService } from "@/libs/tsr-react-query";
import { useAuthContext } from "@/providers/AuthProvider";
import { useNavbarContext } from "@/providers/NavbarProvider";
import { ChevronLeft, Info } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const StudentActivityPage = () => {
  const router = useRouter();

  const { currentUser } = useAuthContext();
  const { setShowBottomNavbar, setShowHeaderNavbar } = useNavbarContext();

  const { isLoading, isFetching, data } = getApiService().activity.getAllActivityByStudent.useQuery(
    {
      queryData: {
        params: {
          studentId: currentUser?.student.studentId,
        },
      },
      queryKey: ["GET ALL STUDENT CATEGORY ACTIVITY"],
      enabled: !!currentUser?.student.studentId,
    }
  );

  const [acc, setAcc] = useState(data?.body.result);

  useEffect(() => {
    setShowBottomNavbar(true);
    setShowHeaderNavbar(false);
  });

  const [volunteerCount, activityCount, prohibitedCount] = useMemo(() => {
    const studentActivities = acc;

    if (!studentActivities) return [0, 0, 0];

    let volunteerCount = 0;
    let activityCount = 0;
    let prohibitedCount = 0;

    for (const studentActivity of studentActivities) {
      for (const category of studentActivity.categories) {
        if (category.name === "VOLUNTEER" && studentActivity.earnedVolunteerHours) {
          volunteerCount += studentActivity.earnedVolunteerHours;
        }
        if (category.name === "ACTIVITY") activityCount++;
        if (category.name === "PROHIBITED") prohibitedCount++;
      }
    }
    return [volunteerCount, activityCount, prohibitedCount];
  }, [acc]);

  useEffect(() => {
    console.log(data);
    if (data?.body.result) {
      setAcc(data.body.result);
    }
  }, [data?.body.result]);

  if (isLoading || isFetching) return <LoadingSpinner loading />;

  return (
    <div className="bg-gradient-to-b from-orange-50 to-orange-200 bg-opacity-50 relative">
      <div className="flex flex-row px-6 pt-6 items-center relative">
        <ChevronLeft className="absolute" onClick={() => router.back()} />
        <p className="text-xl font-bold  text-center w-full">กิจกรรมของฉัน</p>
      </div>

      <div className=" pb-16 h-full px-6">
        <div className="mt-6 w-full flex flex-row justify-end">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="flex flex-row items-center gap-2 text-gray-400">
                  <p className="text-sm">หน้านี้คืออะไร</p>
                  <Info className="w-5 h-5" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>หน้าสำหรับดูข้อมูล และบันทึกกิจกรรมของฉัน</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="w-full flex flex-row items-center justify-between bg-white p-4 rounded-2xl mt-4">
          <div className="flex flex-row items-center gap-4">
            <Image
              src={"/assets/activity/empathy.png"}
              width={1920}
              height={1080}
              alt="activity logo"
              className="h-9 w-9"
            />

            <div className="flex flex-col gap-1 ">
              <p>ชั่วโมงกิจกรรมจิตอาสา</p>
              <p
                className="text-xs underline text-[#9E9E9E]"
                onClick={() => router.push("/student/activity/all?category=VOLUNTEER")}
              >
                ดูกิจกรรมที่เคยเข้าร่วม
              </p>
            </div>
          </div>

          <p className="text-lg font-semibold">{volunteerCount} ชั่วโมง</p>
        </div>

        <div className="w-full flex flex-row items-center justify-between bg-white p-4 rounded-2xl mt-4">
          <div className="flex flex-row items-center gap-4">
            <Image
              src={"/assets/activity/physical.png"}
              width={1920}
              height={1080}
              alt="activity logo"
              className="h-9 w-9"
            />

            <div className="flex flex-col gap-1 ">
              <p>กิจกรรมอื่นๆ ที่เข้าร่วม</p>
              <p
                className="text-xs underline text-[#9E9E9E]"
                onClick={() => router.push("/student/activity/all?category=ACTIVITY")}
              >
                ดูกิจกรรมที่เคยเข้าร่วม
              </p>
            </div>
          </div>

          <p className="text-lg font-semibold">{activityCount} กิจกรรม</p>
        </div>

        <div className="w-full flex flex-row items-center justify-between bg-white p-4 rounded-2xl mt-4">
          <div className="flex flex-row items-center gap-4">
            <Image
              src={"/assets/activity/prohibited.png"}
              width={1920}
              height={1080}
              alt="activity logo"
              className="h-9 w-9"
            />

            <div className="flex flex-col gap-1 ">
              <p>การประพฤติมิชอบ</p>
              <p
                className="text-xs underline text-[#9E9E9E]"
                onClick={() => router.push("/student/activity/all?category=ALL")}
              >
                ดูประวัติ
              </p>
            </div>
          </div>

          <p className="text-lg font-semibold">{prohibitedCount} ครั้ง</p>
        </div>
      </div>

      <div className="bg-white absolute top-[90%] w-full rounded-t-3xl p-6 ">
        <div className="flex flex-row items-center justify-between">
          <p className="font-bold flex-1">ประวัติย้อนหลัง</p>

          <Select onValueChange={() => {}}>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="ดูตามประเภท" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="1">ทั้งหมด</SelectItem>
                <SelectItem value="2">กิจกรรม</SelectItem>
                <SelectItem value="3">จิตอาสา</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="mt-8 pb-24 flex flex-col">
          {acc &&
            acc.map((activity, index) => (
              <div key={index}>
                <StudentActivityItem activity={activity} />
                <Separator className="my-4" />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default withRoleGuard(StudentActivityPage, { requiredRoles: ["STUDENT"] });
