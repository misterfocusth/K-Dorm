// Next
import { usePathname } from "next/navigation";

// React
import { createContext, useEffect, useState } from "react";

interface INavbarContext {
  showStudentHomeNavbar: boolean;
  showHeaderNavbar: boolean;
  showButtonNavbar: boolean;
  headerNavbarTitle: string;
  setShowHeaderNavbar: (show: boolean) => void;
  setShowButtonNavbar: (show: boolean) => void;
  setHeaderNavbarTitle: (title: string) => void;
  setIsShowStudentHomeNavbar: (show: boolean) => void;
}

const initialState: INavbarContext = {
  showStudentHomeNavbar: false,
  showHeaderNavbar: false,
  showButtonNavbar: false,
  headerNavbarTitle: "",
  setShowHeaderNavbar: () => {},
  setShowButtonNavbar: () => {},
  setHeaderNavbarTitle: () => {},
  setIsShowStudentHomeNavbar: () => {},
};

export const NavbarContext = createContext<INavbarContext>(initialState);

export const NavbarContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [showStudentHomeNavbar, setIsShowStudentHomeNavbar] = useState<boolean>(false);
  const [showHeaderNavbar, setShowHeaderNavbar] = useState<boolean>(false);
  const [showButtonNavbar, setShowButtonNavbar] = useState<boolean>(false);
  const [headerNavbarTitle, setHeaderNavbarTitle] = useState<string>("");

  const pathname = usePathname();

  useEffect(() => {
    const isStudentHomePath = pathname === "/student/home";
    setIsShowStudentHomeNavbar(isStudentHomePath);
  }, [pathname]);

  return (
    <NavbarContext.Provider
      value={{
        showStudentHomeNavbar,
        showHeaderNavbar,
        showButtonNavbar,
        headerNavbarTitle,
        setShowHeaderNavbar,
        setShowButtonNavbar,
        setHeaderNavbarTitle,
        setIsShowStudentHomeNavbar,
      }}
    >
      {children}
    </NavbarContext.Provider>
  );
};
