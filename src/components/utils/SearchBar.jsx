import { FaSearch } from "react-icons/fa";
import { useContext, useState } from "react";
import { SearchContext } from "../context/SearchContext";
import Messages from "./Messages";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const { setQuery, results } = useContext(SearchContext);

  function handleSearch(e) {
    setQuery(search);
    setSearch("");
  }

  return (
    <div className="search">
      <input
        type="text"
        placeholder="Find friends"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        onKeyDown={(e) => (e.code.includes("Enter") ? handleSearch(e) : null)}
      />
      <FaSearch onClick={(e) => handleSearch(e)} />
    </div>
  );
}
