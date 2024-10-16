import { queryClient } from "@/config/queryClient";
import { getApiService } from "@/libs/tsr-react-query";

export const useEditRoom = (building_id: string) => {
	const mutate = getApiService().room.edit.useMutation();

	const edit = async (id: string, data: { name: string; floor: string }) => {
		try {
			await mutate.mutateAsync({
				params: {
					id,
				},
				body: {
					...data,
				},
			});
			await queryClient.invalidateQueries({
				queryKey: ["building-rooms", building_id],
			});
			return true;
		} catch (e) {
			return false;
		}
	};

	return { ...mutate, edit };
};
