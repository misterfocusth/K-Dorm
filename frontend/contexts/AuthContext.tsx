"use client";

// React
import { useCallback, useEffect, useState, createContext } from "react";

// Firebase
import {
  type User,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged as _onAuthStateChanged,
} from "firebase/auth";

// Firebase Config
import { firebaseAuth } from "../libs/firebase/config";

// TS-Rest
import { api } from "../libs/tsr-react-query";

// Actions
import { createSession, removeSession } from "@/actions/authActions";

// Type
import { Account, Role } from "@/types";

// Next
import { useRouter } from "next/navigation";

// Contracts
import { SignInResult } from "@/contracts/authentication";
import { Response } from "@/interface/api-response";
import {
  STAFF_HOME_ROUTE,
  STAFF_LOGIN_ROUTE,
  STUDENT_HOME_ROUTE,
  STUDENT_LOGIN_ROUTE,
} from "@/constants";

interface IAuthContext {
  currentUser: Account | null;
  role: Role | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const initialState: IAuthContext = {
  currentUser: null,
  role: null,
  login: () => {
    return Promise.reject();
  },
  logout: () => {
    return Promise.reject();
  },
};

export const AuthContext = createContext<IAuthContext>(initialState);

const AuthContextProviders = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<Account | null>(null);
  const [role, setRole] = useState<Role | null>(null);

  const getUserSession = useCallback(async () => {
    try {
      const userData = await api.authentication.getMe.query();
      const userDataResult = userData.body as Response<SignInResult>;

      const { user, role } = userDataResult.result;

      setCurrentUser(user);
      setRole(role as Role);
    } catch (error) {
      console.error("Error getting user session", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(firebaseAuth, provider);

      if (!result || !result.user) {
        throw new Error("Google sign in failed");
      }

      const uid = result.user.uid;
      const sessionIdToken = await result.user.getIdToken();

      await createSession(uid, sessionIdToken);

      const userData = await api.authentication.signIn.mutate({ body: null });

      const userDataResult = userData.body as Response<SignInResult>;
      const { user, role } = userDataResult.result;

      setCurrentUser(user);
      setRole(role as Role);

      router.push(role === "STUDENT" ? STUDENT_HOME_ROUTE : STAFF_HOME_ROUTE);
    } catch (error) {
      console.error("Error signing in with Google", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await firebaseAuth.signOut();
      await removeSession();

      setCurrentUser(null);
      setRole((prev) => {
        if (prev === "STUDENT") {
          router.push(STUDENT_LOGIN_ROUTE);
        } else {
          router.push(STAFF_LOGIN_ROUTE);
        }

        return null;
      });
    } catch (error) {
      console.error("Error signing out with Google", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getUserSession();
  }, [getUserSession]);

  if (isLoading) {
    // TODO: Implement Loading Backdrop
    return <></>;
  }

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, role }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProviders;
