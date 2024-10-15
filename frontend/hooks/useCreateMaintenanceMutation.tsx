import { getCookieByName } from "@/libs/cookie";
import { useMutation } from "@tanstack/react-query";

const mutate = async (formData: FormData) => {
  const request = await fetch(process.env.NEXT_PUBLIC_BACKEND_BASE_URL + "/student/maintenance", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getCookieByName("session_id_token")}`,
    },
    body: formData,
  });

  if (!request.ok) {
    throw new Error("Network response was not ok");
  }

  return request.json();
};

export const useCreateMaintenanceMutation = () => {
  const mutation = useMutation({
    mutationFn: mutate,
  });

  return mutation;
};
