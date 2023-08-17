import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

export default function Text({ massage, perText }) {
  const { currentUser } = useContext(AuthContext);
  const { chatMessages } = useContext(ChatContext);
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [massage]);

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
        ref={ref}
      >
        <div className="imageBox">
          {perText?.senderId === massage.senderId || (
            <img src={user.photoURL} alt="" className="chatUserImg" />
          )}
        </div>
        <div className="chatPayload">
          {massage.text && <p className="chatTextMessage">{massage.text}</p>}
          {massage.image && (
            <img src={massage.image} alt="" className="chatTextImg" />
          )}
        </div>
      </div>
    </>
  );
}
