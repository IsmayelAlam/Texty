import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

export default function Text({ massage }) {
  const { currentUser } = useContext(AuthContext);
  const { chatMessages } = useContext(ChatContext);

  const user =
    currentUser.uid === massage.senderId
      ? currentUser
      : chatMessages[massage.senderId];

  return (
    <>
      <div
        className={`chatMessage ${
          currentUser.uid === massage.senderId && "activeUser"
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
