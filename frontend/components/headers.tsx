"use client";

import { signInWithGoogle, signOutWithGoogle } from "@/libs/firebase/auth";
import { removeSession } from "@/actions/authActions";

export function Header(props: { uid: string | null; sessionIdToken: string | null }) {
  const handleSignIn = async () => {
    await signInWithGoogle();
  };

  const handleSignOut = async () => {
    await signOutWithGoogle();
    await removeSession();
  };

  if (!props.uid) {
    return (
      <header>
        <button onClick={handleSignIn}>Sign In</button>
      </header>
    );
  }

  return (
    <header>
      <nav>
        <ul>
          <li>
            <a href="#">Menu A</a>
          </li>
          <li>
            <a href="#">Menu B</a>
          </li>
          <li>
            <a href="#">Menu C</a>
          </li>
        </ul>
      </nav>
      <button onClick={handleSignOut}>Sign Out</button>
    </header>
  );
}

export default Header;
