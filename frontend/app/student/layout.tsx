import { ReactNode } from "react";

const StudentLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <html>
      <body>
        <main className="h-screen max-w-md">{children}</main>
      </body>
    </html>
  );
};

export default StudentLayout;
