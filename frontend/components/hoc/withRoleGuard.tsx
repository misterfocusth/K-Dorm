// Context
import { useAuthContext } from "@/contexts/AuthContext";

// Type
import { Role } from "@/types";

// Next
import { usePathname, useRouter } from "next/navigation";

// React
import { ComponentType, useEffect } from "react";

const withRoleGuard = <P extends object>(
  WrappedComponent: ComponentType<P>,
  requiredRoles: Role[]
) => {
  return (props: P) => {
    const { currentUser, role } = useAuthContext();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
      const isStudentPath = pathname.startsWith("/student");

      if (!currentUser || !role || !requiredRoles.includes(role)) {
        router.push(isStudentPath ? "/student/login" : "/staff/login");
      }
    }, [currentUser, role, router]);

    if (currentUser && role && requiredRoles.includes(role)) {
      return <WrappedComponent {...props} />;
    }

    return null;
  };
};

export default withRoleGuard;
