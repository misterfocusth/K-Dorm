// Config
import { BOTTOM_NAVBAR_PATHS } from "@/config/navbar";

// Context
import { NavbarContext } from "@/providers/NavbarProvider";

// Icons
import { Building, CircleUser, House, QrCode, ReceiptText, Wrench } from "lucide-react";

// Next
import { useRouter } from "next/navigation";

// React
import { useContext } from "react";

const StudentNavbar = () => {
  const router = useRouter();

  const { isShowStudentHomeNavbar, isShowBottomNavbar, currentActiveBottomNavbarIndex } =
    useContext(NavbarContext);

  if (isShowBottomNavbar && !isShowStudentHomeNavbar) {
    return (
      <div className="w-full bg-white drop-shadow-lg border rounded-t-3xl py-4 flex flex-row items-center justify-between px-6 pb-6">
        <NavbarItem
          icon={<House className="w-7 h-7" />}
          label="หน้าหลัก"
          onClick={() => router.push(BOTTOM_NAVBAR_PATHS[0])}
          isActive={currentActiveBottomNavbarIndex === 0}
        />

        <NavbarItem
          icon={<QrCode className="w-7 h-7" />}
          label="แสดงโค๊ด"
          onClick={() => router.push(BOTTOM_NAVBAR_PATHS[1])}
          isActive={currentActiveBottomNavbarIndex === 1}
        />

        <NavbarItem
          icon={<Building className="w-7 h-7" />}
          label="หอพัก"
          onClick={() => router.push(BOTTOM_NAVBAR_PATHS[2])}
          isActive={currentActiveBottomNavbarIndex === 2}
        />

        <NavbarItem
          icon={<ReceiptText className="w-7 h-7" />}
          label="ชำระเงิน"
          onClick={() => router.push(BOTTOM_NAVBAR_PATHS[3])}
          isActive={currentActiveBottomNavbarIndex === 3}
        />

        <NavbarItem
          icon={<Wrench className="w-7 h-7" />}
          label="แจ้งซ่อม"
          onClick={() => router.push(BOTTOM_NAVBAR_PATHS[4])}
          isActive={currentActiveBottomNavbarIndex === 4}
        />

        <NavbarItem
          icon={<CircleUser className="w-7 h-7" />}
          label="ฉัน"
          onClick={() => router.push(BOTTOM_NAVBAR_PATHS[5])}
          isActive={currentActiveBottomNavbarIndex === 5}
        />
      </div>
    );
  }

  return <></>;
};

export default StudentNavbar;

type NavbarItemProps = {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  isActive: boolean;
};

const NavbarItem = ({ icon, label, onClick, isActive }: NavbarItemProps) => {
  return (
    <div
      className={`flex flex-col gap-1 items-center justify-center ${isActive ? "opacity-100 text-primary" : "opacity-35"
        }`}
      onClick={onClick}
    >
      {icon}
      <p className="text-xs">{label}</p>
    </div>
  );
};
