// Icons
import { CreditCard, ScanFace, User, Wrench } from "lucide-react";

// Next Router
import { useRouter } from "next/navigation";

const StudentHomeMenu = () => {
  const router = useRouter();

  return (
    <div className="w-full grid grid-cols-2 gap-4">
      <div
        className="bg-[#BEF264] hover:bg-[#84CC16] items-center rounded-3xl flex flex-col justify-center gap-2 w-full h-[125px]"
        onClick={() => router.push("/student/qr")}
      >
        <ScanFace className="w-8 h-8" />
        <p className="text-lg font-bold">ยืนยันตัวตน</p>
      </div>

      <div
        className="bg-[#BEF264] hover:bg-[#84CC16] items-center rounded-3xl flex flex-col justify-center gap-2 w-full h-[125px]"
        onClick={() => router.push("/student/billing")}
      >
        <CreditCard className="w-8 h-8" />
        <p className="text-lg font-bold">ตรวจสอบบิล</p>
      </div>

      <div
        className="bg-[#BEF264] hover:bg-[#84CC16] items-center rounded-3xl flex flex-col justify-center gap-2 w-full h-[125px]"
        onClick={() => router.push("/student/maintenance")}
      >
        <Wrench className="w-8 h-8" />
        <p className="text-lg font-bold">แจ้งซ่อม</p>
      </div>

      <div
        className="bg-[#BEF264] hover:bg-[#84CC16] items-center rounded-3xl flex flex-col justify-center gap-2 w-full h-[125px]"
        onClick={() => router.push("/student/profile")}
      >
        <User className="w-8 h-8" />
        <p className="text-lg font-bold">โปรไฟล์</p>
      </div>
    </div>
  );
};

export default StudentHomeMenu;
