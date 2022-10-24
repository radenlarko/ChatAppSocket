import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer();
const PORT = 4000;
const socketIO = new Server(httpServer, {
  cors: {
    origin: "<http://localhost:3000>",
  },
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const generateID = () => Math.random().toString(36).substring(2, 10);
let chatRooms = [];

socketIO.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on("createRoom", (name) => {
    console.log("create room: ", name);
    socket.join(name);
    chatRooms.unshift({ id: generateID(), name, messages: [] });
    socket.emit("roomsList", chatRooms);
  });

  socket.on("findRoom", (id) => {
    console.log("find room: ", id);
    let result = chatRooms.filter((room) => room.id == id);
    // console.log(chatRooms);
    socket.emit("foundRoom", result[0].messages);
    // console.log("Messages Form", result[0].messages);
  });

  socket.on("newMessage", (data) => {
    console.log("new message: ", data)
    const { room_id, message, user, timestamp } = data;
    let result = chatRooms.filter((room) => room.id == room_id);
    const newMessage = {
      id: generateID(),
      text: message,
      user,
      time: `${timestamp.hour}:${timestamp.mins}`,
    };
    console.log("New Message", newMessage);
    socket.to(result[0].name).emit("roomMessage", newMessage);
    result[0].messages.push(newMessage);

    socket.emit("roomsList", chatRooms);
    socket.emit("foundRoom", result[0].messages);
  });

  socket.on("disconnect", () => {
    socket.disconnect();
    console.log("🔥: A user disconnected");
  });
});

app.get("/api", (req, res) => {
  res.json(chatRooms);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
