"use client";

import { ReactNode } from "react";

import { Noto_Sans_Thai } from "next/font/google";
import { cn } from "@/libs/utils";

import StudentHeader from "@/components/StudentHeader";
import { NavbarContextProvider } from "@/contexts/NavbarContext";
import StudentNavbar from "@/components/StudentNavbar";

const notoSansThai = Noto_Sans_Thai({ subsets: ["latin"] });

const StudentLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <main className={cn("h-[100dvh] max-w-md ", notoSansThai.className)}>
      <NavbarContextProvider>
        <StudentHeader />

        {/* <div className="px-9 h-full z-0">{children}</div> */}
        <div className="h-full z-0">{children}</div>

        <div className="fixed bottom-0 w-full z-10">
          <StudentNavbar />
        </div>
      </NavbarContextProvider>
    </main>
  );
};

export default StudentLayout;
