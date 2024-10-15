"use client";

// Route Guard HOC
import withRoleGuard from "@/components/hoc/withRoleGuard";

// Components
import { Button } from "@/components/ui/button";

// Contexts
import { AuthContext } from "@/providers/AuthProvider";
import { NavbarContext } from "@/providers/NavbarProvider";
import { useStudentProfileImage } from "@/hooks/useStudentProfileImage";
import Image from "next/image";

// React
import { useCallback, useContext, useEffect } from "react";

const StudentProfilePage = () => {
  const { logout, currentUser } = useContext(AuthContext);
  const { setShowHeaderNavbar, resetNavbarContext, setShowBottomNavbar } =
    useContext(NavbarContext);
  const profileImageSrc = useStudentProfileImage();

  const handleLogout = useCallback(async () => {
    await logout();
    resetNavbarContext();
  }, [logout]);

  useEffect(() => {
    setShowBottomNavbar(true);
    setShowHeaderNavbar(false);
  }, []);

  return (
    <div className="bg-green-300 bg-opacity-50 relative">
      <div className="py-10 pb-16 h-full">
        <div className="px-6 flex flex-row justify-between">
          <div className="flex flex-col gap-1">
            <p className="text-xl font-bold">โปรไฟล์</p>
            <p>ดูและจัดการข้อมูลเกี่ยวกับฉัน</p>
          </div>

          <Image src={"/assets/profile/identify.webp"} width={80} height={80} alt="identity logo" />
        </div>
      </div>

      <div className="bg-white absolute top-[85%] w-full rounded-t-3xl p-6 px-16">
        <p className="font-bold text-center">ข้อมูลนักศึกษา</p>

        <div className="flex flex-col items-end justify-between h-full">
          <div className="flex flex-col gap-4 items-center mt-8 w-full">
            <Image
              src={profileImageSrc || ""}
              width={125}
              height={125}
              alt="profile image"
              className="rounded-full"
            />

            <div className="flex flex-row justify-between w-full mt-8">
              <p className="flex-1 text-gray-400">ชื่อ</p>
              <p className="flex-1 text-end">
                {currentUser?.firstName + " " + currentUser?.lastName}
              </p>
            </div>

            <div className="flex flex-row justify-between w-full">
              <p className="flex-1 text-gray-400">อีเมล</p>
              <p className="flex-1 text-end">{currentUser?.email}</p>
            </div>

            <div className="flex flex-row justify-between w-full">
              <p className="flex-1 text-gray-400">รหัสประจำตัว</p>
              <p className="flex-1 text-end">{currentUser?.email.split("@")[0]}</p>
            </div>
          </div>

          <div className="w-full flex flex-col gap-4 mt-36">
            <Button onClick={handleLogout}>ดูประวัติกิจกรรมของฉัน</Button>

            <Button variant={"destructive"} onClick={handleLogout}>
              ออกจากระบบ
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRoleGuard(StudentProfilePage, ["STUDENT"]);
