import React from 'react';

// import './Message.css';

const Message = ({ message: { text, user }, name }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if(user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return (
    isSentByCurrentUser
      ? (
        <div className="messageContainer justifyEnd" style={{color: "black"}}>
          <p className="sentText pr-10" style={{color: "#046e79", fontSize: "25px", fontWeight: "bold"}}>{trimmedName}</p>
          <div className="messageBox backgroundBlue">
            <p className="messageText colorWhite" style={{color: "#1b1111", fontSize: "20px",  paddingBottom: "5px"}}>{text}</p>
          </div>
        </div>
        )
        : (
          <div className="messageContainer justifyStart" style={{color: "black"}}>
            <p className="sentText pl-10 " style={{color: "#046e79", fontSize: "25px", fontWeight: "bold"}}>{user}</p>
            <div className="messageBox backgroundLight">
              <p className="messageText colorDark" style={{color: "#1b1111", fontSize: "20px", paddingBottom: "5px"}}>{text}</p>
            </div>
            
            {/* <p className="sentText pl-10 ">{user}</p> */}
          </div>
        )
  );
}

export default Message;