const socketio = require("socket.io");
const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
} = require("../models/users");

const errHandler = ({ err, socket }) => {
  if (err) {
    console.error(`socket error: ${err}`);
    socket.emit("error", { err });
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
      socket.emit("message", {
        user: "admin",
        text: `${user.name}. Welcome to the room ${user.room}`,
      });

      socket.broadcast
        .to(user.room)
        .emit("message", { user: "admin", text: `${user.name}, has joined!` });

      socket.join(user.room);

      clientErrHandler();
    });

    socket.on("sendMessage", (message, callback) => {
      const user = getUser(socket.id);
      io.to(user.room).emit("message", { user: user.name, text: message });

      callback();
    });

    socket.on("break_connection", () => {
      console.log("user has left");
    });
    socket.on("error", (err) => errHandler(err, socket));
  });
};

module.exports = appio;
