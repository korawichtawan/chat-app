import { useState } from "react";
import { BiSend } from "react-icons/bi";

function ChatInput(props) {
  const { handleSendMessage } = props;
  const [msg,setMsg] = useState("")
  const sendChat = (event) => {
    event.preventDefault();
    if(msg.length > 0){
        handleSendMessage(msg)
        setMsg('')
        event.target.reset()
    }
  }
  return (
    <form className="chat-input" onSubmit={(e)=>sendChat(e)}>
      <input type="text" placeholder="  type your message" className="text-input" onChange={(e) => setMsg(e.target.value)}></input>
      <button className="send-button">
        <BiSend className="send-icon"/>
      </button>
    </form>
  );
}

export default ChatInput;
