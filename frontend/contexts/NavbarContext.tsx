// Next
import { BOTTOM_NAVBAR_PATHS } from "@/config/navbar";
import { usePathname } from "next/navigation";

// React
import { createContext, useEffect, useState } from "react";

interface INavbarContext {
  showStudentHomeNavbar: boolean;
  showHeaderNavbar: boolean;
  showButtonNavbar: boolean;
  headerNavbarTitle: string;
  currentActiveBottomNavbarIndex: number;
  setShowHeaderNavbar: (show: boolean) => void;
  setShowButtonNavbar: (show: boolean) => void;
  setHeaderNavbarTitle: (title: string) => void;
  setShowStudentHomeNavbar: (show: boolean) => void;
  resetNavbarContext: () => void;
}

const initialState: INavbarContext = {
  showStudentHomeNavbar: false,
  showHeaderNavbar: false,
  showButtonNavbar: false,
  headerNavbarTitle: "",
  currentActiveBottomNavbarIndex: 0,
  setShowHeaderNavbar: () => {},
  setShowButtonNavbar: () => {},
  setHeaderNavbarTitle: () => {},
  setShowStudentHomeNavbar: () => {},
  resetNavbarContext: () => {},
};

export const NavbarContext = createContext<INavbarContext>(initialState);

export const NavbarContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [showStudentHomeNavbar, setShowStudentHomeNavbar] = useState<boolean>(false);
  const [showHeaderNavbar, setShowHeaderNavbar] = useState<boolean>(false);
  const [showButtonNavbar, setShowButtonNavbar] = useState<boolean>(false);
  const [headerNavbarTitle, setHeaderNavbarTitle] = useState<string>("");

  const [currentActiveBottomNavbarIndex, setCurrentActiveBottomNavbarIndex] = useState<number>(0);

  const pathname = usePathname();

  const resetNavbarContext = () => {
    setShowStudentHomeNavbar(false);
    setShowHeaderNavbar(false);
    setShowButtonNavbar(false);
    setHeaderNavbarTitle("");
    setCurrentActiveBottomNavbarIndex(0);
  };

  useEffect(() => {
    const currentIdx = BOTTOM_NAVBAR_PATHS.findIndex((path) => path.startsWith(pathname));
    setCurrentActiveBottomNavbarIndex(currentIdx);
  }, [pathname]);

  useEffect(() => {
    resetNavbarContext();
  }, []);

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
        setShowStudentHomeNavbar,
        currentActiveBottomNavbarIndex,
        resetNavbarContext,
      }}
    >
      {children}
    </NavbarContext.Provider>
  );
};
