import { Button } from "@/components/ui/button";
import Image from "next/image";

const LoginPage = () => {
  return (
    <div className="px-6 flex flex-col gap-16 items-center h-full justify-center">
      <div>
        <div className=" text-2xl font-bold">
          <p>K-Dorm</p>
          <p>ระบบจัดการหอพักนักศึกษาอัจฉริยะ</p>
        </div>

        <p className="mt-4">
          แอปพลิเคชั่นจัดการหอพักสำหรับนักศึกษา สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง
        </p>
      </div>

      <div className="flex flex-col items-center justify-center gap-16 w-full">
        <Image src="/assets/login/login.webp" width={325} height={325} alt="Login Logo" />

        <Button className="w-full">เข้าสู่ระบบโดยใช้ Google Account</Button>
      </div>
    </div>
  );
};

export default LoginPage;
