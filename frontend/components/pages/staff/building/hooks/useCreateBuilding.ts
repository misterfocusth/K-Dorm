import { queryClient } from "@/config/queryClient";
import { getApiService } from "@/libs/tsr-react-query";
import { useCallback } from "react";
import { toast } from "sonner";

export const useCreateBuildingMutate = () => {
	const mutate = getApiService().building.create.useMutation();

	const create = useCallback(async (name: string) => {
		try {
			const response = await mutate.mutateAsync({
				body: {
					name,
				},
			});

			await queryClient.invalidateQueries({
				queryKey: ["buildings"],
			});

			return true;
		} catch (e) {
			return false;
		}
	}, []);

	return { create, isPending: mutate.isPending };
};
