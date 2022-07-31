import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { allUsersRoute, host } from "../../utils/APIRoutes";
import ChatContainers from "./ChatContainers/ChatContainers";
import Contacts from "./Contacts";
import Welcome from "./Welcome";
import { io } from "socket.io-client";

export default function Chat() {
  const socket = useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUserInfo, setCurrentUserInfo] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("chat-user")) {
      navigate("/login");
    } else {
      setCurrentUserInfo(JSON.parse(localStorage.getItem("chat-user")));
      setIsLoaded(true);
    }
  }, [navigate]);

  useEffect(() => {
    if (currentUserInfo) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUserInfo._id);
    }
  }, [currentUserInfo]);

  useEffect(() => {
    if (!!currentUserInfo) {
      const setAllContacts = async () => {
        const data = await axios.get(`${allUsersRoute}/${currentUserInfo._id}`);
        setContacts(data.data);
      };
      if (currentUserInfo.isAvatarImageSet) {
        setAllContacts();
      } else {
        navigate("/setAvatar");
      }
    }
  }, [currentUserInfo, navigate]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <div className="chat">
      <Contacts
        contacts={contacts}
        currentUserInfo={currentUserInfo}
        handleChatChange={handleChatChange}
      />
      {isLoaded && !!currentChat ? (
        <ChatContainers
          currentChat={currentChat}
          currentUserInfo={currentUserInfo}
          socket={socket}
        />
      ) : (
        <Welcome />
      )}
    </div>
  );
}
