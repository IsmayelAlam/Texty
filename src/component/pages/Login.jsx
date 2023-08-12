export default function Login() {
  return (
    <div className="authPage">
      <div className="authBox">
        <img src="/logo.svg" alt="" />
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
