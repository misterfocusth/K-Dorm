import {
  type User,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged as _onAuthStateChanged,
} from "firebase/auth";

import { firebaseAuth } from "./config";
import { api } from "../tsr-react-query";
import { createSession } from "@/actions/authActions";

export function onAuthStateChanged(callback: (authUser: User | null) => void) {
  return _onAuthStateChanged(firebaseAuth, callback);
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(firebaseAuth, provider);

    if (!result || !result.user) {
      throw new Error("Google sign in failed");
    }

    const uid = result.user.uid;
    const sessionIdToken = await result.user.getIdToken();

    await createSession(uid, sessionIdToken);

    const user = await api.authentication.signIn.mutate({ body: null });

    console.log("User signed in with Google", user);
  } catch (error) {
    console.error("Error signing in with Google", error);
  }
}

export async function signOutWithGoogle() {
  try {
    await firebaseAuth.signOut();
  } catch (error) {
    console.error("Error signing out with Google", error);
  }
}
