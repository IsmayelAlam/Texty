import { createContext, useContext, useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
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

  // console.log(userData?.friends[activeChat]);
  // console.log(activeChat);

  useEffect(() => {
    if (!chatID) return;

    const unSub = async () => {
      const docRef = doc(db, "chats", chatID);
      const docSnap = await getDoc(docRef);
      console.log(docSnap.exists());

      if (docSnap.exists()) {
        setChatMessages(docSnap.data());
      } else {
        await setDoc(docRef, {
          [userData.uid]: {
            displayName: userData.displayName,
            photoURL: userData.photoURL,
            status: "notFriend",
          },
          [activeChat]: {
            displayName: results.data.displayName,
            photoURL: results.data.photoURL,
            status: "notFriend",
          },
          messages: {},
        });
      }
    };

    unSub();
  }, [chatID, activeChat, results, userData]);

  return (
    <ChatContext.Provider
      value={{ setChatID, chatMessages, setActiveChat, activeChat }}
    >
      {children}
    </ChatContext.Provider>
  );
}
