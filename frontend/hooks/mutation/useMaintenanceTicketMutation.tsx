import { getApiService } from "@/libs/tsr-react-query";
import { useMutation } from "@tanstack/react-query";

export const useMaintenanceTicketMutation = () => {
  const mutation = useMutation({
    mutationFn: getApiService().maintenance.updateMaintenanceTicketById.mutate,
  });

  return mutation;
};
