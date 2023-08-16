import { createContext, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../API/firebase";

export const ChatContext = createContext();

export function ChatProvider({ children }) {
  const [chatMessages, setChatMessages] = useState([]);
  const [chatID, setChatID] = useState("");

  useEffect(() => {
    if (!chatID) return;

    const unSub = async () => {
      const docRef = doc(db, "chats", chatID);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) setChatMessages(docSnap.data());
    };

    unSub();
  }, [chatID]);

  console.log(chatMessages);

  return (
    <ChatContext.Provider value={{ setChatID, chatMessages }}>
      {children}
    </ChatContext.Provider>
  );
}
