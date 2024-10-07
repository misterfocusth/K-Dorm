import { NavbarContext } from "@/contexts/NavbarContext";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { useContext } from "react";

const StudentHeader = () => {
  const { isShowStudentHomeNavbar, isShowHeaderNavbar, headerNavbarTitle } =
    useContext(NavbarContext);

  if (isShowStudentHomeNavbar) {
    return (
      <div className="p-6 w-full shadow-lg">
        <div>
          <Image src="/assets/kmitl_logo.webp" alt="logo" width={70} height={40} />
          <p className="font-bold text-primary mt-1">K-Dorm | Dormitory Management System</p>
        </div>
      </div>
    );
  }

  if (isShowHeaderNavbar) {
    return (
      <div className="p-4 w-full shadow flex flex-row items-center gap-4">
        <ChevronLeft className="w-7 h-7" />
        <p className="font-bold">{headerNavbarTitle}</p>
      </div>
    );
  }

  return <></>;
};

export default StudentHeader;
