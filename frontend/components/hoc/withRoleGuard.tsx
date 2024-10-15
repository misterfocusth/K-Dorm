// Constants
import {
  STAFF_HOME_ROUTE,
  STAFF_LOGIN_ROUTE,
  STAFF_ROUTE_PREFIX,
  STUDENT_HOME_ROUTE,
  STUDENT_LOGIN_ROUTE,
  STUDENT_ROUTE_PREFIX,
} from "@/constants";

// Context
import { useAuthContext } from "@/providers/AuthProvider";

// Type
import { Role } from "@/types";

// Next
import { usePathname, useRouter } from "next/navigation";

// React
import { ComponentType, useEffect } from "react";

const withRoleGuard = <P extends object>(
  WrappedComponent: ComponentType<P>,
  requiredRoles: Role[],
  isPublic?: boolean
) => {
  return (props: P) => {
    const { currentUser, role } = useAuthContext();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
      console.log("withRoleGuard");
      const isStudentPath = pathname.startsWith(STUDENT_ROUTE_PREFIX);
      const isStaffPath = pathname.startsWith(STAFF_ROUTE_PREFIX);

      const isLoginPath = pathname.includes("login");
      const isLoggedIn = currentUser && role;

      let redirectPath = "";

      // Redirect to home page if user is already logged in
      if (isLoggedIn && isLoginPath) {
        redirectPath = role === "STUDENT" ? STUDENT_HOME_ROUTE : STAFF_HOME_ROUTE;
      }

      // Redirect to home page if user is already logged in but unauthorized to access the page
      if (role === "STUDENT" && isStaffPath) {
        redirectPath = STUDENT_HOME_ROUTE;
      } else if (role === "STAFF" && isStudentPath) {
        redirectPath = STAFF_HOME_ROUTE;
      }

      // Redirect to login page if user is not logged in
      if ((!currentUser || !role || !requiredRoles.includes(role)) && !isPublic) {
        redirectPath = isStudentPath ? STUDENT_LOGIN_ROUTE : STAFF_LOGIN_ROUTE;
      }

      if (redirectPath) router.push(redirectPath);
    }, [currentUser, role, router]);

    if ((currentUser && role && requiredRoles.includes(role)) || isPublic) {
      return <WrappedComponent {...props} />;
    }

    return null;
  };
};

export default withRoleGuard;
