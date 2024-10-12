import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { Dispatch, SetStateAction } from "react";

type MaintenanceStaffSelectProps = {
  selectedStaff: string | null;
  onSelectStaff: Dispatch<SetStateAction<any>>;
};

const MaintenanceStaffSelect = ({ selectedStaff, onSelectStaff }: MaintenanceStaffSelectProps) => {
  return (
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="เลือกเจ้าหน้าที่ผู้รับผิดชอบ" />
      </SelectTrigger>

      <SelectContent>
        {new Array(5).fill(0).map((_, index) => (
          <SelectItem
            key={index}
            onClick={() => onSelectStaff(`Staff ${index}`)}
            value={index + ""}
          >
            Staff {index}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default MaintenanceStaffSelect;
