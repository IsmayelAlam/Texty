import { useContext } from "react";
import { SearchContext } from "../context/SearchContext";
import Messages from "../utils/Messages";

export default function MessageList() {
  const { results } = useContext(SearchContext);

  return (
    <div className="messageList">
      {results?.id && <Messages friends={results.data} />}
    </div>
  );
}
