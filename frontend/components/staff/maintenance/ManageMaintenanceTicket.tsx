import ImageGallery from "@/components/ImageGallery";
import MaintenanceTicketDetail from "@/components/maintenance/MaintenanceTicketDetail";
import { useMaintenanceTicketContext } from "@/contexts/MaintenanceTicketContext";

const ManageMaintenanceTicket = () => {
  const { selectedTicket, setSelectedTicket } = useMaintenanceTicketContext();

  return (
    <div>
      <p className="text-2xl font-bold">รายละเอียดการแจ้งซ่อม</p>

      <div className="rounded-3xl p-12 w-full shadow-lg flex flex-col gap-4 mt-8">
        <ImageGallery
          imagesSrc={[
            "https://picsum.photos/1920/1080",
            "https://picsum.photos/1920/1080",
            "https://picsum.photos/1920/1080",
            "https://picsum.photos/1920/1080",
            "https://picsum.photos/1920/1080",
          ]}
        />

        <div className="mt-8">
          <MaintenanceTicketDetail staffView />
        </div>
      </div>
    </div>
  );
};

export default ManageMaintenanceTicket;
