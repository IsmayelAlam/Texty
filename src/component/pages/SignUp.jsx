import { FaFacebookSquare, FaGoogle, FaTwitter } from "react-icons/fa";

export default function SignUp() {
  return (
    <div className="authPage">
      <div className="authBox">
        <img src="/logo.svg" alt="" />
        <div className="authLink">
          <p>Sign up with</p>
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
          <input type="text" id="username" placeholder="username" required />
          <input type="email" id="email" placeholder="email" required />
          <input
            type="password"
            id="password"
            placeholder="password"
            required
          />
          <input
            type="password"
            id="password"
            placeholder="confirm password"
            required
          />

          <button type="submit">sign up</button>
        </form>
        <p className="textLink">
          already have an account? <a href="#">login</a>
        </p>
      </div>
    </div>
  );
}
