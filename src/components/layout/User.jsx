import { signOut } from "firebase/auth";
import { useContext } from "react";
import { BiSolidContact } from "react-icons/bi";

import { auth } from "../API/firebase";
import { AuthContext } from "../context/AuthContext";

export default function User() {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);

  return (
    <div className="user">
      <img src={currentUser.photoURL} alt="" className="userImg" />
      <h3 className="username">{currentUser.displayName}</h3>
      <BiSolidContact className="contactIcon" />
      <button className="logout" onClick={() => signOut(auth)}>
        Logout
      </button>
    </div>
  );
}
