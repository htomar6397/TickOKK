import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = ({ socket,setMode }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  const handleSubmit = (e) => {
   if(userName.length>5){
    localStorage.setItem("userName", userName);
    socket.emit("newUser", { userName, socketID: socket.id });
    e === 1 ? navigate("/chat") : navigate("/game");}
    else alert("Enter valid Name minimum 6 char");
  };
  return (
    <div className="home__container" >
      <h2 className="home__header">Enter your Name</h2>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        minLength={6}
        name="username"
        id="username"
        className="username__input"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <button onClick={() => {handleSubmit(1); }} className="home__cta">
        CHAT
      </button>
      <button onClick={() => {
        handleSubmit(0);
        setMode("M");
      }} className="home__cta">
        GAME
      </button>
    </div>
  );
};

export default Home;
