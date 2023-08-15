import { useContext } from "react";
import avatar from "../assets/avatar.png";
import { AuthContext } from "../context/AuthContext";

export default function Messages({ friends, id, selected }) {
  const { currentUser } = useContext(AuthContext);
  const [active, setActive] = selected;

  function handleClick() {
    setActive(id);
    const newId =
      id < currentUser.uid ? id + currentUser.uid : currentUser.uid + id;
    console.log(newId);
  }

  return (
    <div
      className={`friend ${active === id && "active"}`}
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
