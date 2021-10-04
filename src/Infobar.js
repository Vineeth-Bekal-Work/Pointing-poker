
import React from 'react';


// import './InfoBar.css';

const InfoBar = ({ room }) => (
  <div className="infoBar" style={{backgroundColor: "#c8f1c8"}} >
    <div className="leftInnerContainer">
      <h2>Room name - {room} 
      {/* <a href="/" style={{position: "absolute" , right: "10px", fontSize: "12px", top: "10px"}}>CLOSE</a> */}
      </h2>
      
    </div>
    <div className="rightInnerContainer" >
      <a href="/">CLOSE</a>
    </div>
  </div>
);

export default InfoBar;