import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../API/firebase";
import { doc, getDoc } from "firebase/firestore";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [userData, setUserData] = useState();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unSub();
  }, []);

  useEffect(() => {
    if (!currentUser) return;

    const unSub = async () => {
      const docRef = doc(db, "users", currentUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) setUserData(docSnap.data());
    };

    unSub();
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, userData }}>
      {children}
    </AuthContext.Provider>
  );
}
