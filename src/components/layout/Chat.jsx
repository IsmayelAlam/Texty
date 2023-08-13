import SendMessage from "../utils/SendMessage";

export default function Chat() {
  return (
    <div className="chat">
      <div className="activeChat">jessy</div>
      <div className="chatText">chat</div>
      <SendMessage />
    </div>
  );
}
