import { redirect } from "next/navigation";

/**
 * REDIRECTE TO STAFF DASHBOARD OR STAFF LOGIN
 */
const StaffPage = () => {
  redirect("/staff/login");
};

export default StaffPage;
