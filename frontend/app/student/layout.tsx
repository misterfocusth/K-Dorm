"use client";

import { ReactNode } from "react";

import { Noto_Sans_Thai } from "next/font/google";
import { cn } from "@/libs/utils";

import { usePathname } from "next/navigation";
import StudentHeader from "@/components/StudentHeader";
import Image from "next/image";

const notoSansThai = Noto_Sans_Thai({ subsets: ["latin"] });

const StudentLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const pathname = usePathname();

  const isStudentHomePage = pathname === "/student/home";

  return (
    <main className={cn("h-[100dvh] max-w-md", notoSansThai.className)}>
      {isStudentHomePage && (
        <StudentHeader>
          <div>
            <Image src="/assets/kmitl_logo.webp" alt="logo" width={70} height={40} />
            <p className="font-bold text-primary mt-1">K-Dorm | Dormitory Management System</p>
          </div>
        </StudentHeader>
      )}

      <div className="px-9 h-full">{children}</div>
    </main>
  );
};

export default StudentLayout;
