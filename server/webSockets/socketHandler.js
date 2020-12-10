const socketio = require("socket.io");
const fs = require("fs");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

const errHandler = ({ err, socket }) => {
  if (err) {
    console.error(`socket error: ${err}`);
    socket.emit("error", { err });
  }
};

const appio = (server) => {
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

      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });

      clientErrHandler();
    });

    socket.on("sendMessage", (message, callback) => {
      const user = getUser(socket.id);
      console.log(`${user.name} sent`, message);
      io.to(user.room).emit("message", {
        user: user.name,
        text: message + "from server",
      });
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });

      callback();
    });
    socket.on("sendFile", (file, callback) => {
      const user = getUser(socket.id);
      console.log(`${user.name} sent`, file);
      // const imgFile = fs.readFileSync(file);
      // const imgBase64 = imgFile.toString("base64");
      io.to(user.room).emit("file", {
        user: user.name,
        base64Img: file,
      });
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
      callback();
    });
    // socket.broadcast.emit("img", imgBase64); //--?

    socket.on("disconnect", (reason) => {
      console.log(`user has left: ${reason}`);
      const user = removeUser(socket.id);
      if (user) {
        io.to(user.room).emit("message", {
          user: "admin",
          text: `${user.name} has left the room`,
        });
      }
    });
    socket.on("error", (err) => {
      errHandler(err, socket);
    });
  });
};

module.exports = appio;
