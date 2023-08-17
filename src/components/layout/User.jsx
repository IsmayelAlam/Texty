import { signOut } from "firebase/auth";
import { useContext } from "react";

import { auth } from "../API/firebase";
import { AuthContext } from "../context/AuthContext";
import avatar from "../assets/avatar.png";

export default function User() {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="user">
      <img src={currentUser.photoURL || avatar} alt="" className="userImg" />
      <h3 className="username">{currentUser.displayName}</h3>
      <button className="logout" onClick={() => signOut(auth)}>
        Logout
      </button>
    </div>
  );
}
