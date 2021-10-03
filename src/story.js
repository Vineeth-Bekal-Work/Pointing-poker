import React, { useEffect, useState } from "react";
// import './story.css'


const Story = (props) => {
    const socket = props.socket;
    const [stor,setStor] = useState('');
    const sendStory = (event) =>{
        event.preventDefault();
        console.log('abijij');
        if(stor){
            socket.emit("story",stor)
        }
    }
      useEffect(()=>{
        socket.on("story",(data)=>{
            setStor(data);
        })
      },[socket])


  return (
            <div className="story" style={{margin: "0px 30%", padding: "0", width: "40%"}}>
              <h1 style={{backgroundColor: "lightblue", padding: "0", textAlign: "center"}}>Story Description</h1>
              <form>
              <textarea
              style={{backgroundColor: "none", width: "97%", height: "100px", maxHeight: "150px", maxWidth: "97%", marginTop: "20px", padding: "10px"}}
              placeholder="Brief Your Story"
              value={stor}
              onChange={({ target: { value } }) => setStor(value)}
              onKeyPress={event => event.key === 'Enter' ? sendStory(event) : null}
              ></textarea>
              <button className="send" onClick={e => sendStory(e)}>Send</button>
              </form>
            </div>

  );
};

export default Story;