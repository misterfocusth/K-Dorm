import { queryClient } from "@/config/queryClient";
import { studentContract } from "@/contracts/student";
import { getApiService } from "@/libs/tsr-react-query";
import { useRenderModal } from "@/providers/ModalProvider";
import { toast } from "sonner";
import { z } from "zod";

export const createStudentSchema = studentContract.create.body;
export type CreateStudentPayload = z.infer<typeof createStudentSchema>;

export const useCreateStudent = () => {
	const mutate = getApiService().student.create.useMutation();
	const { close } = useRenderModal();

	const create = async (data: {
		email: string;
		firstName: string;
		lastName: string;
		studentId: string;
	}) => {
		try {
			const student = await mutate.mutateAsync({
				body: { students: [data] },
			});
			queryClient.invalidateQueries({
				queryKey: ["students"],
			});
			close();
			toast.success("เพิ่มนักศึกษาสำเร็จ");
			return true;
		} catch (error) {
			toast.error("เพิ่มนักศึกษาไม่สำเร็จ");
			return false;
		}
	};

	return {
		...mutate,
		create,
	};
};
