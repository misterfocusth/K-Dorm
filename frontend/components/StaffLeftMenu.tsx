import {
  Building,
  Building2,
  CircleUser,
  Eye,
  HomeIcon,
  NotebookPen,
  SquareLibrary,
  UserRoundPlus,
  Wrench,
} from "lucide-react";
import { FC, ReactNode, useEffect, useState } from "react";
import { Separator } from "./ui/separator";
import { usePathname, useRouter } from "next/navigation";
import { STAFF_ROUTE_PREFIX } from "@/constants";
import Image from "next/image";

const PATHS = [
  STAFF_ROUTE_PREFIX + "/home",
  STAFF_ROUTE_PREFIX + "/account",
  STAFF_ROUTE_PREFIX + "/recruit-wave",
  STAFF_ROUTE_PREFIX + "/residences",
  STAFF_ROUTE_PREFIX + "/building",
  STAFF_ROUTE_PREFIX + "/maintenance",
  STAFF_ROUTE_PREFIX + "/activity",
  STAFF_ROUTE_PREFIX + "/activity/category",
  STAFF_ROUTE_PREFIX + "/activity/live",
];

const StaffLeftMenu = () => {
  const [selectedMenuIndex, setSelectedMenuIndex] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const currentIdx = PATHS.findIndex((path) => path === pathname);
    if (currentIdx > 0) setSelectedMenuIndex(currentIdx);
    else setSelectedMenuIndex(0);
  }, [pathname]);

  useEffect(() => {}, []);
  return (
    <div className="py-8 px-4 bg-orange-50 h-full border">
      <div className="flex flex-row items-center gap-4 ">
        <Image
          src="/assets/kmitl.webp"
          width={1920}
          height={1080}
          alt="kmitl logo"
          className=" w-12 h-12"
        />
        <div className="flex flex-col">
          <p className="font-bold text-2xl m-0">K-Dorm</p>
          <p className="text-sm m-0">Management Console</p>
        </div>
      </div>

      <Separator className="my-6 bg-gray-300" />

      <MenuItem
        Icon={<HomeIcon className="w-6 h-6" />}
        isSelected={selectedMenuIndex === 0}
        path={PATHS[0]}
        label="หน้าแรก"
      />

      <Separator className="my-6 bg-gray-300" />

      <div className="flex flex-col gap-4 ">
        <p className="text-sm text-[#9E9E9E] ml-4">การจัดการ</p>

        <MenuItem
          Icon={<CircleUser className="w-6 h-6" />}
          isSelected={selectedMenuIndex === 1}
          path={PATHS[1]}
          label="บัญชีการเข้าสู่ระบบ"
        />

        <MenuItem
          Icon={<UserRoundPlus className="w-6 h-6" />}
          isSelected={selectedMenuIndex === 2}
          path={PATHS[2]}
          label="รอบรับสมัคร"
        />

        <MenuItem
          Icon={<Building className="w-6 h-6" />}
          isSelected={selectedMenuIndex === 3}
          path={PATHS[3]}
          label="การพักอยู่อาศัย"
        />

        <MenuItem
          Icon={<Building2 className="w-6 h-6" />}
          isSelected={selectedMenuIndex === 4}
          path={PATHS[4]}
          label="จัดการตึก"
        />
      </div>

      <Separator className="my-8 bg-gray-300" />

      <div className="flex flex-col gap-4 ">
        <p className="text-sm text-[#9E9E9E] ml-4">ซ่อมแซม</p>

        <MenuItem
          Icon={<Wrench className="w-6 h-6" />}
          isSelected={selectedMenuIndex === 5}
          path={PATHS[5]}
          label="การแจ้งซ่อม"
        />
      </div>

      <Separator className="my-8 bg-gray-300" />

      <div className="flex flex-col gap-4 ">
        <p className="text-sm text-[#9E9E9E] ml-4">บันทึกกิจกรรม</p>

        <MenuItem
          Icon={<NotebookPen className="w-6 h-6" />}
          isSelected={selectedMenuIndex === 6}
          path={PATHS[6]}
          label="ดูและบันทึกกิจกรรม"
        />

        <MenuItem
          Icon={<SquareLibrary className="w-6 h-6" />}
          isSelected={selectedMenuIndex === 7}
          path={PATHS[7]}
          label="หมวดหมู่กิจกรรม"
        />

        {/* <MenuItem
          Icon={<Eye className="w-6 h-6" />}
          isSelected={selectedMenuIndex === 8}
          path={PATHS[8]}
          label="ดูอัปเดทกิจกรรมแบบสด"
        /> */}
      </div>

      <Separator className="mt-8 bg-gray-300" />
    </div>
  );
};

export default StaffLeftMenu;

type MenuItemProps = {
  isSelected: boolean;
  path: string;
  label: string;
  Icon: ReactNode;
};

const MenuItem: FC<MenuItemProps> = ({ isSelected, path, label, Icon }) => {
  const router = useRouter();

  return (
    <div
      className={`flex flex-row gap-3 items-center px-4 py-2 rounded-3xl cursor-pointer hover:bg-orange-300 ${
        isSelected && "bg-orange-300"
      }`}
      onClick={() => router.push(path)}
    >
      {Icon}
      <p>{label}</p>
    </div>
  );
};
