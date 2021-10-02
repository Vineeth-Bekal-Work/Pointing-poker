import React, { useEffect, useState } from "react";
// import './story.css'


const Story = () => {

  return (
            <div className="story" style={{margin: "0px 30%", padding: "0", width: "40%"}}>
              <h1 style={{backgroundColor: "lightblue", padding: "0", textAlign: "center"}}>Story Description</h1>
              <textarea
              style={{backgroundColor: "none", width: "97%", height: "100px", maxHeight: "150px", maxWidth: "97%", marginTop: "20px", padding: "10px"}}
              placeholder="Brief Your Story"
              ></textarea>
            </div>

  );
};

export default Story;
