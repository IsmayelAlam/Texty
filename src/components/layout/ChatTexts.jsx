import { useContext } from "react";
import Text from "../utils/Text";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";
import { SearchContext } from "../context/SearchContext";
import { doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../API/firebase";
import { combineID } from "../../helpers/miscellany";

export default function ChatTexts() {
  const { chatMessages, activeChat } = useContext(ChatContext);
  const { userData } = useContext(AuthContext);
  const { results } = useContext(SearchContext);

  const uid = userData?.uid;
  const combine = combineID(uid, activeChat);

  const handleFriendRequest = async () => {
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
      [activeChat + ".status"]: "requestFriend",
    });
  };

  const handleBlock = async () => {
    await updateDoc(doc(db, "chats", combine), {
      [uid + ".status"]: "block",
    });
  };

  let content =
    !chatMessages.length ||
    chatMessages.messages.map((massage) => (
      <Text key={massage.id} massage={massage} />
    ));

  if (
    chatMessages[activeChat]?.status !== "friends" &&
    chatMessages[activeChat]?.status !== undefined
  )
    content = (
      <div className="addFriend">
        <img src={chatMessages[activeChat].photoURL} alt="" />
        <h2>{chatMessages[activeChat].displayName}</h2>
        <div>
          <button onClick={handleBlock}>Block</button>
          <button onClick={handleFriendRequest}>
            {chatMessages[activeChat]?.status === "notFriend"
              ? "Add Friend"
              : "Accept"}
          </button>
        </div>
      </div>
    );

  if (
    chatMessages[uid]?.status === "block" ||
    chatMessages[activeChat]?.status === "block"
  )
    content = (
      <div className="addFriend">
        <h2>{chatMessages[activeChat].displayName}</h2>
        <p>Can&rsquo;t be reach</p>
      </div>
    );

  return <div className="chatText">{content}</div>;
}
