import { signOut } from "firebase/auth";
import { BiSolidContact } from "react-icons/bi";
import { auth } from "../API/firebase";
export default function User() {
  return (
    <div className="user">
      <img src="https://picsum.photos/200" alt="" className="userImg" />
      <h3 className="username">ismayel alam</h3>
      <BiSolidContact className="contactIcon" />
      <button className="logout" onClick={() => signOut(auth)}>
        Logout
      </button>
    </div>
  );
}
