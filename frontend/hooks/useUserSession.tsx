import { useEffect, useState } from "react";

import { onAuthStateChanged } from "../libs/firebase/auth";

export function useUserSession() {
  const [userUid, setUserUid] = useState<string | null>(null);
  const [sessionIdToken, setSessionIdToken] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(async (authUser) => {
      if (authUser) {
        const idToken = await authUser.getIdToken();
        setSessionIdToken(idToken);
        setUserUid(authUser.uid);
      } else {
        setUserUid(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return { userUid, sessionIdToken };
}
