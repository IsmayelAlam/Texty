import { createContext, useContext, useEffect, useState } from "react";
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../API/firebase";
import { AuthContext } from "./AuthContext";
import { SearchContext } from "./SearchContext";

export const ChatContext = createContext();

export function ChatProvider({ children }) {
  const [chatMessages, setChatMessages] = useState([]);
  const [chatID, setChatID] = useState("");
  const [activeChat, setActiveChat] = useState("");
  const { userData } = useContext(AuthContext);
  const { results } = useContext(SearchContext);

  useEffect(() => {
    if (!chatID) return;

    const unSub = async () => {
      const docRef = doc(db, "chats", chatID);
      return onSnapshot(docRef, async (doc) => {
        if (!doc.exists()) {
          await setDoc(docRef, {
            [userData.uid]: {
              displayName: userData.displayName,
              photoURL: userData.photoURL,
              status: "add friend",
            },
            [activeChat]: {
              displayName: results.data.displayName,
              photoURL: results.data.photoURL,
              status: "add friend",
            },
            messages: [],
          });
        } else {
          setChatMessages(doc.data());
        }
      });
    };

    unSub();
  }, [chatID, activeChat, results.data, userData]);

  useEffect(() => {
    if (!activeChat) return;

    const unSub = async () => {
      const curUserRef = doc(db, "userChats", userData.uid);
      const activeUserRef = doc(db, "userChats", activeChat);
      const curUserDoc = await getDoc(curUserRef);
      const activeUseDoc = await getDoc(activeUserRef);

      if (!curUserDoc.exists()) {
        await setDoc(curUserRef, {});
      }
      if (!activeUseDoc.exists()) {
        await setDoc(activeUserRef, {});
      }
    };

    unSub();
  }, [activeChat, userData]);

  return (
    <ChatContext.Provider
      value={{
        setChatID,
        chatMessages,
        setChatMessages,
        setActiveChat,
        activeChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
