const server = require("./bin/server");
const socketio = require("socket.io");
const io = socketio(server);
io.on("connection", (socket) => {
  console.log("A new connection established");
  socket.on("disconnect", () => {
    console.log("user has left");
  });
});

module.exports = io;
