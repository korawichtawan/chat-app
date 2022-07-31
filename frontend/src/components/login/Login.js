import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { loginRoute } from "../../utils/APIRoutes";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    if (localStorage.getItem("chat-user")) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = async (event) => {
    event.preventDefault();
    const { username, password } = values;
    const { data } = await axios.post(loginRoute, {
      username,
      password,
    });
    if (!data.status) {
      alert(data.msg);
    } else {
      localStorage.setItem("chat-user", JSON.stringify(data.existUser));
      navigate("/");
    }
  };
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="form-container">
      <Form className="signup-form">
        <h2>Chat-App</h2>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            required
            className="name-input"
            type="text"
            placeholder="name"
            name="username"
            onChange={(e) => handleChange(e)}
          ></Form.Control>
          <br></br>
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            className="password-input"
            type="password"
            placeholder="password"
            name="password"
            onChange={(e) => handleChange(e)}
          ></Form.Control>
          <br></br>
        </Form.Group>
        <Form.Group>
          <Button
            className="submit-button"
            value="submit"
            type="submit"
            onClick={(event) => handleLogin(event)}
          >
            submit
          </Button>
        </Form.Group>
        <span>
          Need an account? <Link to="/register">Register</Link>
        </span>
      </Form>
    </div>
  );
}
