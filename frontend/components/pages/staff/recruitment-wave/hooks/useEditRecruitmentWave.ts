import { getApiService } from "@/libs/tsr-react-query";
import { useCallback } from "react";
import { z } from "zod";
import { recruitmentWaveSchema } from "@/schemas/recruitmentWave";
import { queryClient } from "@/config/queryClient";
import { toast } from "sonner";
import { useRenderModal } from "@/providers/ModalProvider";

const schema = recruitmentWaveSchema
	.omit({
		id: true,
	})
	.extend({
		announcementText: z.string().nullish(),
	});

export type Schema = z.infer<typeof schema>;

export const useEditRecruitmentWave = () => {
	const mutate = getApiService().recruimentWave.edit.useMutation();
	const { close } = useRenderModal();

	const edit = useCallback(async (id: string, data: Schema) => {
		try {
			await mutate.mutateAsync({
				body: {
					...data,
				},
				params: {
					id,
				},
			});
			await queryClient.invalidateQueries({
				queryKey: ["recruitment-waves"],
			});
			close();
			toast.success("บันทึกการแก้ไขรอบสมัครสำเร็จ");
		} catch (error) {
			toast.error("บันทึกการแก้ไขผิดพลาด กรุณาลองใหม่อีกครั้ง");
		}
	}, []);

	return { ...mutate, edit };
};
