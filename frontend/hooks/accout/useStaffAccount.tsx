"use client";

import { useMemo } from "react";

import { getApiService } from "@/libs/tsr-react-query";
import { QUERY_KEYS } from "@/constants";

const useStaffAccount = () => {
  const { isLoading, isFetching, data, refetch } =
    getApiService().account.getAllStaffAccount.useQuery({
      queryKey: QUERY_KEYS.account.getAllStaffAccounts,
    });

  const accounts = useMemo(() => data?.body.result, [data]);

  const staffAccounts = useMemo(() => {
    return accounts?.filter((account) => !!account.staff);
  }, [accounts]);

  const maintenanceStaffAccounts = useMemo(() => {
    return accounts?.filter((staff) => !!staff.maintenanceStaff);
  }, [accounts]);

  const securityStaffAccounts = useMemo(() => {
    return accounts?.filter((staff) => !!staff.securityStaff);
  }, [accounts]);

  return {
    isLoading,
    isFetching,
    accounts,
    staffAccounts,
    maintenanceStaffAccounts,
    securityStaffAccounts,
    refetch,
  };
};

export default useStaffAccount;
