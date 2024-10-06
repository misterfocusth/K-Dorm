"use client";

import { ReactNode } from "react";

import { Noto_Sans_Thai } from "next/font/google";
import { cn } from "@/libs/utils";

import { usePathname } from "next/navigation";
import StudentHeader from "@/components/StudentHeader";
import Image from "next/image";
import { NavbarContextProvider } from "@/contexts/NavbarContext";

const notoSansThai = Noto_Sans_Thai({ subsets: ["latin"] });

const StudentLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <main className={cn("h-[100dvh] max-w-md", notoSansThai.className)}>
      <NavbarContextProvider>
        <StudentHeader />

        <div className="px-9 h-full">{children}</div>
      </NavbarContextProvider>
    </main>
  );
};

export default StudentLayout;
