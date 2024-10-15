import { useAuthContext } from "@/contexts/AuthContext";

// Firebase Config
import { firebaseAuth } from "../libs/firebase/config";

export const useStudentProfileImage = () => {
  const profileImageSrc = firebaseAuth.currentUser?.photoURL;
  console.log(profileImageSrc);
  return profileImageSrc;
};
