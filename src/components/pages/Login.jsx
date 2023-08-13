import { FaFacebookSquare, FaGoogle, FaTwitter } from "react-icons/fa";

import Logo from "../utils/Logo";

export default function Login() {
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
        <form className="authFrom">
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
          Create a new account
          <a href="#"> &rarr;</a>
        </p>
      </div>
    </div>
  );
}
