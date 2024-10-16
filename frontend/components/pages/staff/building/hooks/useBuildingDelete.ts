import { getApiService } from "@/libs/tsr-react-query";

export const useBuildingDelete = () => {
	const mutate = getApiService().building.delete;
};
