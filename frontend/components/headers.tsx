"use client";

import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";

export function Header(props: { uid: string | null; sessionIdToken: string | null }) {
  const { login, logout, role, currentUser } = useContext(AuthContext);

  const handleSignIn = async () => {
    await login();
  };

  const handleSignOut = async () => {
    await logout();
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
            <a href="#">{JSON.stringify(role)}</a>
          </li>
          <li>
            <a href="#">{JSON.stringify(currentUser)}</a>
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
