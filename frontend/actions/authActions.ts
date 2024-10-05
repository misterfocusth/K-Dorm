"use server";

import { cookies } from "next/headers";

import { SESSION_ID_TOKEN_COOKIE_NAME, SESSION_UID_COOKIE_NAME } from "@/constants";

export async function createSession(uid: string, sessionIdToken: string) {
  cookies().set(SESSION_UID_COOKIE_NAME, uid, {
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });

  cookies().set(SESSION_ID_TOKEN_COOKIE_NAME, sessionIdToken, {
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });
}

export async function removeSession() {
  cookies().delete(SESSION_UID_COOKIE_NAME);
  cookies().delete(SESSION_ID_TOKEN_COOKIE_NAME);
}
