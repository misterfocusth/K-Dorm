import { getApiService } from "@/libs/tsr-react-query";
import { useMemo } from "react";

export const useRecruitmentWaves = () => {
	const query = getApiService().recruimentWave.getAll.useQuery({
		queryKey: ["recruitment-waves"],
	});

	console.log("query. :>> ", query.data);

	const data = useMemo(() => {
		if (query.data?.status === 200) {
			return query.data?.body.result.waves;
		}
	}, [query.data?.body.result.waves]);

	console.log("data :>> ", data);

	return { ...query, data };
};
