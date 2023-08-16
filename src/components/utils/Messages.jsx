import { useContext } from "react";
import avatar from "../assets/avatar.png";
import { AuthContext } from "../context/AuthContext";
import { combineID } from "../../helpers/miscellany";
import { ChatContext } from "../context/ChatContext";

export default function Messages({ friends, id }) {
  const { currentUser } = useContext(AuthContext);
  const { setChatID, setActiveChat, activeChat } = useContext(ChatContext);

  function handleClick() {
    setActiveChat(id);
    const newId = combineID(currentUser.uid, id);
    setChatID(newId);
  }

  return (
    <div
      className={`friend ${activeChat === id && "active"}`}
      onClick={handleClick}
    >
      <img
        src={friends?.photoURL || avatar}
        alt={`photo of ${friends?.displayName}`}
        className="friendImg"
      />
      <div className="friendName">
        <h3>{friends?.displayName}</h3>
        {friends?.lastMessage && (
          <p className="lastMessage">{friends?.lastMessage}</p>
        )}
      </div>

      {friends.unread && <p className="new">new</p>}
    </div>
  );
}
