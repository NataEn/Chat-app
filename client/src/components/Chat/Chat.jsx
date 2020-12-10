import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import io from "socket.io-client";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";
import Button from "../Button/Button";
import { uploadFile } from "../../util";
import "./Chat.css";

let socket;

const Chat = () => {
  const location = useLocation();
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [file, setFile] = useState(null);
  const ENDPOINT = "localhost:5000";

  const sendMessage = () => {
    console.log("in send message", message);
    if (message) {
      console.log(`emitting message ${message} from client id ${socket.id}`);
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };
  const sendFile = () => {
    console.log("in send file", file);
    if (file) {
      console.log(`emitting file ${file} from client id ${socket.id}`);
      socket.emit("sendFile", file, () => setFile(""));
    }
  };

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    socket = io(ENDPOINT);
    setName(name);
    setRoom(room);
    socket.emit("join", { name, room }, (err) => {
      if (err) {
        console.error(err);
      }
    });
    console.log(location.search);

    return () => {
      socket.disconnect();
    };
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      console.log(`got message ${message.user}:${message.text}`);
      setMessages((messages) => [...messages, message]);
    });
    socket.on("roomData", ({ room, users }) => {
      console.log(room, users);
      setUsers(() => users.map((user) => user.name));
    });
    socket.on("file", (data) => {
      console.log(data);
      setMessages((messages) => [...messages, data]);

      const imgTag = `<img src="data:image/png;base64, ${data}"/>`; // inject into DOM
    });
  }, []);
  console.log(messages, file);
  return (
    <div className="outerContainer">
      <h1>Chat</h1>
      <InfoBar room={room} />
      <div className="innerContainer">
        <Messages messages={messages} name={name} />
        <div>
          <strong>Users</strong>
          {users
            ? users.map((user, index) => <span key={index}> {user} </span>)
            : null}
        </div>
        <img id="output" src={file}></img>
        {/* <Button type={"text"} setInputType={setInputType} key={"text"} />
        <Button type={"file"} setInputType={setInputType} key={"file"} /> */}
        <Input
          message={message}
          sendMessage={sendMessage}
          setMessage={setMessage}
          type="text"
        />
        <Input
          message={file}
          sendMessage={sendFile}
          setMessage={setFile}
          type="file"
          accept="image/*"
          multiple={true}
        />
      </div>
    </div>
  );
};
export default Chat;
