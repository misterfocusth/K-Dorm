import ImageGallery from "@/components/ImageGallery";
import MaintenanceTicketDetail from "@/components/maintenance/MaintenanceTicketDetail";
import { Button } from "@/components/ui/button";
import { useMaintenanceTicketContext } from "@/contexts/MaintenanceTicketContext";
import { useMaintenanceTicketMutation } from "@/hooks/mutation/useMaintenanceTicketMutation";
import { Account, MaintenanceTicket } from "@/types";
import { useCallback, useMemo, useState } from "react";

const ManageMaintenanceTicket = () => {
  const [selectedStaff, setSelectedStaff] = useState<Account | null>(null);

  const { selectedTicket, setSelectedTicket } = useMaintenanceTicketContext();
  const { mutateAsync } = useMaintenanceTicketMutation();

  const imagesSrc = useMemo(
    () => selectedTicket?.files.map((file) => file.path),
    [selectedTicket?.files]
  );

  const handleSelectStaff = useCallback((staff: Account) => {
    setSelectedStaff(staff);
  }, []);

  const handleUpdateMaintenanceTicket = async () => {
    console.log(selectedStaff, selectedTicket);
    if (!selectedStaff || !selectedTicket) {
      return;
    }

    const result = await mutateAsync({
      body: {
        title: selectedTicket.title,
        description: selectedTicket.description,
        location: selectedTicket.location,
        maintenanceStaffId: selectedStaff.id + "",
      },
      params: {
        id: selectedTicket.id + "",
      },
    });

    if (result) {
      setSelectedTicket(result.body as MaintenanceTicket);
    }
  };

  if (!selectedTicket) {
    return null;
  }

  return (
    <div>
      <p className="text-2xl font-bold">รายละเอียดการแจ้งซ่อม</p>

      <div className="rounded-3xl p-12 w-full shadow-lg flex flex-col gap-4 mt-8">
        <ImageGallery imagesSrc={imagesSrc || []} />

        <div className="mt-8">
          <MaintenanceTicketDetail
            staffView
            maintenanceTicket={selectedTicket}
            selectedStaff={selectedStaff}
            onSelectStaff={handleSelectStaff}
          />
        </div>

        <div className="flex flex-row items-center justify-end gap-4 mt-8">
          <Button className="bg-gray-400" onClick={() => setSelectedTicket(null)}>
            ยกเลิก / ปิด
          </Button>
          {!selectedTicket?.isResolved && (
            <Button className="bg-[#84CC16] text-white" onClick={handleUpdateMaintenanceTicket}>
              ดำเนินการซ่อมแล้ว
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageMaintenanceTicket;
