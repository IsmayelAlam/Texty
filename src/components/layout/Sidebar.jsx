import Logo from "../utils/Logo";
import SearchBar from "../utils/SearchBar";
import MessageList from "./MessageList";
import User from "./User";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <Logo />
      <SearchBar />
      <MessageList />
      <User />
    </div>
  );
}
