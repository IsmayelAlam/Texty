import { useContext } from "react";
import Text from "../utils/Text";
import { ChatContext } from "../context/ChatContext";

export default function ChatTexts() {
  const { chatMessages } = useContext(ChatContext);
  // if (!chatMessages.length) return;

  return (
    <div className="chatText">
      {chatMessages.messages?.map((massage) => (
        <Text
          key={massage.id}
          massage={massage}
          photo={chatMessages.photoURL}
        />
      ))}
    </div>
  );
}
