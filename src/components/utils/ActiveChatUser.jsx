import { BsThreeDotsVertical } from "react-icons/bs";

export default function ActiveChatUser() {
  return (
    <div className="activeChat">
      <div className="activeChatUser">
        <img
          src={`https://picsum.photos/id/${Math.ceil(
            Math.random() * 1000
          )}/200`}
          alt=""
          className="activeChatImg"
        />
        <h2>jessy</h2>
      </div>
      <BsThreeDotsVertical />
    </div>
  );
}
