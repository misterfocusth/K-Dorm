"use client";

import ManageActivityCategoryPage from "@/components/pages/staff/activity/category/ManageActivityCategoryPage";
import ActivityCategoryProvider from "@/providers/ActivityCategoryProvider";

const Page = () => {
  return (
    <ActivityCategoryProvider>
      <ManageActivityCategoryPage />
    </ActivityCategoryProvider>
  );
};

export default Page;
