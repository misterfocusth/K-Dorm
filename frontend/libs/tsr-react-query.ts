import { initTsrReactQuery } from "@ts-rest/react-query/v5";
import { contract } from "@/contracts";

export const api = initTsrReactQuery(contract, {
  baseUrl: process.env.BACKEND_BASE_URL || "http://localhost:8000/api",
  credentials: "include",
});
