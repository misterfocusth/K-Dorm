import { MaintenanceTicket } from "@/types";
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

interface IMaintenanceTicketContext {
  selectedTicket: MaintenanceTicket | null;
  setSelectedTicket: Dispatch<SetStateAction<MaintenanceTicket | null>>;
}

const initialState: IMaintenanceTicketContext = {
  selectedTicket: null,
  setSelectedTicket: () => { },
};

export const MaintenanceTicketContext = createContext<IMaintenanceTicketContext>(initialState);

const MaintenanceTicketProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedTicket, setSelectedTicket] = useState<MaintenanceTicket | null>(null);

  return (
    <MaintenanceTicketContext.Provider value={{ selectedTicket, setSelectedTicket }}>
      {children}
    </MaintenanceTicketContext.Provider>
  );
};

export default MaintenanceTicketProvider;

export const useMaintenanceTicketContext = () => useContext(MaintenanceTicketContext);
