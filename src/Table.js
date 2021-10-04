import React, {useState, useEffect} from "react";
import Placedcard from "./Placedcard";
import Result from "./Result";
import Backcard from "./backcard";
const Table = (props) =>{
    const socket = props.socket;
    const[valuelist,setValuelist]=useState([]);
    
    useEffect(()=>{
        socket.emit("selected",props.value)
      },[props.value, socket]);

      useEffect(()=>{
        socket.on("preach",(data)=>{
          if(data !=='reset'){
            console.log(data)
            setValuelist(data.map((value)=>value.worth));
            console.log(valuelist)
          }
        })
      },[socket, valuelist])
    return(
        <div className="theTable">
          <div className="cardplaced">
                      {valuelist.map((value,index)=>
                        value !== 'waiting' ? (
                          <Placedcard
                          key={index}
                          value={value}
                          />
                      ) : (
                        <Backcard/>
                      ))}
                      </div>
                      {valuelist.indexOf("waiting")<0 ? (
                          <Result
                          valuelist = {valuelist}
                          goback = {props.goback}/>
                      ):(<p></p>)}

        </div>
    )
}
export default Table;