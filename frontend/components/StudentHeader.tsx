import { NavbarContext } from "@/contexts/NavbarContext";
import Image from "next/image";
import { useContext } from "react";

const StudentHeader = () => {
  const { showStudentHomeNavbar, showHeaderNavbar, headerNavbarTitle } = useContext(NavbarContext);

  if (showStudentHomeNavbar) {
    return (
      <div className="p-6 w-full shadow-lg">
        <div>
          <Image src="/assets/kmitl_logo.webp" alt="logo" width={70} height={40} />
          <p className="font-bold text-primary mt-1">K-Dorm | Dormitory Management System</p>
        </div>
      </div>
    );
  }

  if (showHeaderNavbar) {
    return <div>Navbar</div>;
  }

  return <></>;
};

export default StudentHeader;
