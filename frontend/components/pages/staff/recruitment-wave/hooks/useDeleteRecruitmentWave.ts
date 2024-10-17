import { getCookieByName } from "@/libs/cookie";
import { useMutation } from "@tanstack/react-query";

export const useDeleteRecruitmentWave = () => {
	const mutate = useMutation({
		mutationFn: async (id: string) => {
			await fetch(
				`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/recruitment_wave/${id}`,
				{
					headers: {
						Authorization: `Bearer ${getCookieByName("session_id_token")}`,
					},
				}
			);
		},
	});

	const deleteWave = mutate.mutateAsync;

	return { deleteWave };
};
