import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import ChatPage from "./components/ChatPage";
import socketIO from "socket.io-client";
import Tic from './tictactoe/data'
import './App.css'
import Main from "./tictactoe/Main";
const socket = socketIO.connect("https://tictok.onrender.com");

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/game" element={<Tic socket={socket} />}></Route>
          <Route path="/chat" element={<ChatPage socket={socket} />}></Route>
          <Route path="/" element={<Tic socket={socket} />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
