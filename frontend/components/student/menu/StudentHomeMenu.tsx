import { CreditCard, ScanFace, User, Wrench } from "lucide-react";

const StudentHomeMenu = () => {
  return (
    <div className="w-full grid grid-cols-2 gap-4">
      <div className="bg-[#BEF264] hover:bg-[#84CC16] items-center rounded-3xl flex flex-col justify-center gap-2 w-full h-[125px]">
        <ScanFace className="w-8 h-8" />
        <p className="text-lg font-bold">ยืนยันตัวตน</p>
      </div>

      <div className="bg-[#BEF264] hover:bg-[#84CC16] items-center rounded-3xl flex flex-col justify-center gap-2 w-full h-[125px]">
        <CreditCard className="w-8 h-8" />
        <p className="text-lg font-bold">ตรวจสอบบิล</p>
      </div>

      <div className="bg-[#BEF264] hover:bg-[#84CC16] items-center rounded-3xl flex flex-col justify-center gap-2 w-full h-[125px]">
        <Wrench className="w-8 h-8" />
        <p className="text-lg font-bold">แจ้งซ่อม</p>
      </div>

      <div className="bg-[#BEF264] hover:bg-[#84CC16] items-center rounded-3xl flex flex-col justify-center gap-2 w-full h-[125px]">
        <User className="w-8 h-8" />
        <p className="text-lg font-bold">โปรไฟล์</p>
      </div>
    </div>
  );
};

export default StudentHomeMenu;
