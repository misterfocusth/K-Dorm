import type { Metadata } from "next";
import "./globals.css";

// React Query
import RQClientProvider from "@/providers/RQClientProvider";

// Context
import AuthContextProviders from "@/contexts/AuthContext";

// Font
import { Noto_Sans_Thai } from "next/font/google";

const notoSansThai = Noto_Sans_Thai({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "K-Dorm | King Mongkut's Institute of Technology Ladkrabang",
  description:
    "Intelligence Dormitory Management System for King Mongkut's Institute of Technology Ladkrabang (KMITL)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main className={notoSansThai.className}>
          <RQClientProvider>
            <AuthContextProviders>{children}</AuthContextProviders>
          </RQClientProvider>
        </main>
      </body>
    </html>
  );
}
