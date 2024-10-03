import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

type StudentResidenceCardProps = {
  room: string;
  building: string;
};

const StudentResidenceCard = ({ room, building }: StudentResidenceCardProps) => {
  return (
    <div className="bg-[#FDBA74] w-[175px] flex flex-col gap-4 p-4 rounded-2xl">
      <div className="text-gray-700 flex flex-row justify-between items-center">
        <p>{room}</p>
        <Info />
      </div>

      <p className=" text-3xl text-black font-semibold">{building}</p>
    </div>
  );
};

export default StudentResidenceCard;
