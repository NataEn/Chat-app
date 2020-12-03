import React, { useState, useEffect } from "react";
const Message = ({ message, name }) => {
  let isSentFromCurrentUser = false;
  const trimmedName = name.trim().toLowerCase();
  if (message.user === trimmedName) {
    isSentFromCurrentUser = true;
  }
  return isSentFromCurrentUser ? (
    <div>same user {name}</div>
  ) : (
    <div>
      not same user name={name} user={message.user}
    </div>
  );
};
export default Message;
