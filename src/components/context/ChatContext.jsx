import { createContext, useContext, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../API/firebase";
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext();

export function ChatProvider({ children }) {
  const [chatMessages, setChatMessages] = useState([]);
  const [chatID, setChatID] = useState("");
  const [activeChat, setActiveChat] = useState("");
  const { userData } = useContext(AuthContext);

  // console.log(userData?.friends[activeChat]);
  // console.log(activeChat);

  useEffect(() => {
    if (!chatID || !userData?.friends[activeChat]) return;

    const unSub = async () => {
      const docRef = doc(db, "chats", chatID);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) setChatMessages(docSnap.data());
    };

    console.log("run");

    unSub();
  }, [chatID]);

  return (
    <ChatContext.Provider
      value={{ setChatID, chatMessages, setActiveChat, activeChat }}
    >
      {children}
    </ChatContext.Provider>
  );
}
