import { FaFacebookSquare, FaGoogle, FaTwitter } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "../API/firebase";
import Logo from "../utils/Logo";

export default function Login() {
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
    e.target.reset();
  }

  return (
    <div className="authPage">
      <div className="authBox">
        <Logo />

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
        <Link to="/signup">
          <p className="textLink">Create a new account &rarr;</p>
        </Link>
      </div>
    </div>
  );
}
