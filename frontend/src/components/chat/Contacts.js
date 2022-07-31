import { useEffect, useState } from "react";
import defaultAvatar from "../../utils/defaultAvatar";

export default function Contacts(props) {
  const { contacts, currentUserInfo, handleChatChange } = props;
  const [currentUsername, setCurrentUsername] = useState(undefined);
  const [currentAvatar, setCurrentAvatar] = useState(undefined);
  const [currentSelectedUser, setCurrentSelectedUser] = useState(undefined);

  useEffect(() => {
    if (currentUserInfo) {
      setCurrentUsername(currentUserInfo.username);
      setCurrentAvatar(currentUserInfo.avatarImage);
    }
  }, [currentUserInfo]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelectedUser(index)
    handleChatChange(contact)
  };
  return (
    <div className="contacts">
      {currentAvatar && currentUsername && (
        <div className="contact-container">
          <div className="contact-title">Friends</div>
          <div className="contact-lists">
            {contacts.map((contact, index) => {
              return (
                <div key={index} className={`contact-list ${index === currentSelectedUser ? "selected-chat" : ""}`} onClick={() => changeCurrentChat(index,contact)}>
                  <img
                    className="contact-avatar"
                    src={
                      !!contact.avatarImage
                        ? `data:image/svg+xml;base64,${contact.avatarImage}`
                        : `data:image/svg+xml;base64,${defaultAvatar}`
                    }
                    alt={`avatar${contact.username}`}
                  ></img>
                  <p>{contact.username}</p>
                </div>
              );
            })}
          </div>
          <div className="contact-user">
            <img
              className="user-avatar"
              src={`data:image/svg+xml;base64,${currentAvatar}`}
              alt={`avatar${currentUsername}`}
            ></img>
            <p><strong>{currentUsername}</strong></p>
          </div>
        </div>
      )}
    </div>
  );
}
