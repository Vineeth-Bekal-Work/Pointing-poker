
import React from 'react';


// import './InfoBar.css';

const InfoBar = ({ room }) => (
  <div className="infoBar" style={{backgroundColor: "#c8f1c8", margin: "0", padding: "0", left: "0px"}} >
    <div className="leftInnerContainer">
      <h2>Room name - {room} 
      {/* <a href="/" style={{position: "absolute" , right: "10px", fontSize: "12px", top: "10px"}}>CLOSE</a> */}
      </h2>
      
    </div>
    <div className="rightInnerContainer" style={{position: "absolute" , right: "10px", fontSize: "12px", top: "10px"}}>
      <a href="/">CLOSE</a>
    </div>
  </div>
);

export default InfoBar;