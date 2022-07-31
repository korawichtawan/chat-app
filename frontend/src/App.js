import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import Chat from "./components/chat/Chat";
import SetAvatar from "./components/setAvatar/SetAvatar"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/SetAvatar" element={<SetAvatar />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
