const socketio = require("socket.io");
const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
} = require("../models/users");

const errHandler = ({ err }) => {
  if (err) {
    console.error(`socket error: ${err}`);
  }
};

const appio = (server) => {
  // const io = socketio(server);
  const io = socketio(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
  io.on("connection", (socket) => {
    console.log("A new connection established");
    socket.on("join", ({ name, room }, clientErrHandler) => {
      console.log(`${name} joined a chat room: ${room}`);
      const { error, user } = addUser({ id: socket.id, name, room });
      if (error) {
        return clientErrHandler(error);
      }
      socket.join(user.room);
    });
    socket.on("disconnect", () => {
      console.log("user has left");
    });
    socket.on("error", (err) => errHandler(err));
  });
};

module.exports = appio;
