import { useContext } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { ImImages } from "react-icons/im";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { combineID } from "../../helpers/miscellany";
import { Timestamp, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../API/firebase";
import { v4 as uuidv4 } from "uuid";

export default function SendMessage() {
  const { currentUser } = useContext(AuthContext);
  const { activeChat } = useContext(ChatContext);
  const combine = combineID(activeChat, currentUser.uid);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const text = e.target[0].value;
    const image = e.target[1].value;

    if (image) {
      console.log("image");
    } else {
      await updateDoc(doc(db, "chats", combine), {
        messages: arrayUnion({
          text,
          senderId: currentUser.uid,
          id: uuidv4(),
          image: "",
          timeStamp: Timestamp.now(),
        }),
      });
      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [activeChat + ".lastMessage"]: text,
      });
      await updateDoc(doc(db, "userChats", activeChat), {
        [currentUser.uid + ".lastMessage"]: text,
        [currentUser.uid + ".unread"]: true,
      });
    }

    e.target.reset();
  };
  return (
    <form className="sendText" onSubmit={handleSendMessage}>
      <input
        type="text"
        required
        placeholder="Send messages"
        className="sendInput"
      />

      <div className="attachments">
        <label htmlFor="images">
          <ImImages />
        </label>
        <input type="file" id="images" />

        <button type="submit" className="sendBtn">
          <AiOutlineSend />
        </button>
      </div>
    </form>
  );
}
