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

import Header from "./Header";
import BillingOverview from "./BillingOverview";
import BillingDetails from "./BillingDetails";

const BillingPage = () => {
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
        <main className="flex overflow-hidden flex-col mx-auto w-full bg-white max-w-[480px] pb-20">
            <div className="flex z-10 flex-col mt-0 w-full">
                <Header />
                <BillingOverview />
                <BillingDetails />
            </div>
        </main>
    )
}

export default BillingPage