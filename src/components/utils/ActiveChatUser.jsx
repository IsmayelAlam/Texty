import { useContext } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { ChatContext } from "../context/ChatContext";

export default function ActiveChatUser() {
  const { chatMessages } = useContext(ChatContext);

  if (!chatMessages) return;

  return (
    <div className="activeChat">
      <div className="activeChatUser">
        <img src={chatMessages.photoURL} alt="" className="activeChatImg" />
        <h2>{chatMessages.displayName}</h2>
      </div>
      <BsThreeDotsVertical />
    </div>
  );
}
