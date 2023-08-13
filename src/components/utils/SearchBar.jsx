import { FaSearch } from "react-icons/fa";

export default function SearchBar() {
  return (
    <div className="search">
      <input type="text" placeholder="Search for friends" />
      <FaSearch />
    </div>
  );
}
