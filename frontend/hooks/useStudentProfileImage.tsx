import { useAuthContext } from "@/providers/AuthProvider";

// Firebase Config
import { firebaseAuth } from "../libs/firebase/config";

export const useStudentProfileImage = () => {
  const profileImageSrc = firebaseAuth.currentUser?.photoURL;
  console.log(profileImageSrc);
  return profileImageSrc;
};
