import { getCookieByName } from "@/libs/cookie";
import { useMutation } from "@tanstack/react-query";

export const useDeleteBuilding = () => {
	const mutate = useMutation({
		mutationFn: async (building_id: string) => {
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/staff/building/${building_id}`,
				{
					method: "DELETE",
					headers: {
						Authorization: `Bearer ${getCookieByName("session_id_token")}`,
					},
				}
			);
			return res.ok;
		},
	});

	return mutate;
};
