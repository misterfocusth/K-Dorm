"use client";

// React
import { useCallback, useEffect, useState, createContext } from "react";

// Firebase
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged as _onAuthStateChanged,
  signInWithEmailAndPassword,
  UserCredential,
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
import LoadingSpinner from "@/components/LoadingSpinner";

interface IAuthContext {
  currentUser: Account | null;
  role: Role | null;
  loginWithGoogle: () => Promise<void>;
  loginWithEmailAndPassword: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const initialState: IAuthContext = {
  currentUser: null,
  role: null,
  loginWithGoogle: () => {
    return Promise.reject();
  },
  logout: () => {
    return Promise.reject();
  },
  loginWithEmailAndPassword: () => {
    return Promise.reject();
  },
};

export const AuthContext = createContext<IAuthContext>(initialState);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<Account | null>(null);
  const [role, setRole] = useState<Role | null>(null);

  const getUserIdAndSessionIdToken = async (fbCredential: UserCredential) => {
    try {
      const uid = fbCredential.user?.uid;
      const sessionIdToken = await fbCredential.user?.getIdToken();
      return { uid, sessionIdToken };
    } catch (error) {
      throw new Error("Error getting user id and session id token");
    }
  };

  const handleUserAuthentication = async (uid: string, sessionIdToken: string) => {
    await createSession(uid, sessionIdToken);
    const currentUser = await getCurrentUserData(sessionIdToken);

    if (currentUser) {
      setCurrentUser(currentUser.user);
      setRole(currentUser.role as Role);
      router.push(currentUser.role === "STUDENT" ? STUDENT_HOME_ROUTE : STAFF_HOME_ROUTE);
    } else {
      throw new Error("Error retrieving user data");
    }
  };

  const getCurrentUserData = useCallback(async (sessionIdToken?: string) => {
    let userData;

    try {
      if (!sessionIdToken) {
        userData = await api.authentication.getMe.query();
      } else {
        userData = await api.authentication.signIn.mutate({
          body: null,
          extraHeaders: {
            Authorization: `Bearer ${sessionIdToken}`,
          },
        });
      }

      const userDataResult = userData.body as Response<SignInResult>;
      return userDataResult.result;
    } catch (error) {
      console.error("Error getting user session", error);
      await removeSession();
    }
  }, []);

  const loginWithGoogle = useCallback(async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(firebaseAuth, provider);

      if (!result || !result.user) throw new Error("Google sign in failed");

      const { uid, sessionIdToken } = await getUserIdAndSessionIdToken(result);
      await handleUserAuthentication(uid, sessionIdToken);
    } catch (error) {
      console.error("Error signing in with Google", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loginWithEmailAndPassword = useCallback(async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(firebaseAuth, email, password);

      if (!result || !result.user) throw new Error("Credentials sign in failed");

      const { uid, sessionIdToken } = await getUserIdAndSessionIdToken(result);
      await handleUserAuthentication(uid, sessionIdToken);
    } catch (error) {
      console.error("Error signing in with credentials", error);
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
        if (!prev || prev === "STUDENT") {
          router.push(STUDENT_LOGIN_ROUTE);
        } else {
          router.push(STAFF_LOGIN_ROUTE);
        }

        return null;
      });
    } catch (error) {
      console.error("Error signing out with Google", error);
    }
  }, []);

  useEffect(() => {
    (async () => {
      const currentUser = await getCurrentUserData();
      if (currentUser) {
        setCurrentUser(currentUser.user);
        setRole(currentUser.role as Role);
      }
      setIsLoading(false);
    })();
  }, [getCurrentUserData]);

  if (isLoading) {
    return <LoadingSpinner loading={isLoading} />;
  }

  return (
    <AuthContext.Provider
      value={{ currentUser, loginWithEmailAndPassword, loginWithGoogle, logout, role }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
