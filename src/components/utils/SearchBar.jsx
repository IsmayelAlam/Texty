import { FaSearch } from "react-icons/fa";
import { useContext, useState } from "react";
import { SearchContext } from "../context/SearchContext";
import { AuthContext } from "../context/AuthContext";

export default function SearchBar() {
  const [search, setSearch] = useState("");

  const { currentUser } = useContext(AuthContext);
  const { setQuery } = useContext(SearchContext);

  function handleSearch() {
    if (currentUser.displayName !== search) setQuery(search);
    setSearch("");
  }

  return (
    <div className="search">
      <input
        type="text"
        placeholder="Find friends"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        onKeyDown={(e) => (e.code.includes("Enter") ? handleSearch() : null)}
      />
      <FaSearch onClick={() => handleSearch()} />
    </div>
  );
}
