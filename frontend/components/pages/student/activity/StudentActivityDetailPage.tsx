"use client";

import ActivityDetail from "@/components/activity/ActivityDetail";
import { useNavbarContext } from "@/providers/NavbarProvider";
import { ACTIVITIES } from "@/types/Activity";
import { CheckCircle2, CircleX, HandHeart, ScrollText } from "lucide-react";
import { useCallback, useEffect } from "react";

type StudentActivityDetailPageProps = {
  id: string;
};

const StudentActivityDetailPage = ({ id }: StudentActivityDetailPageProps) => {
  const { setHeaderNavbarTitle, setShowBottomNavbar, setShowHeaderNavbar } = useNavbarContext();
  const activity = ACTIVITIES.find((activity) => activity.id === Number(id));

  useEffect(() => {
    setHeaderNavbarTitle("รายละเอียดประวัติกิจกรรม");
    setShowBottomNavbar(true);
    setShowHeaderNavbar(true);
  }, []);

  const getSubtitle = useCallback(() => {
    if (
      activity?.category.handle === "ENTER_CHECKIN" ||
      activity?.category.handle === "EXIT_CHECKIN"
    ) {
      return "บันทึกเวลาเข้า - ออกหอพักสำเร็จ";
    } else if (activity?.category.handle === "ACTIVITY") {
      return "บันทึกการเข้าร่วมกิจกรรม";
    } else if (activity?.category.handle === "VOLUNTEER") {
      return "บันทึกกิจกรรมจิตอาสา";
    } else {
      return "บันทึกกิจกรรมสำเร็จ";
    }
  }, [activity]);

  const getActivityIcon = useCallback(() => {
    const category = activity?.category.handle;
    if (category === "ENTER_CHECKIN" || category === "EXIT_CHECKIN") {
      return <CheckCircle2 strokeWidth={2} className=" w-16 h-16 text-white" />;
    } else if (category === "ACTIVITY") {
      return <ScrollText strokeWidth={2} className=" w-16 h-16 text-white" />;
    } else if (category === "PROHIBITED") {
      return <CircleX strokeWidth={2} className=" w-16 h-16 text-white" />;
    } else if (category === "VOLUNTEER") {
      return <HandHeart strokeWidth={2} className=" w-16 h-16 text-white" />;
    } else {
      return <CheckCircle2 strokeWidth={2} className=" w-16 h-16 text-white" />;
    }
  }, [activity?.category.handle]);

  return (
    <div className="p-6">
      <div className="flex flex-row items-center justify-between shadow-lg rounded-3xl p-8  w-full">
        <div className="font-semibold flex flex-col gap-1">
          <p>สำเร็จ</p>
          <p className="text-[#9E9E9E]">{getSubtitle()}</p>
        </div>
        <div className={`rounded-full p-2 text-white bg-[#84CC16]`}>{getActivityIcon()}</div>
      </div>

      {activity && <ActivityDetail activity={activity} />}
    </div>
  );
};

export default StudentActivityDetailPage;
