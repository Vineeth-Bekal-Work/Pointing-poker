const express = require('express');
const cors = require('cors');
const { Server } = require('socket.io');
const app = express();
app.use(cors());
var users=[];
const server = app.listen(3001,()=>
{
    console.log("server odindu");
})
const io = new Server(server,{
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET","POST"],
    },
});
io.on("connection",function(socket){
    users.push(socket.id);
    console.log(socket.id);
    console.log(users);
    io.sockets.emit("playerdet",users.length);
    socket.on('disconnect',()=>
    {
       users= users.filter((e)=> e!==socket.id);
        console.log("user disconnected",socket.id);
        console.log(users);
        io.sockets.emit("playerdet",users.length);
    });
    socket.on("selected",function(data){
        console.log("the thing is "+data);
        io.sockets.emit("selected",data);
    })
});
