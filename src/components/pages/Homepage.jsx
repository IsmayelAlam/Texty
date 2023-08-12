import Chat from "../layout/Chat";
import Sidebar from "../layout/Sidebar";

export default function Homepage() {
  return (
    <div className="homepage">
      <Sidebar />
      <Chat />
    </div>
  );
}
