import { Avatar, IconButton } from "@material-ui/core";
import {
  AttachFile,
  InsertEmoticon,
  Mic,
  MoreVert,
  SearchOutlined,
} from "@material-ui/icons";
import React, { useContext, useEffect, useState } from "react";
import "./Chat.css";
import { useParams } from "react-router";
import {
  doc,
  onSnapshot,
  collection,
  addDoc,
  serverTimestamp,
  orderBy,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { StateContext } from "../../context/state.context";

const Chat = () => {
  const [input, setInput] = useState("");
  const [room, setRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const { roomId } = useParams();
  const { user } = useContext(StateContext);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "rooms", `${roomId}`), (doc) => {
      setRoom({
        id: doc.id,
        ...doc.data(),
      });
    });

    const unsubscribeMessage = onSnapshot(
      collection(db, "rooms", `${roomId}`, "messages"),
      (snapShot) => {
        const messageData = snapShot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        setMessages(
          messageData.sort(function (a, b) {
            return a.timestamp - b.timestamp;
          })
        );
      }
    );

    return () => {
      unsubscribe();
      unsubscribeMessage();
    };
  }, [roomId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (input) {
      await addDoc(collection(db, "rooms", `${roomId}`, "messages"), {
        name: user.name,
        userId: user.id,
        content: input,
        timestamp: serverTimestamp(),
      });
    }

    setInput("");
  };

  if (!room) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://i.pravatar.cc/150?u=${roomId}.com`} />
        <div className="chat__headerInfo">
          <h3>{room.name}</h3>
          {!!messages.length && (
            <p>
              Last seen at{" "}
              {new Date(
                messages[messages.length - 1]?.timestamp?.toDate()
              ).toLocaleTimeString()}
            </p>
          )}
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
        {!!messages.length &&
          messages.map((message) => {
            return (
              <div
                className={`chat__message ${
                  message.userId === user.id ? "chat--receiver" : ""
                }`}
                key={message.id}
              >
                <span className="chat__name">{message.name}</span>
                <span>{message.content}</span>
                <span className="chat__timestamp">
                  {message?.timestamp?.toDate()?.toLocaleTimeString()}
                </span>
              </div>
            );
          })}
      </div>
      <div className="chat__footer">
        <InsertEmoticon />
        <form onSubmit={handleSubmit}>
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
