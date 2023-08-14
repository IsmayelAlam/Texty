import { collection, getDocs, query, where } from "firebase/firestore";
import { FaSearch } from "react-icons/fa";
import { db } from "../API/firebase";
import { useState } from "react";

export default function SearchBar() {
  const [search, setSearch] = useState("");

  const handleSearch = async () => {
    const q = query(collection(db, "users"), where("fullName", "==", search));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  };

  return (
    <div className="search">
      <input
        type="text"
        placeholder="Find friends"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        onKeyDown={(e) => (e.code.includes("Enter") ? handleSearch() : null)}
      />
      <FaSearch onClick={handleSearch} />
    </div>
  );
}
