'use client'

import AuthContextProvider from "@/providers/AuthProvider";
import QueryProvider from "@/providers/QueryClientProvider";
import React, { PropsWithChildren } from "react";
import { Toaster } from "sonner";

export const GlobalProvider: React.FC<PropsWithChildren> = ({ children }) => {
    return <QueryProvider>
        <AuthContextProvider>
            <Toaster className="text-xl" position="top-right" />
            {children}
        </AuthContextProvider>
    </QueryProvider>
}