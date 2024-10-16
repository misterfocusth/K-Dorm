import { getApiService } from "@/libs/tsr-react-query";
import { useMemo } from "react";

export const useRoomsByBuilding = (buildingId: string) => {
	const query = getApiService().building.getWithRooms.useQuery({
		queryKey: ["building-with-rooms", buildingId],
		queryData: {
			params: {
				id: buildingId,
			},
		},
	});

	const response = useMemo(() => {
		if (query.data?.status === 200) {
			return query.data.body.result;
		} else {
			return undefined;
		}
	}, [query]);

	return { ...query, data: response };
};
