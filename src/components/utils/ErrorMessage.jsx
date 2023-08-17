import { useNavigate } from "react-router-dom";
import { BiArrowBack, BiError } from "react-icons/bi";

export default function ErrorMessage({ error }) {
  const navigate = useNavigate();
  const message = error.message.includes("email-already-in-use")
    ? "Email is already registered, please try a different one"
    : "something went wrong, please try again";
  return (
    <div className="error">
      <BiError />
      <p>{message}</p>
      <button onClick={() => navigate("/")}>
        <BiArrowBack />
      </button>
    </div>
  );
}
