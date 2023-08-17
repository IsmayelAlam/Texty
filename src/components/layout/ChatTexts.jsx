import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";
import { SearchContext } from "../context/SearchContext";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
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

  console.log(chatMessages);

  const handleFriend = async (state) => {
    const curUserRef = doc(db, "userChats", uid);
    const activeUserRef = doc(db, "userChats", activeChat);
    const curUserDoc = await getDoc(curUserRef);
    const activeUseDoc = await getDoc(activeUserRef);

    switch (state) {
      case "add friend":
        await updateDoc(doc(db, "chats", combine), {
          [uid + ".status"]: "pending",
          [activeChat + ".status"]: "accept",
        });
        if (!curUserDoc.exists()) {
          await setDoc(curUserRef, {
            [activeChat]: {
              lastMessage: "friend request sent",
              displayName: results.data.displayName,
              photoURL: results.data.photoURL,
              timeStamp: serverTimestamp(),
              unread: false,
            },
          });
        } else {
          await updateDoc(curUserRef, {
            [activeChat]: {
              lastMessage: "friend request sent",
              displayName: results.data.displayName,
              photoURL: results.data.photoURL,
              timeStamp: serverTimestamp(),
              unread: false,
            },
          });
        }
        if (!activeUseDoc.exists()) {
          await setDoc(activeUserRef, {
            [uid]: {
              lastMessage: "send a friend request",
              displayName: userData.displayName,
              photoURL: userData.photoURL,
              timeStamp: serverTimestamp(),
              unread: true,
            },
          });
        } else {
          await updateDoc(activeUserRef, {
            [uid]: {
              lastMessage: "send a friend request",
              displayName: userData.displayName,
              photoURL: userData.photoURL,
              timeStamp: serverTimestamp(),
              unread: true,
            },
          });
        }
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
          [activeChat + ".lastMessage"]: "blocked",
          [activeChat + ".timeStamp"]: serverTimestamp(),
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
        await updateDoc(activeUserRef, {
          [uid + ".lastMessage"]: "Add friend",
          [uid + ".timeStamp"]: serverTimestamp(),
        });
        await updateDoc(doc(db, "chats", combine), {
          [activeChat + ".status"]: "add friend",
          [uid + ".status"]: "add friend",
        });
        return;
      case "pending":
        return null;
      default:
        return;
    }
  };

  let content = chatMessages?.messages?.map((massage) => (
    <Text key={massage.id} massage={massage} />
  ));

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
    <div className="chat">
      <div className="chatText">
        {chatMessages?.[activeChat]?.status === "friends" && <ActiveChatUser />}
        {content}
      </div>
      {chatMessages?.[activeChat]?.status === "friends" && <SendMessage />}
    </div>
  );
}
