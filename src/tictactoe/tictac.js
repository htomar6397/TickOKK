import { useState,useEffect } from "react";

const Tictac = (props) => {
  const [name, setName] = useState("");

  //  console.log(props.onClick);
  useEffect(() => {
    if (props.children[3] === true) {
      setTimeout(() => {
        setName("");
      }, 1000);
    }
  }, [props.children[3]]);
useEffect(() => {
  if (name !== "") {
    //  console.log("props.setChal");
    props.socket.emit("name", {
      name: props.children[0].name,
      symbol: name,
      socketID: props.socket.id,
      win: props.children[3],
      qw: props.children[2],
    });
  }
}, [name, props.children[3]]);
useEffect(()=>{ 
    // console.log("insecond");
  props.socket.on("nameupdate", (data) => { 
   
    if (props.children[3]===false&&data.win===true){      props.setWin(true);
      props.setQW(data.qw);
}  
      if (data.name === props.children[0].name) {
        //  console.log(props.children[0].name, "ytr5e4");
        setName(data.symbol);

        if (data.socketID === props.socket.id) {
          props.setChal(1);
          //  console.log(props.setChal);
        } else {
          props.setChal(0);
          //  console.log("setChal");
        }
      }  
  

  });},[props.socket])
  return (
    <div>
      <div
        onClick={() => { 
          // console.log("in");
         if(props.mode==="L"||props.chal===1){
          //  console.log("innn");
          if (name === "" && props.children[3] !== true) {
          //  console.log("inme");
            props.onClick();
            props.children[1] === true ? setName("X") : setName("O");
          } }
        }}
        style={{
          border:"5px solid",
          borderRadius:"20%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "5vh",
          height: "10vh",
          width: "10vh",
          backgroundColor:
            props.children[2][0] === props.children[0].name ||
            props.children[2][1] === props.children[0].name ||
            props.children[2][2] === props.children[0].name
              ? "white"
              : "",
        }}
      >
        {name}
      </div>
    </div>
  );
};

export default Tictac;
