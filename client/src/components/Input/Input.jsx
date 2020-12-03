import React, { useState, useEffect } from "react";
import "./Input.css";

const Input = ({ message, sendMessage, setMessage }) => (
  <form className="form">
    <input
      className="input"
      type="text"
      placeholder="type a message..."
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
    <button
      className="sendButton"
      onClick={(event) => {
        event.preventDefault();
        console.log("button Press", event.key);
        sendMessage(message);
      }}
    >
      Send
    </button>
  </form>
);

export default Input;
