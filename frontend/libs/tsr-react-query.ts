"use client";

import { initTsrReactQuery } from "@ts-rest/react-query/v5";
import { contract } from "@/contracts";
import { getCookieByName } from "./cookie";

export const getApiService = () =>
  initTsrReactQuery(contract, {
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "http://localhost:8000/api",
    credentials: "include",
    baseHeaders: {
      Authorization: `Bearer ${getCookieByName("session_id_token")}`,
    },
  });
