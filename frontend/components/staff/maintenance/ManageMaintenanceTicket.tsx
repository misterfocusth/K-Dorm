import ImageGallery from "@/components/ImageGallery";
import MaintenanceTicketDetail from "@/components/maintenance/MaintenanceTicketDetail";
import { Button } from "@/components/ui/button";
import { useMaintenanceTicketContext } from "@/contexts/MaintenanceTicketContext";
import { useMemo } from "react";

const ManageMaintenanceTicket = () => {
  const { selectedTicket, setSelectedTicket } = useMaintenanceTicketContext();

  const imagesSrc = useMemo(
    () => selectedTicket?.files.map((file) => file.path),
    [selectedTicket?.files]
  );

  return (
    <div>
      <p className="text-2xl font-bold">รายละเอียดการแจ้งซ่อม</p>

      <div className="rounded-3xl p-12 w-full shadow-lg flex flex-col gap-4 mt-8">
        <ImageGallery imagesSrc={imagesSrc || []} />

        <div className="mt-8">
          <MaintenanceTicketDetail staffView />
        </div>

        <div className="flex flex-row items-center justify-end gap-4 mt-8">
          <Button className="bg-gray-400" onClick={() => setSelectedTicket(null)}>
            ยกเลิก / ปิด
          </Button>
          {!selectedTicket?.resolvedAt && (
            <Button className="bg-[#84CC16] text-white">ดำเนินการซ่อมแล้ว</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageMaintenanceTicket;
