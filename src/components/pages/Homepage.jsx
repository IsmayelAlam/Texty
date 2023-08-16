import { useContext } from "react";

import Sidebar from "../layout/Sidebar";
import { AuthContext } from "../context/AuthContext";
import ChatTexts from "../layout/ChatTexts";

export default function Homepage() {
  const { currentUser } = useContext(AuthContext);
  if (!currentUser) return;

  return (
    <div className="homepage">
      <Sidebar />
      <ChatTexts />
    </div>
  );
}
