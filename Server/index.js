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

  socket.on("createRoom", (roomName) => {
    socket.join(roomName);
    //👇🏻 Adds the new group name to the chat rooms array
    chatRooms.unshift({ id: generateID(), roomName, messages: [] });
    //👇🏻 Returns the updated chat rooms via another event
    socket.emit("roomsList", chatRooms);
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
