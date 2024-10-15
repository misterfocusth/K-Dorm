"use client";

import { queryClient } from "@/config/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";

export default function QueryProvider({ children }: Readonly<{ children: React.ReactNode }>) {

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
