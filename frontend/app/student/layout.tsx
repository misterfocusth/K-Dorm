import { ReactNode } from "react";

import { Noto_Sans_Thai } from "next/font/google";
import { cn } from "@/libs/utils";

const notoSansThai = Noto_Sans_Thai({ subsets: ["latin"] });

const StudentLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <html>
      <body>
        <main className={cn("h-[100dvh] max-w-md px-9", notoSansThai.className)}>{children}</main>
      </body>
    </html>
  );
};

export default StudentLayout;
