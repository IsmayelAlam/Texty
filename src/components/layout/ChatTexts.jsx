import { useContext } from "react";
import Text from "../utils/Text";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";
import { SearchContext } from "../context/SearchContext";
import { doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../API/firebase";

export default function ChatTexts() {
  const { chatMessages, activeChat } = useContext(ChatContext);
  const { userData } = useContext(AuthContext);
  const { results } = useContext(SearchContext);
  const uid = userData?.uid;

  const handleFriendRequest = async () => {
    await setDoc(doc(db, "userChats", uid), {
      activeChat: {
        lastMessage: "friend request sent",
        displayName: results.data.displayName,
        photoURL: results.data.photoURL,
        timeStamp: serverTimestamp(),
        unread: false,
      },
    });
    await setDoc(doc(db, "userChats", activeChat), {
      uid: {
        lastMessage: "sent a friend request",
        displayName: userData.displayName,
        photoURL: userData.photoURL,
        timeStamp: serverTimestamp(),
        unread: true,
      },
    });

    await updateDoc(doc(db, "users", activeChat), {
      ["friends." + uid]: "pending",
    });
    await updateDoc(doc(db, "users", uid), {
      ["friends." + activeChat]: "pending",
    });
  };

  let content;

  if (userData?.friends[activeChat] === undefined)
    content = (
      <div className="addFriend">
        <img src={results.data?.photoURL} alt="" />
        <h2>{results.data?.displayName}</h2>
        <div>
          <button>Block</button>
          <button onClick={handleFriendRequest}>Add Friend</button>
        </div>
      </div>
    );
  if (userData?.friends[activeChat] === "pending")
    content = (
      <div className="addFriend">
        <img src={results.data?.photoURL} alt="" />
        <h2>{results.data?.displayName}</h2>
        <div>
          <button>Block</button>
          <button onClick={handleFriendRequest}>Accept</button>
        </div>
      </div>
    );

  return (
    <div className="chatText">
      {chatMessages.messages?.map((massage) => (
        <Text key={massage.id} massage={massage} />
      ))}
    </div>
  );
}
