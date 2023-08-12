import { BiSolidContact } from "react-icons/bi";
export default function User() {
  return (
    <div className="user">
      <img src="https://picsum.photos/200" alt="" className="userImg" />
      <h3 className="username">ismayel alam</h3>
      <BiSolidContact className="contactIcon" />
      <button className="logout">Logout</button>
    </div>
  );
}
