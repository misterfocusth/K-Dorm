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
import { useRouter } from "next/navigation";

import RoomCard from "./RoomCard";
import Header from "./Header";

const StudentResidencesPage = () => {
  const router = useRouter();

  const { logout, currentUser } = useContext(AuthContext);
  const { setShowHeaderNavbar, resetNavbarContext, setShowBottomNavbar } =
    useContext(NavbarContext);
  const profileImageSrc = useStudentProfileImage();

  const handleLogout = useCallback(async () => {
    await logout();
    resetNavbarContext();
  }, [logout, resetNavbarContext]);

  useEffect(() => {
    setShowBottomNavbar(true);
    setShowHeaderNavbar(false);
  }, []);

  return (
    <main className="flex overflow-hidden flex-col mx-auto w-full bg-white max-w-[480px]">
      <Header />
      <section className="flex flex-col mt-5 max-w-full justify-center px-5">
        <RoomCard />
        <div className="flex gap-3 items-center self-center mt-3">
          <span className="flex shrink-0 self-stretch my-auto w-3 h-3 bg-gray-800 rounded-full fill-gray-800" />
          <span className="flex shrink-0 self-stretch my-auto w-3 h-3 bg-gray-400 rounded-full fill-gray-400" />
          <span className="flex shrink-0 self-stretch my-auto w-3 h-3 bg-gray-400 rounded-full fill-gray-400" />
          <span className="flex shrink-0 self-stretch my-auto w-3 h-3 bg-gray-400 rounded-full fill-gray-400" />
        </div>
      </section>
    </main>
  )
}

export default StudentResidencesPage