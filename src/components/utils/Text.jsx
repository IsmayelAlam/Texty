export default function Text() {
  return (
    <>
      <div className="chatMessage">
        <div>
          <img src="https://picsum.photos/200" alt="" className="chatUserImg" />
        </div>
        <div className="chatPayload">
          <p className="chatTextMessage">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          </p>
          {Math.random() < 0.5 || (
            <img
              src="https://picsum.photos/300/200"
              alt=""
              className="chatTextImg"
            />
          )}
        </div>
      </div>
    </>
  );
}
