import { getApiService } from "@/libs/tsr-react-query";
import { CreateStudentPayload } from "./useCreateStudent";
import { toast } from "sonner";
import { useRenderModal } from "@/providers/ModalProvider";

export const useEditStudent = () => {
	const { close } = useRenderModal();
	const mutate = getApiService().student.edit.useMutation();

	const edit = async (
		student_pk: string,
		data: Partial<{
			email: string;
			firstName: string;
			lastName: string;
			studentId: string;
		}>
	) => {
		try {
			const student = await mutate.mutateAsync({
				params: {
					id: student_pk,
				},
				body: {
					...data,
				},
			});
			toast.success("แก้ไขข้อมูลนักศึกษาสำเร็จ");
			close();
			return true;
		} catch (error) {
			toast.error("แก้ไขข้อมูลนักศึกษาไม่สำเร็จ");
			console.error("edit student failed");
			return false;
		}
	};

	return { ...mutate, edit };
};
