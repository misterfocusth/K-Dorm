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

interface Options {
  requiredRoles: Role[];

  isPublic?: boolean;
  onUnauthorizedRedirect?: string;
  onAuthorizedRedirect?: string;
}

const withRoleGuard = <P extends object>(WrappedComponent: ComponentType<P>, options: Options) => {
  const {
    requiredRoles,
    isPublic,
    onUnauthorizedRedirect: _unauthorizedRedirectURL,
    onAuthorizedRedirect,
  } = options;

  const onUnauthorizedRedirect =
    _unauthorizedRedirectURL ||
    (requiredRoles.includes("STUDENT") ? STUDENT_LOGIN_ROUTE : STAFF_LOGIN_ROUTE);

  const ProtectedComponent = (props: P) => {
    const { currentUser, role } = useAuthContext();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
      console.log("withRoleGuard");
      // const isStudentPath = pathname.startsWith(STUDENT_ROUTE_PREFIX);
      // const isStaffPath = pathname.startsWith(STAFF_ROUTE_PREFIX);

      // const isLoginPath = pathname.includes("login");
      const isLoggedIn = currentUser && role;

      let redirectPath: undefined | string = "";

      if (isPublic) return;

      if (isLoggedIn) {
        redirectPath = onAuthorizedRedirect;
      }

      if (!role || !requiredRoles.length || !requiredRoles.includes(role)) {
        redirectPath = onUnauthorizedRedirect;
      }

      // Redirect to home page if user is already logged in
      // if (isLoggedIn && isLoginPath) {
      //   redirectPath = role === "STUDENT" ? STUDENT_HOME_ROUTE : STAFF_HOME_ROUTE;
      // }

      // Redirect to home page if user is already logged in but unauthorized to access the page
      // if (role === "STUDENT" && isStaffPath) {
      //   redirectPath = STUDENT_HOME_ROUTE;
      // } else if (role === "STAFF" && isStudentPath) {
      //   redirectPath = STAFF_HOME_ROUTE;
      // }

      // // Redirect to login page if user is not logged in
      // if ((!currentUser || !role || !requiredRoles.includes(role)) && !isPublic) {
      //   redirectPath = isStudentPath ? STUDENT_LOGIN_ROUTE : STAFF_LOGIN_ROUTE;
      // }

      // Check if the current url is the same as the redirect path
      // If it is, do not redirect
      if (redirectPath && pathname === redirectPath) redirectPath = undefined;

      if (redirectPath) router.push(redirectPath);
    }, [currentUser, pathname, role, router]);

    if ((currentUser && role && requiredRoles.includes(role)) || isPublic) {
      return <WrappedComponent {...props} />;
    }

    return null;
  };

  return ProtectedComponent;
};

export default withRoleGuard;
