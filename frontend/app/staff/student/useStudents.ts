import { getApiService } from "@/libs/tsr-react-query";
import { useMemo } from "react";

export const useStudents = () => {
	const query = getApiService().student.getAll.useQuery({
		queryKey: ["students"],
	});

	const data = useMemo(() => {
		if (query.data?.status === 200) {
			return query.data.body.result.students;
		}
	}, [query.data?.body.result.students, query.data?.status]);

	return { ...query, data };
};
