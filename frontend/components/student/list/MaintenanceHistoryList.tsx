import React from "react";
import MaintenanceHistoryItem from "./MaintenanceHistoryItem";

type MaintenanceHistoryListProps = {
  staffView?: boolean;
  onClickListItem?: () => void;
};

const MaintenanceHistoryList = ({ staffView, onClickListItem }: MaintenanceHistoryListProps) => {
  return (
    <div className={`flex flex-col gap-2`}>
      {new Array(3).fill(0).map((_, index) => (
        <MaintenanceHistoryItem
          key={index}
          id={index + ""}
          isResolved={index % 2 === 0}
          title={"ซ่อมประตูห้อง"}
          description={
            "ประตูห้องพังเนื่องจากเปิดแรงเกินไป ประตูห้องพังเนื่องจากเปิดแรงเกินไป ประตูห้องพังเนื่องจากเปิดแรงเกินไป ประตูห้องพังเนื่องจากเปิดแรงเกินไป"
          }
          createdAt={new Date().toISOString()}
          onClickListItem={onClickListItem}
          staffView={staffView}
        />
      ))}
    </div>
  );
};

export default MaintenanceHistoryList;
