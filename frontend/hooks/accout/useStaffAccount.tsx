"use client";

import { useMemo } from "react";

import { getApiService } from "@/libs/tsr-react-query";
import { QUERY_KEYS } from "@/constants";

const useStaffAccount = () => {
  const { isLoading, isPending, data, refetch } =
    getApiService().account.getAllStaffAccount.useQuery({
      queryKey: QUERY_KEYS.account.getAllStaffAccounts,
    });

  const staffAccounts = useMemo(() => data?.body.result, [data]);

  return {
    isLoading,
    isPending,
    staffAccounts,
    refetch,
  };
};

export default useStaffAccount;
