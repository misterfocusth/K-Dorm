"use client";

import ActivityDetail from "@/components/activity/ActivityDetail";
import LoadingSpinner from "@/components/LoadingSpinner";
import { getApiService } from "@/libs/tsr-react-query";
import { useNavbarContext } from "@/providers/NavbarProvider";
import { ACTIVITIES } from "@/types/Activity";
import { CheckCircle2, CircleX, HandHeart, ScrollText } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

type StudentActivityDetailPageProps = {
  id: string;
};

const StudentActivityDetailPage = ({ id }: StudentActivityDetailPageProps) => {
  const { setHeaderNavbarTitle, setShowBottomNavbar, setShowHeaderNavbar } = useNavbarContext();

  const { isLoading, isFetching, data } = getApiService().activity.getByActivityId.useQuery({
    queryData: {
      params: {
        activityId: id,
      },
    },
    queryKey: ["GET ACTIVITY BY ID"],
    enabled: !!id,
  });

  const [activity, setActivity] = useState(data?.body.result);

  useEffect(() => {
    if (data?.body.result) {
      setActivity(data.body.result);
    }
  }, [data?.body.result]);

  useEffect(() => {
    setHeaderNavbarTitle("รายละเอียดประวัติกิจกรรม");
    setShowBottomNavbar(true);
    setShowHeaderNavbar(true);
  }, []);

  const getSubtitle = useCallback(() => {
    if (!activity) return "";

    const one = activity.categories.find(
      (category: any) => category.handle === "ENTER_CHECKIN" || category.handle === "EXIT_CHECKIN"
    );
    const two = activity.categories.find((category: any) => category.handle === "ACTIVITY");
    const three = activity.categories.find((category: any) => category.handle === "PROHIBITED");

    if (one) {
      return "บันทึกเวลาเข้า - ออกหอพักสำเร็จ";
    } else if (two) {
      return "บันทึกการเข้าร่วมกิจกรรม";
    } else if (three) {
      return "บันทึกกิจกรรมจิตอาสา";
    } else {
      return "บันทึกกิจกรรมสำเร็จ";
    }
  }, [activity]);

  const getActivityIcon = useCallback(() => {
    if (!activity) return null;

    const one = activity.categories.find(
      (category: any) => category.handle === "ENTER_CHECKIN" || category.handle === "EXIT_CHECKIN"
    );
    const two = activity.categories.find((category: any) => category.handle === "ACTIVITY");
    const three = activity.categories.find((category: any) => category.handle === "PROHIBITED");
    const four = activity.categories.find((category: any) => category.handle === "VOLUNTEER");

    if (one) {
      return <CheckCircle2 strokeWidth={2} className=" w-16 h-16 text-white" />;
    } else if (two) {
      return <ScrollText strokeWidth={2} className=" w-16 h-16 text-white" />;
    } else if (three) {
      return <CircleX strokeWidth={2} className=" w-16 h-16 text-white" />;
    } else if (four) {
      return <HandHeart strokeWidth={2} className=" w-16 h-16 text-white" />;
    } else {
      return <CheckCircle2 strokeWidth={2} className=" w-16 h-16 text-white" />;
    }
  }, [activity?.categories]);

  if (isLoading || isFetching) return <LoadingSpinner loading />;

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
