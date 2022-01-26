import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import { Avatar, IconButton } from "@material-ui/core";
import { Chat, DonutLarge, MoreVert, SearchOutlined } from "@material-ui/icons";
import SidebarChat from "../SidebarChat/SidebarChat";
import { collection, onSnapshot } from "firebase/firestore";
import { auth, db } from "../../firebase/firebase";
import { signOut } from "firebase/auth";

const Sidebar = ({ user }) => {
  const [rooms, setRooms] = useState([]);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "rooms"), (snapShot) => {
      const roomsData = snapShot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setRooms(roomsData);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar
          src={
            user?.photo ||
            "https://w7.pngwing.com/pngs/574/369/png-transparent-avatar-computer-icons-user-random-icons-purple-blue-heroes.png"
          }
        />
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLarge />
          </IconButton>
          <IconButton>
            <Chat />
          </IconButton>
          <IconButton
            onClick={() => {
              setShowSettings(!showSettings);
            }}
          >
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className={`sidebar__settings ${!!showSettings ? "show" : ""}`}>
        <p onClick={handleLogout}>Logout</p>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input placeholder="Search or start new chat" type="text" />
        </div>
      </div>
      <div className="sidebar__chats">
        <SidebarChat addNewChat />
        {rooms.map((room) => {
          return <SidebarChat key={room.id} room={room} />;
        })}
      </div>
    </div>
  );
};

export default Sidebar;
