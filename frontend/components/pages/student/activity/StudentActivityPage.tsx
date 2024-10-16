"use client";

import withRoleGuard from "@/components/hoc/withRoleGuard";

const StudentActivityPage = () => {
  return <div>StudentActivityPage</div>;
};

export default withRoleGuard(StudentActivityPage, { requiredRoles: ["STUDENT"] });
