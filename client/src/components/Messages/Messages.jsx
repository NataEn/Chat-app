import React, { useState, useEffect } from "react";
import ScroolToBottom from "react-scroll-to-bottom";
import Message from "../Message/Message";

const Messages = ({ messages, name }) => (
  <ScroolToBottom>
    {messages.map((message, index) => (
      <div key={index}>
        <Message message={message} name={name} />
      </div>
    ))}
  </ScroolToBottom>
);

export default Messages;
