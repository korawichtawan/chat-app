import { getAllMsgRoute, sendMsgRoute } from "../../../utils/APIRoutes";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import Messages from "./Messages";
import axios from "axios";
import { useState, useEffect, useRef } from "react";

function ChatContainers(props) {
  const { currentChat, currentUserInfo, socket } = props;
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(undefined);
  const scrollRef = useRef();

  useEffect(() => {
    const getAllMessages = async () => {
      if (currentChat) {
        const response = await axios.post(getAllMsgRoute, {
          from: currentUserInfo._id,
          to: currentChat._id,
        });
        setMessages(response.data);
      }
    };
    getAllMessages();
  }, [currentChat, currentUserInfo._id]);

  const handleSendMessage = async (msg) => {
    await axios.post(sendMsgRoute, {
      from: currentUserInfo._id,
      to: currentChat._id,
      message: msg,
    });
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: currentUserInfo._id,
      message: msg,
    });
    const msgs = [...messages, { fromSelf: true, message: msg }];
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, [socket]);

  useEffect(() => {
    if (arrivalMessage) {
      setMessages((prev) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-containers">
      <ChatHeader currentChat={currentChat} />
      <Messages messages={messages} />
      <ChatInput handleSendMessage={handleSendMessage} />
    </div>
  );
}

export default ChatContainers;
