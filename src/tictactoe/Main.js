import React, { useState } from 'react'
import Home from '../components/Home';
const Main = (props) => {
   const[t,setT]=useState(0); 
  return (
    <div>

   
        <div>
          <div
            style={{
              position: "absolute",
              top: 0,
              height: "100vh",
              width: "100vw",
              display:"flex",
            //   display: mode === "" ? "flex" : "none",
              alignItems: "center",
              justifyContent: "center",
            }}
            className="mode"
          >
            <button className="leaveChat__btn" 
            onClick={() => props.setMode("L")}
            >
              Local Player
            </button>
            <button
              className="leaveChat__btn"
              onClick={() => { setT(1);
               
                props.setTurn(true);
              }}
            >
              Multi Player X
            </button>
            <button
              className="leaveChat__btn"
              onClick={() => { setT(1);
                
                props.setTurn(false);
              }}
            >
              Multi Player O
            </button>
          </div>

         {t===1? <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "100vh",
              width: "100vw",
              display:"flex",
            //   display: mode === "M" ? "flex" : "none",
              alignItems: "center",
              justifyContent: "center",
              
              backgroundColor: "red",
            }}
          >
            <Home  setMode={props.setMode}
            socket={props.socket} />
          </div>:null}
        </div>
     
    </div>
  );
}

export default Main