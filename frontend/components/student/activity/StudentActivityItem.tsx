import { getTHFormattedDateTime } from "@/libs/datetime";
import { Activity } from "@/types/Activity";
import { CheckCircle2, ChevronRight, CircleX, HandHeart, ScrollText } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

type StudentActivityItemProps = {
  activity: Activity;
};

const StudentActivityItem = ({ activity }: StudentActivityItemProps) => {
  const router = useRouter();

  const getActivityIcon = useCallback((category: string) => {
    if (category === "ENTER_CHECKIN" || category === "EXIT_CHECKIN") {
      return <CheckCircle2 className="w-12 h-12 text-[#F97316]" />;
    } else if (category === "ACTIVITY") {
      return <ScrollText className="w-12 h-12 text-[#F97316]" />;
    } else if (category === "PROHIBITED") {
      return <CircleX className="w-12 h-12 text-[#FF0000]" />;
    } else if (category === "VOLUNTEER") {
      return <HandHeart className="w-12 h-12 text-[#4D7C0F]" />;
    } else {
      return <CheckCircle2 className="w-12 h-12 text-[#F97316]" />;
    }
  }, []);

  return (
    <div
      className="flex flex-row items-center p-2 justify-between px-0"
      onClick={() => router.push("/student/activity/" + activity.id)}
    >
      <div className="flex flex-row items-center gap-6">
        <div className="bg-gray-100 rounded-full p-2 w-14 h-14 flex items-center justify-center">
          {getActivityIcon(activity.category.handle)}
        </div>

        <div>
          <p className="font-semibold">{activity.name}</p>
          <p>{activity.location}</p>
          <p>{getTHFormattedDateTime(activity.date)}</p>
        </div>
      </div>

      <div>
        <ChevronRight className="w-6 h-6" />
      </div>
    </div>
  );
};

export default StudentActivityItem;
