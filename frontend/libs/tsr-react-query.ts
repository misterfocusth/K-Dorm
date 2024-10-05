import { initTsrReactQuery } from "@ts-rest/react-query/v5";
import { contract } from "@/contracts";

const getBearerToken = (): string | undefined => {
  if (typeof document === "undefined") return undefined;

  const value = `; ${document.cookie}`;
  const parts = value.split(`; session_id_token=`);
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift();
  }
};

export const api = initTsrReactQuery(contract, {
  baseUrl: process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "http://localhost:8000/api",
  credentials: "include",
  baseHeaders: {
    Authorization: `Bearer ${getBearerToken()}`,
  },
});
