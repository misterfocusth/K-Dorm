import { queryClient } from "@/config/queryClient";
import { getApiService } from "@/libs/tsr-react-query";
import { useCallback } from "react";

export const useEditBuilding = () => {
	const mutate = getApiService().building.edit.useMutation();

	const edit = useCallback(async (id: string, name: string) => {
		try {
			await mutate.mutateAsync({
				params: {
					id,
				},
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

	return { edit, isPending: mutate.isPending };
};
