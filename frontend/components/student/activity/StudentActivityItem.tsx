import { getTHFormattedDateTime } from "@/libs/datetime";
import { Activity, ActivityCategory } from "@/types/Activity";
import { CheckCircle2, ChevronRight, CircleX, HandHeart, ScrollText } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

type StudentActivityItemProps = {
  activity: Activity;
};

const StudentActivityItem = ({ activity }: StudentActivityItemProps) => {
  const router = useRouter();

  const getActivityIcon = useCallback(
    (categories: ActivityCategory[]) => {
      console.log(categories);

      const one = categories.find(
        (category: any) => category.handle === "ENTER_CHECKIN" || category.handle === "EXIT_CHECKIN"
      );
      const two = categories.find((category: any) => category.handle === "ACTIVITY");
      const three = categories.find((category: any) => category.handle === "PROHIBITED");
      const four = categories.find((category: any) => category.handle === "VOLUNTEER");
      if (one) {
        return <CheckCircle2 className="w-12 h-12 text-[#F97316]" />;
      } else if (two) {
        return <ScrollText className="w-12 h-12 text-[#F97316]" />;
      } else if (three) {
        return <CircleX className="w-12 h-12 text-[#FF0000]" />;
      } else if (four) {
        return <HandHeart className="w-12 h-12 text-[#4D7C0F]" />;
      } else {
        return <CheckCircle2 className="w-12 h-12 text-[#F97316]" />;
      }
    },
    [activity]
  );

  if (!activity) return null;

  return (
    <div
      className="flex flex-row items-center p-2 justify-between px-0"
      onClick={() => router.push("/student/activity/" + activity.id)}
    >
      <div className="flex flex-row items-center gap-6">
        <div className="bg-gray-100 rounded-full p-2 w-14 h-14 flex items-center justify-center">
          {getActivityIcon(activity.categories)}
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
