import { queryClient } from "@/config/queryClient";
import { getCookieByName } from "@/libs/cookie";
import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";

export const useDeleteRoom = () => {
	const mutate = useMutation({
		mutationFn: async (room_id: string) => {
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/room/${room_id}`,
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

	const deleteRoom = useCallback(
		async (room_id: string) => {
			try {
				await mutate.mutateAsync(room_id);
				await queryClient.invalidateQueries({
					queryKey: ["building-rooms"],
				});
				return true;
			} catch (e) {
				return false;
			}
		},
		[mutate]
	);

	return {
		...mutate,
		deleteRoom,
	};
};
