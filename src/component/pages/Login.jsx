import { FaFacebookSquare, FaGoogle, FaTwitter } from "react-icons/fa";

export default function Login() {
  return (
    <div className="authPage">
      <div className="authBox">
        <img src="/logo.svg" alt="" />
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
          <input type="text" id="username" placeholder="username" required />

          <input
            type="password"
            id="password"
            placeholder="password"
            required
          />

          <button type="submit">login</button>
        </form>
        <p className="textLink">
          forget password? <a href="#">recover</a>
        </p>
        <p className="textLink">create a new account &rarr;</p>
      </div>
    </div>
  );
}
