"use client";

import withRoleGuard from "@/components/hoc/withRoleGuard";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useNavbarContext } from "@/providers/NavbarProvider";
import { ChevronLeft, Info } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const StudentActivityPage = () => {
  const router = useRouter();

  const { setShowBottomNavbar, setShowHeaderNavbar } = useNavbarContext();

  useEffect(() => {
    setShowBottomNavbar(true);
    setShowHeaderNavbar(false);
  });

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
                onClick={() => router.push("/student/activity/all/1")}
              >
                ดูกิจกรรมที่เคยเข้าร่วม
              </p>
            </div>
          </div>

          <p className="text-lg font-semibold">99 ชั่วโมง</p>
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
                onClick={() => router.push("/student/activity/all/2")}
              >
                ดูกิจกรรมที่เคยเข้าร่วม
              </p>
            </div>
          </div>

          <p className="text-lg font-semibold">99 กิจกรรม</p>
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
                onClick={() => router.push("/student/activity/all/3")}
              >
                ดูประวัติ
              </p>
            </div>
          </div>

          <p className="text-lg font-semibold">99 ครั้ง</p>
        </div>
      </div>

      <div className="bg-white absolute top-[90%] w-full rounded-t-3xl p-6 px-8">Content</div>
    </div>
  );
};

export default withRoleGuard(StudentActivityPage, { requiredRoles: ["STUDENT"] });
