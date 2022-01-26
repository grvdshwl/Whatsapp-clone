import { useContext } from "react";
import { Route, Routes } from "react-router";
import "./App.css";
import Chat from "./components/Chat/Chat";
import Loading from "./components/Loading/Loading";
import Login from "./components/Login/Login";
import Sidebar from "./components/Sidebar/Sidebar.js";
import { StateContext } from "./context/state.context";

function App() {
  const { user, authLoading } = useContext(StateContext);
  if (!user) {
    return <div className="app">{authLoading ? <Loading /> : <Login />}</div>;
  }

  return (
    <div className="app">
      <div className="app__body">
        <Sidebar user={user} />
        <Routes>
          <Route path="/room/:roomId" element={<Chat />} />
          <Route path="/" element={<></>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
