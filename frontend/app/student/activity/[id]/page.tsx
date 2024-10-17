import StudentActivityDetailPage from "@/components/pages/student/activity/StudentActivityDetailPage";
import React from "react";

const Page = ({ params }: { params: { id: string } }) => {
  const id = params.id;

  return <StudentActivityDetailPage id={id} />;
};

export default Page;
