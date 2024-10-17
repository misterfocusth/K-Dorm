import { queryClient } from "@/config/queryClient";
import { getApiService } from "@/libs/tsr-react-query";
import { useRenderModal } from "@/providers/ModalProvider";
import { recruitmentWaveSchema } from "@/schemas/recruitmentWave";
import { useCallback } from "react";
import { toast } from "sonner";
import { z } from "zod";

const schema = recruitmentWaveSchema
	.omit({
		id: true,
	})
	.extend({
		announcementText: z.string().nullish(),
	});

export type Schema = z.infer<typeof schema>;

export const useCreateRecruitmentWave = () => {
	const { close } = useRenderModal();
	const mutate = getApiService().recruimentWave.create.useMutation();

	const create = useCallback(async (data: Schema) => {
		try {
			await mutate.mutateAsync({
				body: data,
			});
			await queryClient.invalidateQueries({
				queryKey: ["recruitment-waves"],
			});
			close();
			toast.success("เพิ่มรอบสมัครสำเร็จ");
			return true;
		} catch (error) {
			toast.error("เพิ่มรอบสมัครไม่สำเร็จ");
			return false;
		}
	}, []);

	return {
		...mutate,
		create,
	};
};
