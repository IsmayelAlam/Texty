export default function Messages({ name }) {
  return (
    <div className="friend">
      <img
        src={`https://picsum.photos/id/${Math.ceil(Math.random() * 1000)}/200`}
        alt=""
        className="friendImg"
      />
      <div className="friendName">
        <h3>{name}</h3>
        <p className="lastMessage">hello</p>
      </div>

      <p className="new">new</p>
    </div>
  );
}
