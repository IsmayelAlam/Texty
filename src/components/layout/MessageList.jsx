import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../context/SearchContext";
import { doc, getDoc } from "firebase/firestore";

import Messages from "../utils/Messages";
import { db } from "../API/firebase";
import { AuthContext } from "../context/AuthContext";

export default function MessageList() {
  const [userChats, setUserChats] = useState([]);

  const { results } = useContext(SearchContext);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const unsub = async () => {
      const docRef = doc(db, "userChats", currentUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) setUserChats(Object.entries(docSnap.data()));
    };
    return unsub;
  }, [currentUser.uid]);

  return (
    <div className="messageList">
      {results?.id && <Messages friends={results.data} id={results.id} />}
      {userChats
        .sort((a, b) => b[1].timeStamp.seconds - a[1].timeStamp.seconds)
        .map(([id, data]) => (
          <Messages friends={data} key={id} id={id} />
        ))}
    </div>
  );
}
