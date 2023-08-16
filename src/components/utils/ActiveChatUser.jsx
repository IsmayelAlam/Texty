import { useContext } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { ChatContext } from "../context/ChatContext";

export default function ActiveChatUser() {
  const { chatMessages, activeChat } = useContext(ChatContext);

  if (!chatMessages.length) return;

  const user = chatMessages[activeChat];

  return (
    <div className="activeChat">
      <div className="activeChatUser">
        <img src={user.photoURL} alt="" className="activeChatImg" />
        <h2>{user.displayName}</h2>
      </div>
      <BsThreeDotsVertical />
    </div>
  );
}
