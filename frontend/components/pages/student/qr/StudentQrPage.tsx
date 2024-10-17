"use client";

// Route Guard HOC
import withRoleGuard from "@/components/hoc/withRoleGuard";

// Components
import { Button } from "@/components/ui/button";

// Contexts
import { AuthContext } from "@/providers/AuthProvider";
import { NavbarContext } from "@/providers/NavbarProvider";
import { useStudentProfileImage } from "@/hooks/useStudentProfileImage";
import Image from "next/image";

// React
import { useCallback, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";

import { RotateCcw } from "lucide-react";

const StudentQrPage = () => {
    const router = useRouter();

    const { logout, currentUser } = useContext(AuthContext);
    const { setShowHeaderNavbar, resetNavbarContext, setShowBottomNavbar } =
        useContext(NavbarContext);
    const profileImageSrc = useStudentProfileImage();

    const handleLogout = useCallback(async () => {
        await logout();
        resetNavbarContext();
    }, [logout, resetNavbarContext]);

    useEffect(() => {
        setShowBottomNavbar(true);
        setShowHeaderNavbar(false);
    }, []);

    return (
        <div className="px-8 py-10 h-full w-full">
            <h1 className="font-bold text-3xl">ยืนยันตัวตน</h1>
            <p className="text-gray-800 text-base">ให้เจ้าหน้าที่ของหอพักแสกน QR CODE <br /> เพื่อยืนยันตัวตนนักศึกษา</p>


            <div className="w-full flex flex-col gap-y-5 items-center">
                <Image src={"/assets/qr/qrcard.png"} width={300} height={300} alt="qr code" className="w-full mt-10" />
                <Button className="flex justify-center bg-stone-100 border border-primary text-black w-fit">
                    <RotateCcw size={24} className="mr-2 text-black" />
                    <p className="text-sm font-semibold">อับเดตรหัสใหม่</p>
                </Button>
            </div>
        </div>
    )
}

export default StudentQrPage