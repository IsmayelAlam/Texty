import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../context/SearchContext";
import { doc, onSnapshot } from "firebase/firestore";

import Messages from "../utils/Messages";
import { db } from "../API/firebase";
import { AuthContext } from "../context/AuthContext";

export default function MessageList() {
  const [userChats, setUserChats] = useState([]);

  const { results } = useContext(SearchContext);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const unSub = async () => {
      const docRef = doc(db, "userChats", currentUser.uid);
      return onSnapshot(docRef, (doc) => {
        if (!doc.exists()) return;
        setUserChats(Object.entries(doc.data()));
      });
    };
    return unSub;
  }, [currentUser]);

  return (
    <div className="messageList">
      {results?.id && (
        <Messages friends={results.data} id={results.id} search={true} />
      )}
      {userChats
        .sort((a, b) => b[1]?.timeStamp?.seconds - a[1]?.timeStamp?.seconds)
        .map(([id, data]) => (
          <Messages friends={data} key={id} id={id} />
        ))}
    </div>
  );
}
