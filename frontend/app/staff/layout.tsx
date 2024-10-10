"use client";

// React
import { ReactNode } from "react";

const StaffLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <main className={"h-[100dvh]"}>
      <div className="h-full z-0">{children}</div>
    </main>
  );
};

export default StaffLayout;
