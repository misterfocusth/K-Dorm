import { ReactNode } from "react";

import { Noto_Sans_Thai } from "next/font/google";
import { cn } from "@/libs/utils";

const notoSansThai = Noto_Sans_Thai({ subsets: ["latin"] });

const StudentLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return <main className={cn("h-[100dvh] max-w-md px-9", notoSansThai.className)}>{children}</main>;
};

export default StudentLayout;
