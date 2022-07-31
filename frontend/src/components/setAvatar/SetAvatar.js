import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer";
import { setAvatarRoute } from "../../utils/APIRoutes";

function SetAvatar() {
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  useEffect(() => {
    if (!localStorage.getItem("chat-user")) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const getAvatar = async () => {
      const avatarAPI = `https://api.multiavatar.com`;
      const avatarImage = [];
      for (let index = 0; index < 2; index++) {
        const image = await axios.get(
          `${avatarAPI}/${Math.round(Math.random() * 1000)}`
        );
        const buffer = new Buffer(image.data);
        avatarImage.push(buffer.toString("base64"));
      }
      setAvatars(avatarImage);
      setIsLoading(false);
    };
    getAvatar();
  }, []);

  const setProfile = async () => {
    if (selectedAvatar === undefined) {
      alert("Please select your avatar");
    } else {
      const user = await JSON.parse(localStorage.getItem("chat-user"));
      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });
      if (data.isSetImage) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem("chat-user", JSON.stringify(user));
        navigate("/");
      } else {
        alert("Error occurs, Please try again");
      }
    }
  };

  return (
    <div className="setAvatar">
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <Container className="avatar-container">
          <p className="avatar-desc">Choose your avatar</p>
          <Row className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <Col
                  key={index}
                  className={`avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    onClick={() => setSelectedAvatar(index)}
                  />
                </Col>
              );
            })}
          </Row>
          <button className="submit-button" onClick={() => setProfile()}>
            Choose
          </button>
        </Container>
      )}
    </div>
  );
}

export default SetAvatar;
