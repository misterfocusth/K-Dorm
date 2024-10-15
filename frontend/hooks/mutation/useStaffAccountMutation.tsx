import { getApiService } from "@/libs/tsr-react-query";
import { useMutation } from "@tanstack/react-query";

export const useStaffAccountMutation = () => {
  const mutation = useMutation({
    mutationFn: getApiService().account.editStaffAccount.mutate,
  });

  return mutation;
};
