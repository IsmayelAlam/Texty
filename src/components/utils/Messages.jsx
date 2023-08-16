import { useContext } from "react";
import avatar from "../assets/avatar.png";
import { AuthContext } from "../context/AuthContext";
import { combineID } from "../../helpers/miscellany";
import { ChatContext } from "../context/ChatContext";
import { SearchContext } from "../context/SearchContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../API/firebase";

export default function Messages({ friends, id, search }) {
  const { currentUser } = useContext(AuthContext);
  const { setChatID, setActiveChat, activeChat } = useContext(ChatContext);
  const { setResults } = useContext(SearchContext);

  async function handleClick() {
    setActiveChat(id);
    setChatID(combineID(currentUser.uid, id));

    setResults((result) => {
      return { ...result, id: null };
    });
    if (!search) {
      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [id + ".unread"]: false,
      });
    }
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
