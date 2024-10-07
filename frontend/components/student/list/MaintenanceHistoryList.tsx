import React from "react";
import MaintenanceHistoryItem from "./MaintenanceHistoryItem";

const MaintenanceHistoryList = () => {
  return (
    <div className="flex flex-col gap-4">
      {new Array(3).fill(0).map((_, index) => (
        <MaintenanceHistoryItem
          key={index}
          id={index + ""}
          isResolved={index % 2 === 0}
          title={"ซ่อมประตูห้อง"}
          description={"ประตูห้องพังเนื่องจากเปิดแรงเกินไป"}
          createdAt={new Date().toISOString()}
        />
      ))}
    </div>
  );
};

export default MaintenanceHistoryList;
