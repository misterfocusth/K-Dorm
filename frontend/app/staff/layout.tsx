"use client";

// Components
import StaffLeftMenu from "@/components/StaffLeftMenu";
import StaffRightMenu from "@/components/StaffRightMenu";

// Next
import { usePathname } from "next/navigation";

// React
import { ReactNode, useEffect, useState } from "react";

const StaffLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const pathname = usePathname();
  const [shouldShowMenu, setShouldShowMenu] = useState(false);

  useEffect(() => {
    setShouldShowMenu(pathname !== "/staff/login");
  }, [pathname]);

  return (
    <main className={"h-[100dvh]"}>
      <div className="h-full flex flex-row">
        {shouldShowMenu && (
          <div className="w-[19%] bg-orange-100">
            <StaffLeftMenu />
          </div>
        )}

        <div className=" w-full">{children}</div>

        {shouldShowMenu && (
          <div className="w-[3.5%] bg-orange-100">
            <StaffRightMenu />
          </div>
        )}
      </div>
    </main>
  );
};

export default StaffLayout;
