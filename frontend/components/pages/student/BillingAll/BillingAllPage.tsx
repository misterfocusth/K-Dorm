"use client";

import React from 'react';
import Header from './Header';
import FilterSection from './FilterSection';
import TabSection from './TableSection';
import BillItem from './BillIten';

import { Button } from "@/components/ui/button";

// Contexts
import { AuthContext } from "@/providers/AuthProvider";
import { NavbarContext } from "@/providers/NavbarProvider";
import { useStudentProfileImage } from "@/hooks/useStudentProfileImage";
import Image from "next/image";

// React
import { useCallback, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";

const MyComponent: React.FC = () => {
    const bills = [
        {
            type: 'ค่าน้ำและค่าไฟ',
            month: 'กันยายน 2024',
            amount: '1,200 THB',
            details: [
                { label: 'ค่าไฟ 140 หน่วย (หน่วยละ 7 บาท)', amount: '1,190 THB' },
                { label: 'ค่าน้ำ 2 หน่วย (หน่วยละ 5 บาท)', amount: '1,190 THB' },
                { label: 'ค่าปรับชำระหลังกำหนด', amount: '0 THB' }
            ],
            dueDate: '20 Oct 2024',
            icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/d1a917a77fe98db8f6d5165b7cb29b3f8c3af3edaf35e5b81c37f7bc7239bf14?placeholderIfAbsent=true&apiKey=f812e4cf0d5a4da58d477115f478dd2c'
        },
        {
            type: 'ค่าหอพัก',
            month: 'กันยายน 2024',
            amount: '2,500 THB',
            details: [
                { label: 'ค่าหอพัก ตึก 10 ห้อง 901', amount: '2,500 THB' },
                { label: 'ค่าปรับชำระหลังกำหนด', amount: '0 THB' }
            ],
            dueDate: '20 Oct 2024',
            icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/a4c7aaee4f3c38bef845094474d25d09f32d4414f878f961567c517552ca876e?placeholderIfAbsent=true&apiKey=f812e4cf0d5a4da58d477115f478dd2c'
        },
        {
            type: 'ค่าหอพัก',
            month: 'กันยายน 2024',
            amount: '2,500 THB',
            details: [
                { label: 'ค่าหอพัก ตึก 10 ห้อง 901', amount: '2,500 THB' },
                { label: 'ค่าปรับชำระหลังกำหนด', amount: '100 THB' },
                { label: 'ค่าปรับเพิ่มเติม', amount: '500 THB' }
            ],
            dueDate: '20 Oct 2024',
            icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/a4c7aaee4f3c38bef845094474d25d09f32d4414f878f961567c517552ca876e?placeholderIfAbsent=true&apiKey=f812e4cf0d5a4da58d477115f478dd2c',
            isOverdue: true
        }
    ];

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
        <main className="flex overflow-hidden flex-col mx-auto w-full bg-white max-w-[480px]">
            {/* <div className="shrink-0 self-center max-w-full h-px border border-solid border-zinc-300 w-[375px]" /> */}
            <div className="flex z-10 flex-col items-center mt-0 w-full">
                <Header />
                <FilterSection />
                <TabSection />
                <section className="flex flex-col mt-6 max-w-full w-[393px]">
                    {bills.map((bill, index) => (
                        <React.Fragment key={index}>
                            <BillItem {...bill} />
                            {index < bills.length - 1 && (
                                <div className="self-center mt-4 w-full border border-solid border-zinc-300 min-h-[1px]" />
                            )}
                        </React.Fragment>
                    ))}
                </section>
            </div>
        </main>
    );
};

export default MyComponent;