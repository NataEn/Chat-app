import React, { useState, useEffect } from "react";
import "./Message.css";
const Message = ({ message: { user, text }, name }) => {
  let isSentFromCurrentUser = false;
  const trimmedName = name.trim().toLowerCase();
  if (user === trimmedName) {
    isSentFromCurrentUser = true;
  }
  return isSentFromCurrentUser ? (
    <div className="messageContainer">
      <p className="sentText">{trimmedName}:</p>
      <div className="messageBox">
        <p className="messageText">{text}</p>
      </div>
    </div>
  ) : (
    <div className="messageContainer blue">
      <p className="sentText">{user}:</p>
      <div className="messageBox">
        <p className="messageText">{text}</p>
      </div>
    </div>
  );
};
export default Message;
