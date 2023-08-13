import ActiveChatUser from "../utils/ActiveChatUser";
import SendMessage from "../utils/SendMessage";
import ChatTexts from "./ChatTexts";

export default function Chat() {
  return (
    <div className="chat">
      <ActiveChatUser />
      <ChatTexts />
      <SendMessage />
    </div>
  );
}
