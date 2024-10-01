"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  STUDENT_HOME_ROUTE,
  ROOT_ROUTE,
  SESSION_ID_TOKEN_COOKIE_NAME,
  SESSION_UID_COOKIE_NAME,
} from "@/constants";

export async function createSession(uid: string, sessionIdToken: string) {
  cookies().set(SESSION_UID_COOKIE_NAME, uid, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24, // One day
    path: "/",
  });

  cookies().set(SESSION_ID_TOKEN_COOKIE_NAME, sessionIdToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24, // One day
    path: "/",
  });

  redirect(STUDENT_HOME_ROUTE);
}

export async function removeSession() {
  cookies().delete(SESSION_UID_COOKIE_NAME);
  cookies().delete(SESSION_ID_TOKEN_COOKIE_NAME);

  redirect(ROOT_ROUTE);
}
