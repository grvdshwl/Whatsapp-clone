import { Avatar } from "@material-ui/core";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase/firebase";
import "./SidebarChat.css";

const SidebarChat = ({ addNewChat, room }) => {
  const navigate = useNavigate();
  const [lastMessage, setLastMessage] = useState("");
  useEffect(() => {
    let unsubscribeMessage;
    if (room?.id) {
      unsubscribeMessage = onSnapshot(
        collection(db, "rooms", `${room.id}`, "messages"),
        (snapShot) => {
          const messageData = snapShot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });

          const lastMes = messageData.sort(function (a, b) {
            return a.timestamp - b.timestamp;
          });

          if (!!lastMes.length) {
            setLastMessage(lastMes[lastMes.length - 1].content);
          }
        }
      );
    }

    return () => {
      if (unsubscribeMessage) {
        unsubscribeMessage();
      }
    };
  }, [room]);
  const createChat = async () => {
    const roomName = prompt("Please enter name for chat");

    if (roomName) {
      await addDoc(collection(db, "rooms"), {
        name: roomName,
      });
    }
  };

  if (addNewChat) {
    return (
      <div className="sidebarChat" onClick={createChat}>
        <h2>Add new chat</h2>
      </div>
    );
  }

  const handleChange = () => {
    if (!addNewChat) {
      navigate(`/room/${room.id}`);
    }
  };

  return (
    <div className="sidebarChat" onClick={handleChange}>
      <Avatar src={`https://i.pravatar.cc/150?u=${room.id}.com`} />
      <div className="sidebarChat__info">
        <h2>{room.name}</h2>
        <p>{lastMessage}</p>
      </div>
    </div>
  );
};

export default SidebarChat;
