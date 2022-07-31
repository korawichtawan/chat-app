const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/userRoute");
const messageRoute = require("./routes/messageRoute");
const socket = require("socket.io");

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoute);
app.use("/api/message", messageRoute);
const databaseSetup = async () => {
  await mongoose
    .connect(`mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.DATABASE_HOST}:27017/admin`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("database is connected");
    })
    .catch((err) => console.log(err.message));
};

databaseSetup();

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    global.onlineUsers.set(userId, socket.id);
  });
  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-receive", data.message);
    }
  });
});
