'use client'

import AuthContextProvider from "@/providers/AuthProvider";
import { ModalProvider } from "@/providers/ModalProvider";
import QueryProvider from "@/providers/QueryClientProvider";
import React, { PropsWithChildren } from "react";
import { DayPickerProvider } from "react-day-picker";
import { Toaster } from "sonner";

export const GlobalProvider: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <QueryProvider>
            <AuthContextProvider>
                <DayPickerProvider initialProps={{

                }}>
                    <ModalProvider>
                        <Toaster className="text-xl" position="top-right" />
                        {children}
                    </ModalProvider>
                </DayPickerProvider>
            </AuthContextProvider>
        </QueryProvider>
    )
}