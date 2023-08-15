import avatar from "../assets/avatar.png";

export default function Messages({ friends, id }) {
  return (
    <div className={`friend `}>
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
