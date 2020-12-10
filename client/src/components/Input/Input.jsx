import "fs";
import React, { useState } from "react";
import { uploadFile } from "../../util";

import "./Input.css";

const Input = ({ message, sendMessage, setMessage, type, ...props }) => {
  return (
    <form className="form" encType="multipart/form-data">
      <input
        {...props}
        className="input"
        type={type}
        key={type}
        placeholder="type a message..."
        value={type === "text" ? message : ""}
        onChange={(event) => {
          if (type === "file") {
            uploadFile({ event, setMessage });
          } else {
            setMessage(event.target.value);
          }
        }}
        onKeyPress={(event) => {
          if (event.key === "Enter") {
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
