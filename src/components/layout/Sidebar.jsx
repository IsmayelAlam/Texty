import { useContext } from "react";
import Logo from "../utils/Logo";
import SearchBar from "../utils/SearchBar";
import MessageList from "./MessageList";
import User from "./User";
import { ChatContext } from "../context/ChatContext";
import { screenWidth } from "../../helpers/miscellany";

export default function Sidebar() {
  const { activeChat } = useContext(ChatContext);

  let show = activeChat
    ? screenWidth > 750 || false
    : screenWidth < 750 || true;

  return (
    <div className={`sidebar ${show || "hidden"}`}>
      <Logo />
      <SearchBar />
      <MessageList />
      <User />
    </div>
  );
}
