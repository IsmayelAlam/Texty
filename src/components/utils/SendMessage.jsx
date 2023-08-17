import { useContext, useReducer } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { ImImages } from "react-icons/im";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { combineID, initState, reducer } from "../../helpers/miscellany";
import { Timestamp, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../API/firebase";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import imageCompress from "../../helpers/imageCompress";

export default function SendMessage() {
  const { currentUser } = useContext(AuthContext);
  const { activeChat } = useContext(ChatContext);
  const combine = combineID(activeChat, currentUser.uid);
  const [state, dispatch] = useReducer(reducer, initState);

  const ids = uuidv4();

  async function handleImage(e) {
    const image = e.target.files["0"];
    if (!image) return;

    dispatch({ type: "isUploading", uploading: true });

    const compressImg = await imageCompress(image, 400);

    const storageRef = ref(storage, `${currentUser.uid}${ids}`);

    const uploadTask = uploadBytesResumable(storageRef, compressImg);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        dispatch({ type: "isProgress", progress });
      },
      (error) => {
        dispatch({ type: "isError", error });
      },
      async () => {
        const download = await getDownloadURL(uploadTask.snapshot.ref);
        dispatch({ type: "imageLink", image: download });
        dispatch({ type: "isUploading", uploading: false });
      }
    );
  }

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const text = e.target[0].value;
    e.target.reset();

    if (!text && !state.image) return;

    if (state.image) {
      await updateDoc(doc(db, "chats", combine), {
        messages: arrayUnion({
          text,
          senderId: currentUser.uid,
          id: ids,
          image: state.image,
          timeStamp: Timestamp.now(),
        }),
      });
      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [activeChat + ".lastMessage"]: "sent an image",
      });
      await updateDoc(doc(db, "userChats", activeChat), {
        [currentUser.uid + ".lastMessage"]: "sent an image",
        [currentUser.uid + ".unread"]: true,
      });
    } else {
      await updateDoc(doc(db, "chats", combine), {
        messages: arrayUnion({
          text,
          senderId: currentUser.uid,
          id: ids,
          image: "",
          timeStamp: Timestamp.now(),
        }),
      });
      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [activeChat + ".lastMessage"]: text,
      });
      await updateDoc(doc(db, "userChats", activeChat), {
        [currentUser.uid + ".lastMessage"]: text,
        [currentUser.uid + ".unread"]: true,
      });
    }
    dispatch({ type: "imageLink", image: "" });
  };
  return (
    <form className="sendText" onSubmit={handleSendMessage}>
      <input type="text" placeholder="Send messages" className="sendInput" />

      <div className="attachments">
        <label htmlFor="images">
          {state.uploading ? (
            <progress max="100" value={state.progress} />
          ) : (
            <ImImages />
          )}
        </label>
        <input type="file" id="images" onChange={handleImage} />

        <button type="submit" className="sendBtn">
          <AiOutlineSend />
        </button>
      </div>
    </form>
  );
}
