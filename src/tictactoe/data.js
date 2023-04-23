import Tictac from "./tictac";
import { useState, useEffect} from "react";
// import useSound from "use-sound";
import beep2 from "./start-13691.mp3";
import beep4 from "./winn.mp3";
import SideBar from "./Side";
import Home from "../components/Home";
import Main from "./Main";
const Data = ({socket}) => {
  const [arrX, setArrX] = useState([]);
  const [arrO, setArrO] = useState([45,78,89]);
  const [qw, setQW] = useState([]);
  const [turn, setTurn] = useState(true);
  const [win, setWin] = useState(false);
   const [mode, setMode] = useState("");
     const [chal, setChal] = useState(1);
  // const [play2] = useSound(beep2);
  // const [play4] = useSound(beep4);

    const [user, setUser] = useState("");

    useEffect(() => {
      socket.on("newUserResponse", (data) => {
       for(let i=0;i<data.length;i++){  console.log("mmn", socket.id, data[i].socketID); if(socket.id===data[i].socketID) setUser(data[i].userName)} 
       
        
      
    }) 
  }, [socket, user]);
  console.log(user,"user");
  let obbb = [
    { color: "red", name: 0 },
    { color: "yellow", name: 1 },
    { color: "blue", name: 2 },
    { color: "orange", name: 3 },
    { color: "pink", name: 4 },
    { color: "green", name: 5 },
    { color: "grey", name: 6 },
    { color: "purple", name: 7 },
    { color: "aqua", name: 8 },
  ];
  let obbbb = [
    [2, 4, 6],
    [0, 4, 8],
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
  ];

  const handleclick = (x) => {
    // play2();
    // console.log(turn);
  if( mode==="L") setTurn(!turn);
    if (turn) setArrX([...arrX, x.name]);
    else setArrO([...arrO, x.name]);
  };

  useEffect(() => { 
     if(mode==="L"){if (turn) Win(arrO);
     else Win(arrX);}
     else {if (turn) Win(arrX);
     else Win(arrO);}
    
  }, [turn,chal]);
  useEffect(() => {
    if (win === true&&mode==="L") {
      //  play4();
      setTimeout(() => {
        setArrX([]);
        setArrO([]);
        setQW([]);
        setTurn(true);
        setWin(false);
      }, 1000);
    }
    if(win===true&&mode==="M"){
      setTimeout(() => {
        setArrX([]);
        setArrO([]);
        setQW([]);
        
        setWin(false);
      }, 1000);
    }
  }, [qw]);
  
  const Win = (arr) => {
    const checkWin = (y) => {
      let c = 0;

      for (let x in arr) {
        // console.log(arr[x], y[x]);
        if (arr[x] === y[0] || arr[x] === y[1] || arr[x] === y[2]) {
          c++;
        }
        if (c === 3) {
          setWin(true);

          setQW([y[0], y[1], y[2]]);
        }
      }
    };

    {
      obbbb.map((y) => checkWin(y));
    }
  };

  return (
    <>
      <div className="Aop"></div>
      <div style={{display:mode===""?"block":"none"}} >
        <Main
          setTurn={(x) => setTurn(x)}
          setMode={(x) => setMode(x)}
          socket={socket}
        />
      </div>
      <div style={{ display: mode !== "" ? "flex" : "none" }} className="tic">
        <SideBar socket={socket} />
        <div
          style={{
            fontSize: "25px",
            position: "absolute",
            top: "10vh",
            left: "45vw",
          }}
        > Hey!! {user} <br/>
          {chal === 1 ? " Your Turn" : "Oponent Turn"}
        </div>
        <div
          style={{
            marginInline: "30vh",
            display: "grid",
            gridTemplateColumns: "auto auto auto",
            rowGap: "5px",
            columnGap: "5px",
          }}
        >
          {obbb.map((x) => (
            <Tictac
              mode={mode}
              chal={chal}
              setQW={(x) => {
              
                setQW(x);
              }}
              setWin={(x) => {
               
                setWin(x);
              }}
              setChal={(x) => {
                setChal(x);
              }}
              socket={socket}
              onClick={() => {
                handleclick(x);
              }}
            >
              {x}
              {turn}
              {qw}
              {win}
              {arrO}
              {arrX}
            </Tictac>
          ))}
        </div>
      </div>
    </>
  );
};

export default Data;
