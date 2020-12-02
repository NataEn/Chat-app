import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import io from "socket.io-client";

let socket;

const Chat = () => {
  const location = useLocation();
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const ENDPOINT = "localhost:5000";

  const sendMessage = () => {
    if (message) {
      console.log(`emitting message ${message} from client id ${socket.id}`);
      socket.emit("sendMessage", message, () => setMessage(""));
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

    return () => {
      socket.emit("break_connection");
      socket.off();
    };
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
        console.log(`got message ${message.user}:${message.text}`)
      setMessages((messages) => [...messages, message]);
    });
  }, [message]);

  return (
    <div className="outerContainer">
      <h1>Chat</h1>
      <div className="innerContainer">
        <input
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
                event.preventDefault();
              console.log("keyPress", event.key);
              sendMessage(message);
            }
          }}
        ></input>
      </div>
    </div>
  );
};
export default Chat;
