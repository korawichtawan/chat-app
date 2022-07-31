import { v4 as uuidv4 } from "uuid";
function Messages(props) {
  const { messages } = props;
  return (
    <div className="chat-messages">
      {messages.map((message) => {
        return (
          <div key={uuidv4()} className={``}>
            <div key={uuidv4()} className={`chat-message ${message.fromSelf ? "sended-message" : "received-message"}`}>
              <p>
                <span className={`${message.fromSelf ? "sended-text" : "received-text"}`}>
                  {message.message}
                </span>
              </p>
            </div>{" "}
          </div>
        );
      })}
    </div>
  );
}

export default Messages;
