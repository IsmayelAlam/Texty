import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  appId: import.meta.env.VITE_appId,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  measurementId: import.meta.env.VITE_measurementId,

  authDomain: "ismayel-texty.firebaseapp.com",
  storageBucket: "ismayel-texty.appspot.com",
  projectId: "ismayel-texty",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
