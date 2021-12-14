import React from "react";
import PlayChatMessage from "./PlayChatMessage";
const PlayChat = ({ chatMessages }) => {
  if (chatMessages && chatMessages.length > 0) {
    return (
      <div>
        {chatMessages.map((message, index) => {
          return <PlayChatMessage key={index} content={message} />;
        })}
      </div>
    );
  } else {
    return <div>{""}</div>;
  }
};
export default PlayChat;
