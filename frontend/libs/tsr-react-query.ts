"use client";

import { initTsrReactQuery } from "@ts-rest/react-query/v5";
import { contract } from "@/contracts";

const getCookie = (name: string): string | undefined => {
  const cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`))
    ?.split("=")[1];

  return cookieValue;
};

export const api = initTsrReactQuery(contract, {
  baseUrl: process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "http://localhost:8000/api",
  credentials: "include",
  baseHeaders: {
    Authorization: `Bearer ${getCookie("session_id_token")}`,
  },
});
