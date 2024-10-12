import React from "react";
import MaintenanceHistoryItem from "./MaintenanceHistoryItem";
import { MaintenanceTicket } from "@/types";

type MaintenanceHistoryListProps = {
  maintenanceTickets: MaintenanceTicket[];
  staffView?: boolean;
  onClickListItem?: () => void;
};

const MaintenanceHistoryList = ({
  maintenanceTickets,
  staffView,
  onClickListItem,
}: MaintenanceHistoryListProps) => {
  return (
    <div className={`flex flex-col gap-2`}>
      {maintenanceTickets.map((maintenanceTicket) => (
        <MaintenanceHistoryItem
          key={maintenanceTicket.id}
          id={maintenanceTicket.id + ""}
          isResolved={maintenanceTicket.isResolved}
          title={maintenanceTicket.title}
          description={maintenanceTicket.description}
          createdAt={maintenanceTicket.createdAt}
          onClickListItem={onClickListItem}
          staffView={staffView}
        />
      ))}
    </div>
  );
};

export default MaintenanceHistoryList;
