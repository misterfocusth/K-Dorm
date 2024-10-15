import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Account } from "@/types";

type MaintenanceStaffSelectProps = {
  onSelectStaff: (staff: Account) => void;
  maintenanceStaffAccounts: Account[];
  isLoading: boolean;
};

const MaintenanceStaffSelect = ({
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
