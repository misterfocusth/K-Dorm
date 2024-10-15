import type { Metadata } from "next";
import "./globals.css";

import { Noto_Sans_Thai } from "next/font/google";
import { GlobalProvider } from "./GlobalProvider";

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
          <GlobalProvider>
            {children}
          </GlobalProvider>
        </main>
      </body>
    </html>
  );
}
