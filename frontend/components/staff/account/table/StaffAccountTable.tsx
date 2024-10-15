import DataTable from "@/components/table/DataTable";
import { Account } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

interface StaffAccountTableProps {
  columns: ColumnDef<Account>[];
  data: Account[];
}

const StaffAccountTable = ({ columns, data }: StaffAccountTableProps) => {
  return <DataTable columns={columns} data={data} />;
};
export default StaffAccountTable;
