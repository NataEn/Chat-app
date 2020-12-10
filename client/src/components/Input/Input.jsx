import "fs";
import React from "react";
import { uploadFile } from "../../util";
import "./Input.css";

const Input = ({ message, sendMessage, setMessage, type, props }) => {
  return (
    <form className="form" encType="multipart/form-data">
      <input
        {...props}
        className="input"
        type={type}
        key={type}
        placeholder="type a message..."
        value={message}
        onChange={(event) => {
          console.log(event.target.value);
          if (type === "file") {
            setMessage(uploadFile(event));
          } else {
            setMessage(event.target.value);
          }
        }}
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            console.log(type, event.key);
            event.preventDefault();
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
};

export default Input;
