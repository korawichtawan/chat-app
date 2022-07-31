import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";

function ChatHeader(props) {
  const { currentChat } = props;
  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div className="chat-profile">
      <img
        className="chat-avatar"
        src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
        alt={`avatar${currentChat.username}`}
      ></img>
      <p className="chat-name">
        {currentChat.username}
        <i class="bi bi-box-arrow-right"></i>
      </p>
      <BiPowerOff className="chat-logout" onClick={logoutHandler} />
    </div>
  );
}

export default ChatHeader;
