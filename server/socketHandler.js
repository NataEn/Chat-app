const socketio = require("socket.io");

const appio = (server) => {
  const io = socketio(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
  io.on("connection", (socket) => {
    console.log("A new connection established");
    socket.on("join", ({ name, room }) => {
      console.log(`${name} joined a chat room: ${room}`);
    });
    socket.on("disconnect", () => {
      console.log("user has left");
    });
  });
};

module.exports = appio;
