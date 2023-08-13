import { AiOutlineSend } from "react-icons/ai";
import { ImAttachment, ImImages } from "react-icons/im";

export default function SendMessage() {
  return (
    <form className="sendText">
      <input
        type="text"
        required
        placeholder="Send messages"
        className="sendInput"
      />
      <div className="attachments">
        <label htmlFor="images">
          <ImImages />
        </label>
        <label htmlFor="docs">
          <ImAttachment />
        </label>
        <input type="file" id="images" />
        <input type="file" id="docs" />

        <button type="submit" className="sendBtn">
          <AiOutlineSend />
        </button>
      </div>
    </form>
  );
}
