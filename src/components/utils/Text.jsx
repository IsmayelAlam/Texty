import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

export default function Text({ massage }) {
  const { currentUser } = useContext(AuthContext);
  const { chatMessages } = useContext(ChatContext);

  const user =
    currentUser.uid === massage.id ? currentUser : chatMessages[massage.id];

  return (
    <>
      <div
        className={`chatMessage ${
          currentUser.uid === massage.id && "activeUser"
        }`}
      >
        <div>
          <img src={user.photoURL} alt="" className="chatUserImg" />
        </div>
        <div className="chatPayload">
          <p className="chatTextMessage">{massage.text}</p>
          {massage.image && (
            <img src={massage.image} alt="" className="chatTextImg" />
          )}
        </div>
      </div>
    </>
  );
}
