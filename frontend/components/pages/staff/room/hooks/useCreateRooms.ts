import { getApiService } from "@/libs/tsr-react-query";
import { useCallback } from "react";

export const useCreateRooms = () => {
	const mutate = getApiService().room.create.useMutation();

	const createMany = useCallback(
		async (r: { name: string; floor: string; building_id: string }[]) => {
			try {
				const _ = await mutate.mutateAsync({
					body: {
						rooms: r,
					},
				});
				return true;
			} catch (error) {
				return false;
			}
		},
		[mutate]
	);

	return {
		createMany,
		isPending: mutate.isPending,
	};
};
