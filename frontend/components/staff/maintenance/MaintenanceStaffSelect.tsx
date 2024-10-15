import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Account } from "@/types";
import React, { Dispatch, SetStateAction } from "react";

type MaintenanceStaffSelectProps = {
  selectedStaff: Account | null;
  onSelectStaff: Dispatch<SetStateAction<Account | null>>;
  maintenanceStaffAccounts: Account[];
  isLoading: boolean;
};

const MaintenanceStaffSelect = ({
  selectedStaff,
  onSelectStaff,
  maintenanceStaffAccounts,
  isLoading,
}: MaintenanceStaffSelectProps) => {
  return (
    <Select disabled={isLoading}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="เลือกเจ้าหน้าที่ผู้รับผิดชอบ" />
      </SelectTrigger>

      <SelectContent>
        {maintenanceStaffAccounts.map((maintenanceStaff) => (
          <SelectItem
            key={maintenanceStaff.id + ""}
            onClick={() => onSelectStaff(maintenanceStaff)}
            value={maintenanceStaff.id + ""}
          >
            {maintenanceStaff.firstName + " " + maintenanceStaff.lastName}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default MaintenanceStaffSelect;
