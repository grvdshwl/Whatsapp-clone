import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./SidebarChat.css";

const SidebarChat = ({ addNewChat }) => {
  const [seed, setSeed] = useState("");
  useEffect(() => {
    setSeed(Math.ceil(Math.random() * 1000));
  }, []);

  const createChat = () => {
    const roomName = prompt("Please enter name for chat");

    if (roomName) {
      //do something
    }
  };

  if (addNewChat) {
    return (
      <div className="sidebarChat" onClick={createChat}>
        <h2>Add new chat</h2>
      </div>
    );
  }

  return (
    <div className="sidebarChat">
      <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
      <div className="sidebarChat__info">
        <h2>Room name</h2>
        <p>Last message...</p>
      </div>
    </div>
  );
};

export default SidebarChat;
