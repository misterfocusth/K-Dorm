import { getTHFormattedDateTime } from "@/libs/datetime";
import { Activity } from "@/types/Activity";
import { Separator } from "../ui/separator";

type ActivityDetailProps = {
  activity: Activity;
};

const ActivityDetail = ({ activity }: ActivityDetailProps) => {
  if (!activity) return null;

  return (
    <div className="rounded-3xl p-6 w-full shadow-lg  mt-8">
      <div className="flex flex-col gap-4">
        {activity.earnedVolunteerHours && (
          <div className="flex flex-row justify-between font-semibold text-xl">
            <p className="flex-1 text-[#84CC16] ">ได้รับ</p>
            <p className="flex-1 text-end">{activity.earnedVolunteerHours} ชม. จิตอาสา</p>
          </div>
        )}

        {activity.earnedVolunteerHours && <Separator className="my-2" />}

        <div className="flex flex-row justify-between">
          <p className="flex-1 text-gray-400">กิจกรรม</p>
          <p className="flex-1 text-end">{activity.name}</p>
        </div>

        <div className="flex flex-row justify-between">
          <p className="flex-1 text-gray-400">สถานที่</p>
          <p className="flex-1 text-end">{activity.location}</p>
        </div>

        <div className="flex flex-row justify-between">
          <p className="flex-1 text-gray-400">รายละเอียด</p>
          <p className="flex-1 text-end">{activity.note || "-"}</p>
        </div>

        <div className="flex flex-row justify-between">
          <p className="flex-1 text-gray-400">วันและเวลา</p>
          <p className="flex-1 text-end">{getTHFormattedDateTime(activity.date)}</p>
        </div>
      </div>
    </div>
  );
};

export default ActivityDetail;
