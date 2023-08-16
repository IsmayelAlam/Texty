import { createContext, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../API/firebase";

export const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [results, setResults] = useState("");

  const setQuery = async (search) => {
    if (!search) return null;

    const q = await query(
      collection(db, "users"),
      where("displayName", "==", search)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setResults({ id: doc.id, data: doc.data() });
    });
  };

  return (
    <SearchContext.Provider value={{ results, setQuery, setResults }}>
      {children}
    </SearchContext.Provider>
  );
}
