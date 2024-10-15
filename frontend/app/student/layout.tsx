"use client";

// React
import { ReactNode } from "react";

// Utils
import { cn } from "@/libs/utils";

// Header & Navbar
import StudentHeader from "@/components/StudentHeader";
import StudentNavbar from "@/components/StudentNavbar";

// Context
import { NavbarProvider } from "@/providers/NavbarProvider";

const StudentLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <main className={cn("h-[100dvh] max-w-md")}>
      <NavbarProvider>
        <StudentHeader />

        <div className="h-full z-0">{children}</div>

        <div className="fixed bottom-0 w-full max-w-md z-10">
          <StudentNavbar />
        </div>
      </NavbarProvider>
    </main>
  );
};

export default StudentLayout;
