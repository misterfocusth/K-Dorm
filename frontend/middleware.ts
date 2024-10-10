import { type NextRequest, NextResponse } from "next/server";
import { STUDENT_ONBOARDING_ROUTE } from "./constants";

export default function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
    const absoluteURL = new URL(STUDENT_ONBOARDING_ROUTE, request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
}
