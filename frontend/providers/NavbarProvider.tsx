// Next
import { BOTTOM_NAVBAR_PATHS } from "@/config/navbar";
import { usePathname } from "next/navigation";

// React
import { createContext, useEffect, useState } from "react";

interface INavbarContext {
  isShowStudentHomeNavbar: boolean;
  isShowHeaderNavbar: boolean;
  isShowBottomNavbar: boolean;
  headerNavbarTitle: string;
  currentActiveBottomNavbarIndex: number;
  setShowHeaderNavbar: (show: boolean) => void;
  setShowBottomNavbar: (show: boolean) => void;
  setHeaderNavbarTitle: (title: string) => void;
  setShowStudentHomeNavbar: (show: boolean) => void;
  resetNavbarContext: () => void;
}

const initialState: INavbarContext = {
  isShowStudentHomeNavbar: false,
  isShowHeaderNavbar: false,
  isShowBottomNavbar: false,
  headerNavbarTitle: "",
  currentActiveBottomNavbarIndex: 0,
  setShowHeaderNavbar: () => { },
  setShowBottomNavbar: () => { },
  setHeaderNavbarTitle: () => { },
  setShowStudentHomeNavbar: () => { },
  resetNavbarContext: () => { },
};

export const NavbarContext = createContext<INavbarContext>(initialState);

export const NavbarProvider = ({ children }: { children: React.ReactNode }) => {
  const [isShowStudentHomeNavbar, setShowStudentHomeNavbar] = useState<boolean>(false);
  const [isShowHeaderNavbar, setShowHeaderNavbar] = useState<boolean>(false);
  const [isShowBottomNavbar, setShowBottomNavbar] = useState<boolean>(false);
  const [headerNavbarTitle, setHeaderNavbarTitle] = useState<string>("");

  const [currentActiveBottomNavbarIndex, setCurrentActiveBottomNavbarIndex] = useState<number>(0);

  const pathname = usePathname();

  const resetNavbarContext = () => {
    setShowStudentHomeNavbar(false);
    setShowHeaderNavbar(false);
    setShowBottomNavbar(false);
    setHeaderNavbarTitle("");
    setCurrentActiveBottomNavbarIndex(0);
  };

  useEffect(() => {
    const currentIdx = BOTTOM_NAVBAR_PATHS.findIndex((path) => pathname.startsWith(path));
    setCurrentActiveBottomNavbarIndex(currentIdx);
  }, [pathname]);

  return (
    <NavbarContext.Provider
      value={{
        isShowStudentHomeNavbar,
        isShowHeaderNavbar,
        isShowBottomNavbar,
        headerNavbarTitle,
        setShowHeaderNavbar,
        setShowBottomNavbar,
        setHeaderNavbarTitle,
        setShowStudentHomeNavbar,
        currentActiveBottomNavbarIndex,
        resetNavbarContext,
      }}
    >
      {children}
    </NavbarContext.Provider>
  );
};
