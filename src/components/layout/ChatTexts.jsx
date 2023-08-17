import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";
import { SearchContext } from "../context/SearchContext";
import { doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../API/firebase";
import { combineID } from "../../helpers/miscellany";
import ActiveChatUser from "../utils/ActiveChatUser";
import SendMessage from "../utils/SendMessage";
import Text from "../utils/Text";

export default function ChatTexts() {
  const { chatMessages, activeChat } = useContext(ChatContext);
  const { userData } = useContext(AuthContext);
  const { results } = useContext(SearchContext);

  const uid = userData?.uid;
  const combine = combineID(uid, activeChat);

  console.log(chatMessages);

  const handleFriend = async () => {
    switch (chatMessages[uid]?.status) {
      case "add friend":
        await setDoc(doc(db, "userChats", uid), {
          [activeChat]: {
            lastMessage: "friend request sent",
            displayName: results.data.displayName,
            photoURL: results.data.photoURL,
            timeStamp: serverTimestamp(),
            unread: false,
          },
        });
        await setDoc(doc(db, "userChats", activeChat), {
          [uid]: {
            lastMessage: "send a friend request",
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
        await updateDoc(doc(db, "userChats", uid), {
          [activeChat + ".lastMessage"]: "friend request accepted",
          [activeChat + ".timeStamp"]: serverTimestamp(),
        });
        await updateDoc(doc(db, "userChats", activeChat), {
          [uid + ".lastMessage"]: "friend request accepted",
          [uid + ".timeStamp"]: serverTimestamp(),
        });
        await updateDoc(doc(db, "chats", combine), {
          [uid + ".status"]: "friends",
          [activeChat + ".status"]: "friends",
        });
        return;
      case "block":
        await updateDoc(doc(db, "chats", combine), {
          [uid + ".status"]: "block",
        });
        return;
      case "pending":
        return null;
      default:
        return;
    }
  };

  let content =
    chatMessages?.messages?.length &&
    chatMessages.messages.map((massage) => (
      <Text key={massage.id} massage={massage} />
    ));

  if (
    chatMessages?.[activeChat]?.status === "add friend" ||
    chatMessages?.[activeChat]?.status === "pending" ||
    chatMessages?.[activeChat]?.status === "accept"
  ) {
    content = (
      <div className="addFriend">
        <img src={chatMessages[activeChat]?.photoURL} alt="" />
        <h2>{chatMessages[activeChat]?.displayName}</h2>
        <div>
          <button onClick={handleFriend}>Block</button>
          <button onClick={handleFriend}>{chatMessages[uid]?.status}</button>
        </div>
      </div>
    );
  }
  if (
    chatMessages?.[uid]?.status === "block" ||
    chatMessages?.[activeChat]?.status === "block"
  ) {
    content = (
      <div className="addFriend">
        <h2>{chatMessages[activeChat].displayName}</h2>
        <p>Can&rsquo;t be reach</p>
      </div>
    );
  }

  return (
    <div className="chat">
      <div className="chatText">
        {chatMessages?.[activeChat]?.status === "friends" && <ActiveChatUser />}
        {content}
      </div>
      {chatMessages?.[activeChat]?.status === "friends" && <SendMessage />}
    </div>
  );
}
