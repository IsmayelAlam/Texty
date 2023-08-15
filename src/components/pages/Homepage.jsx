import { useContext } from "react";
import Chat from "../layout/Chat";
import Sidebar from "../layout/Sidebar";
import { AuthContext } from "../context/AuthContext";

export default function Homepage() {
  const { currentUser } = useContext(AuthContext);
  if (!currentUser) return;

  return (
    <div className="homepage">
      <Sidebar />
      <Chat />
    </div>
  );
}
