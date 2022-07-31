import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { registerRoute } from "../../utils/APIRoutes";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (localStorage.getItem("chat-user")) {
      navigate("/");
    }
  }, [navigate]);

  const handleSignUp = async (event) => {
    event.preventDefault();
    if (values.password !== values.confirmPassword) {
      alert("password is not match with confirm passowrd");
    } else {
      const { username, password } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        password,
      });
      if (!data.status) {
        alert(data.msg);
      } else {
        localStorage.setItem("chat-user", JSON.stringify(data.newUser));
        navigate("/");
      }
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
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            required
            className="confirm-password-input"
            type="password"
            placeholder="confirmPassword"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          ></Form.Control>
          <br></br>
        </Form.Group>
        <Form.Group>
          <Button
            className="submit-button"
            value="submit"
            type="submit"
            onClick={(event) => handleSignUp(event)}
          >
            submit
          </Button>
        </Form.Group>
        <span>
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </Form>
    </div>
  );
}
