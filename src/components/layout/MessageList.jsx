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
    unsub();
  }, [currentUser.uid]);

  return (
    <div className="messageList">
      {results?.id && <Messages friends={results.data} />}
      {userChats.map((data) => (
        <Messages friends={data[1]} key={data[0]} id={data[0]} />
      ))}
    </div>
  );
}
