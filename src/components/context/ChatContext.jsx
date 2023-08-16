import { createContext, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../API/firebase";

export const ChatContext = createContext();

export function ChatProvider({ children }) {
  const [chats, setChats] = useState([]);

  return (
    <ChatContext.Provider value={{ results, setQuery }}>
      {children}
    </ChatContext.Provider>
  );
}
