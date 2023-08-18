import { useContext } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { ChatContext } from "../context/ChatContext";
import { BiArrowBack } from "react-icons/bi";

export default function ActiveChatUser() {
  const { chatMessages, activeChat, setActiveChat } = useContext(ChatContext);

  const user = chatMessages[activeChat];

  return (
    <div className="activeChat">
      <div className="activeChatUser">
        <button onClick={() => setActiveChat(null)}>
          <BiArrowBack />
        </button>
        <img src={user.photoURL} alt="" className="activeChatImg" />
        <h2>{user.displayName}</h2>
      </div>
      <BsThreeDotsVertical />
    </div>
  );
}
