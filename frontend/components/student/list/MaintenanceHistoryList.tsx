import React from "react";
import MaintenanceHistoryItem from "./MaintenanceHistoryItem";
import { MaintenanceTicket } from "@/types";

type MaintenanceHistoryListProps = {
  maintenanceTickets: MaintenanceTicket[];
  staffView?: boolean;
};

const MaintenanceHistoryList = ({ maintenanceTickets, staffView }: MaintenanceHistoryListProps) => {
  return (
    <div className={`flex flex-col gap-2`}>
      {maintenanceTickets &&
        maintenanceTickets.map((maintenanceTicket) => (
          <MaintenanceHistoryItem
            key={maintenanceTicket.id}
            maintenanceTicket={maintenanceTicket}
            staffView={staffView}
          />
        ))}
    </div>
  );
};

export default MaintenanceHistoryList;
