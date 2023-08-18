import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";
import { SearchContext } from "../context/SearchContext";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../API/firebase";
import { combineID } from "../../helpers/miscellany";
import ActiveChatUser from "../utils/ActiveChatUser";
import SendMessage from "../utils/SendMessage";
import Text from "../utils/Text";
import avatar from "../assets/avatar.png";

export default function ChatTexts() {
  const { chatMessages, activeChat } = useContext(ChatContext);
  const { userData } = useContext(AuthContext);
  const { results } = useContext(SearchContext);

  const uid = userData?.uid;
  const combine = combineID(uid, activeChat);
  let perText = {};

  const handleFriend = async (state) => {
    const curUserRef = doc(db, "userChats", uid);
    const activeUserRef = doc(db, "userChats", activeChat);

    switch (state) {
      case "add friend":
        await updateDoc(curUserRef, {
          [activeChat]: {
            lastMessage: "friend request sent",
            displayName: results.data.displayName,
            photoURL: results.data.photoURL,
            timeStamp: serverTimestamp(),
            unread: false,
          },
        });
        await updateDoc(activeUserRef, {
          [uid]: {
            lastMessage: "",
            displayName: userData.displayName,
            photoURL: userData.photoURL,
            timeStamp: serverTimestamp(),
            unread: true,
          },
        });
        await updateDoc(doc(db, "chats", combine), {
          [uid + ".status"]: "pending",
          [activeChat + ".status"]: "accept",
        });
        return;
      case "accept":
        await updateDoc(curUserRef, {
          [activeChat + ".lastMessage"]: "friend request accepted",
          [activeChat + ".timeStamp"]: serverTimestamp(),
        });
        await updateDoc(activeUserRef, {
          [uid + ".lastMessage"]: "friend request accepted",
          [uid + ".timeStamp"]: serverTimestamp(),
        });
        await updateDoc(doc(db, "chats", combine), {
          [uid + ".status"]: "friends",
          [activeChat + ".status"]: "friends",
        });
        return;
      case "block":
        await updateDoc(curUserRef, {
          [activeChat]: {
            lastMessage: "blocked",
            displayName: results.data.displayName,
            photoURL: results.data.photoURL,
            timeStamp: serverTimestamp(),
            unread: false,
          },
        });
        await updateDoc(doc(db, "chats", combine), {
          [uid + ".status"]: "block",
        });
        return;
      case "unblock":
        await updateDoc(curUserRef, {
          [activeChat + ".lastMessage"]: "Add friend",
          [activeChat + ".timeStamp"]: serverTimestamp(),
        });
        await updateDoc(doc(db, "chats", combine), {
          [uid + ".status"]: "add friend",
        });
        return;
      case "pending":
        return null;
      default:
        return;
    }
  };

  let content = chatMessages?.messages?.map((massage, index) => {
    perText = index > 0 ? chatMessages.messages[index - 1] : null;
    return <Text key={massage.id} massage={massage} perText={perText} />;
  });

  if (
    chatMessages?.[uid]?.status === "add friend" ||
    chatMessages?.[uid]?.status === "pending" ||
    chatMessages?.[uid]?.status === "accept"
  ) {
    content = (
      <div className="addFriend">
        <img src={chatMessages[activeChat]?.photoURL || avatar} alt="" />
        <h2>{chatMessages[activeChat]?.displayName}</h2>
        <div>
          <button onClick={() => handleFriend("block")}>Block</button>
          <button onClick={() => handleFriend(chatMessages?.[uid]?.status)}>
            {chatMessages[uid]?.status}
          </button>
        </div>
      </div>
    );
  }
  if (chatMessages?.[activeChat]?.status === "block") {
    content = (
      <div className="addFriend">
        <h2>{chatMessages[activeChat].displayName}</h2>
        <p>Can&rsquo;t be reach</p>
      </div>
    );
  }
  if (chatMessages?.[uid]?.status === "block") {
    content = (
      <div className="addFriend">
        <img src={chatMessages[activeChat]?.photoURL || avatar} alt="" />
        <h2>{chatMessages[activeChat]?.displayName}</h2>
        <div>
          <button onClick={() => handleFriend("unblock")}>Unblock</button>
        </div>
      </div>
    );
  }

  return (
    <div className={`chat ${activeChat || "hidden"}`}>
      {chatMessages?.[activeChat]?.status === "friends" && <ActiveChatUser />}
      <div className="chatText">{content}</div>
      {chatMessages?.[activeChat]?.status === "friends" && <SendMessage />}
    </div>
  );
}
