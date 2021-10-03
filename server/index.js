const express = require('express');
const cors = require('cors');
const { Server } = require('socket.io');
const app = express();
var roomUser=[];
app.use(cors());
const {addUser, removeUser, getUser, getUsersInRoom, addWorth, reset} = require('./users.js');
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
    socket.on('join', ({ name, room },callback) =>{
    const {error,user} = addUser({ id: socket.id, name, room });
    if(error) return callback(error);
    console.log(socket.id);
    console.log(user);
    socket.join(room);
    });
    socket.on('disconnect',()=>
    {
        removeUser(socket.id);
        console.log("user disconnected",socket.id);
        console.log(roomUser);
        io.sockets.emit("playerdet",roomUser.length);
    });
    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);

        io.to(user.room).emit('message', { user: user.name, text: message });

        callback();
    });
    socket.on("selected",function(data){
        addWorth(socket.id,data);
        console.log("the thing is "+data);
        const user = getUser(socket.id);
        roomUser = getUsersInRoom(user.room);
        console.log(roomUser);
        io.in(user.room).emit("selected",data);
        io.in(user.room).emit("preach",roomUser);
    })
    socket.on("story",function(data){
        const user = getUser(socket.id);
        if(user){
        io.in(user.room).emit("story",data);
        console.log(data);
        }
    })
    socket.on("preach",function(data){
        if(data =='reset'){
            const user = getUser(socket.id);
            reset(user.room)
            roomUser = getUsersInRoom(user.room);
            console.log(roomUser);
            io.in(user.room).emit("preach",'reset');
            io.in(user.room).emit("preach",roomUser);
        }
    })
});
