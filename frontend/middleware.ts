import { type NextRequest, NextResponse } from "next/server";
import {
  SESSION_UID_COOKIE_NAME,
  SESSION_ID_TOKEN_COOKIE_NAME,
  STUDENT_LOGIN_ROUTE,
  STAFF_LOGIN_ROUTE,
  STUDENT_ROUTE_PREFIX,
  STAFF_ROUTE_PREFIX,
  STUDENT_HOME_ROUTE,
  STAFF_HOME_ROUTE,
} from "./constants";

const PUBLIC_STUDENT_ROUTES = ["login", "onboarding"].map(
  (route) => `${STUDENT_ROUTE_PREFIX}/${route}`
);
const PUBLIC_STAFF_ROUTES = ["login"].map((route) => `${STAFF_ROUTE_PREFIX}/${route}`);

export default function middleware(request: NextRequest) {
  const session = request.cookies.get(SESSION_ID_TOKEN_COOKIE_NAME)?.value || "";
  const uid = request.cookies.get(SESSION_UID_COOKIE_NAME)?.value || "";

  const isLoggedIn = !!session && !!uid;

  const prefixRequestUrl = request.nextUrl.pathname.split("/")[1];
  const isPubicRoute = [...PUBLIC_STUDENT_ROUTES, ...PUBLIC_STAFF_ROUTES].includes(
    request.nextUrl.pathname
  );

  if (!isLoggedIn) {
    if (prefixRequestUrl === "student" && !isPubicRoute) {
      const absoluteURL = new URL(STUDENT_LOGIN_ROUTE, request.nextUrl.origin);
      return NextResponse.redirect(absoluteURL.toString());
    }

    if (prefixRequestUrl === "staff" && !isPubicRoute) {
      const absoluteURL = new URL(STAFF_LOGIN_ROUTE, request.nextUrl.origin);
      return NextResponse.redirect(absoluteURL.toString());
    }
  }

  // Handle if isLoggedIn but trying to access login page
  const isLoginPage = request.nextUrl.pathname.includes("login");

  if (isLoggedIn && isLoginPage) {
    if (prefixRequestUrl === "student") {
      const absoluteURL = new URL(STUDENT_HOME_ROUTE, request.nextUrl.origin);
      return NextResponse.redirect(absoluteURL.toString());
    }

    if (prefixRequestUrl === "staff") {
      const absoluteURL = new URL(STAFF_HOME_ROUTE, request.nextUrl.origin);
      return NextResponse.redirect(absoluteURL.toString());
    }
  }
}
