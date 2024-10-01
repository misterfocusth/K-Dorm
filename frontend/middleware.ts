import { type NextRequest, NextResponse } from "next/server";
import {
  STUDENT_HOME_ROUTE,
  ROOT_ROUTE,
  SESSION_UID_COOKIE_NAME,
  SESSION_ID_TOKEN_COOKIE_NAME,
  STUDENT_LOGIN_ROUTE,
  STAFF_LOGIN_ROUTE,
} from "./constants";

const protectedRoutes = [STUDENT_HOME_ROUTE];

export default function middleware(request: NextRequest) {
  const session = request.cookies.get(SESSION_ID_TOKEN_COOKIE_NAME)?.value || "";
  const uid = request.cookies.get(SESSION_UID_COOKIE_NAME)?.value || "";

  const isLoggedIn = !!session && !!uid;

  const prefixRequestUrl = request.nextUrl.pathname.split("/")[1];
  const isLogInPath = request.nextUrl.pathname.endsWith("login");

  if (!isLoggedIn) {
    if (prefixRequestUrl === "student" && !isLogInPath) {
      const absoluteURL = new URL(STUDENT_LOGIN_ROUTE, request.nextUrl.origin);
      return NextResponse.redirect(absoluteURL.toString());
    }

    if (prefixRequestUrl === "staff" && !isLogInPath) {
      const absoluteURL = new URL(STAFF_LOGIN_ROUTE, request.nextUrl.origin);
      return NextResponse.redirect(absoluteURL.toString());
    }
  }
}
