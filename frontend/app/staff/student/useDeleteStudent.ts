import { getApiService } from "@/libs/tsr-react-query";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteStudnet = () => {
	const mutate = useMutation({
		mutationFn: async (student_pk: string) => {
			fetch(
				`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/student/${student_pk}`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				}
			);
		},
	});

	const deleteStudent = async (id: string) => {
		try {
			await mutate.mutateAsync(id);
			toast.success("ลบนักศึกษาสำเร็จ");
		} catch (error) {
			toast.error("ลบนักศึกษาไม่สำเร็จ");
		}
	};

	return { deleteStudent };
};
