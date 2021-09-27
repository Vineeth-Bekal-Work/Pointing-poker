import React, {useState, useEffect} from "react";
import Placedcard from "./Placedcard";
const Table = (props) =>{
    const socket = props.socket;
    const[valuelist,setValuelist]=useState(props.prevlist);
    useEffect(()=>{
        socket.emit("selected",props.value)
      },[]);
      useEffect(()=>{
        socket.on("selected",(data)=>{
            console.log(data)
            setValuelist((values)=>[...values,data]);
        })
      },[socket])
    return(
        <div className="theTable">
                      {valuelist.map((value,index)=>
                        (
                            <Placedcard
                            key={index}
                            value={value}
                            />
                        ))
                        }

        </div>
    )
}
export default Table;