import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Text({ massage, photo }) {
  const { currentUser } = useContext(AuthContext);

  return (
    <>
      <div
        className={`chatMessage ${
          currentUser.uid === massage.id && "activeUser"
        }`}
      >
        <div>
          <img
            src={currentUser.uid === massage.id ? currentUser.photoURL : photo}
            alt=""
            className="chatUserImg"
          />
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
