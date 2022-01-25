import { Avatar, IconButton } from "@material-ui/core";
import {
  AttachFile,
  InsertEmoticon,
  Mic,
  MoreVert,
  SearchOutlined,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import "./Chat.css";
const Chat = () => {
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");

  useEffect(() => {
    setSeed(Math.ceil(Math.random() * 1000));
  }, []);
  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chat__headerInfo">
          <h3>Room name</h3>
          <p>Last seen...</p>
        </div>

        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        <div className="chat__message ">
          <span className="chat__name">Gaurav</span> <span>Hello!</span>
          <span className="chat__timestamp">6:13 pm</span>
        </div>
        <div className="chat__message chat--receiver ">
          <span className="chat__name">Anuj</span> <span>Hi !</span>
          <span className="chat__timestamp">6:50 pm</span>
        </div>
      </div>
      <div className="chat__footer">
        <InsertEmoticon />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log(input);
            setInput("");
          }}
        >
          <input
            type="text"
            placeholder="Type a message"
            onChange={(event) => {
              setInput(event.target.value);
            }}
            value={input}
          />
          <button type="submit">Send a message</button>
        </form>
        <Mic />
      </div>
    </div>
  );
};

export default Chat;
