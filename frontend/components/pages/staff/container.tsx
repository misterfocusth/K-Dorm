import React, { PropsWithChildren } from "react";

export const StaffContainer: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className="flex flex-col min-h-dvh p-8">
            {children}
        </div>
    );
}