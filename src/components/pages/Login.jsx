import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FaFacebookSquare, FaGoogle, FaTwitter } from "react-icons/fa";

import { auth } from "../API/firebase";
import Logo from "../utils/Logo";
import Spinner from "../utils/Spinner";
import ErrorMessage from "../utils/ErrorMessage";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setIsLoading(true);

    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      setIsError(error);
    }
    e.target.reset();
    setIsLoading(false);
  }

  let content = (
    <>
      <div className="authLink">
        <p>Login with</p>
        <div className="links">
          <FaGoogle />
          <FaFacebookSquare />
          <FaTwitter />
        </div>
      </div>
      <div className="divider">
        <hr />
        <p>or</p>
        <hr />
      </div>
      <form className="authFrom" onSubmit={handleLogin}>
        <input type="email" id="email" placeholder="Email" required />

        <input
          type="password"
          id="password"
          placeholder="Password"
          required
          minLength={6}
        />

        <button type="submit">login</button>
      </form>
      <p className="textLink">
        Forget password? <a href="#">Recover</a>
      </p>
      <p className="textLink">
        <Link to="/signup">Create a new account &rarr;</Link>
      </p>
    </>
  );

  if (isLoading) content = <Spinner />;
  if (isError) content = <ErrorMessage error={isError} />;

  return (
    <div className="authPage">
      <div className="authBox">
        <Logo />
        {content}
      </div>
    </div>
  );
}
