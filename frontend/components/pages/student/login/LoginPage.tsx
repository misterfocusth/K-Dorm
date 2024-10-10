"use client";

import withRoleGuard from "@/components/hoc/withRoleGuard";
// Components
import { Button } from "@/components/ui/button";

// Contexts
import { AuthContext } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

// Next
import Image from "next/image";

// React
import { useCallback, useContext, useTransition } from "react";

const LoginPage = () => {
  const [isPending, startTransition] = useTransition();

  const { loginWithGoogle } = useContext(AuthContext);

  const handleSignIn = useCallback(() => {
    startTransition(async () => await loginWithGoogle());
  }, [loginWithGoogle]);

  return (
    <div className="flex flex-col gap-16 items-center h-full justify-center px-9">
      <div>
        <div className=" text-2xl font-bold flex flex-col gap-1">
          <p>K-Dorm</p>
          <p>ระบบจัดการหอพักนักศึกษาอัจฉริยะ</p>
        </div>

        <p className="mt-4">
          แอปพลิเคชั่นจัดการหอพักสำหรับนักศึกษา สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง
        </p>
      </div>

      <div className="flex flex-col items-center justify-center gap-16 w-full">
        <Image src="/assets/login/login.webp" width={325} height={325} alt="Login Logo" />

        <Button className="w-full font-bold rounded-xl" onClick={handleSignIn} disabled={isPending}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          เข้าสู่ระบบโดยใช้ Google Account
        </Button>
      </div>
    </div>
  );
};

export default withRoleGuard(LoginPage, ["STUDENT"], true);
