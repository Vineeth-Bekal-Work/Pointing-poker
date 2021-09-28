const express = require('express');
const socketio = require('socket.io');
const http = require('http');
var cors = require('cors');
const {addUser, removeUser, getUser, getUsersInRoom} = require('./users.js');
const PORT = process.env.PORT || 5000;

const router = require('./router');

const app = express();
const server =http.createServer(app);
const io = socketio(server,{
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET","POST"],
    }
});

app.use(cors());

app.use(router);

io.on('connection', (socket) => {
    // console.log('We have a connection');
    
    socket.on('join', ({name, room} , callback) =>{
        // console.log(name, room);
        // const error =true;
        // if(error)
        // {
        //     callback({error :'error'});
        // }
        const {error, user} = addUser({id:socket.id, name, room});
        console.log(user);
        if(error)
            return callback(error);
            
        socket.join(user.room);
        socket.emit('message', {user:'admin', text:`${user.name}, welcome to the room ${user.room}`
        });  
        socket.broadcast.to(user.room).emit('message', {user:'admin', text: `${user.name}, has joined`});
        io.to(user.room).emit('roomData', {room : user.room , users : getUsersInRoom(user.room)});

        callback();

        
    });

    socket.on('sendMessage', (message, callback)=> {
        const user =getUser(socket.id);
        
        io.to(user.room).emit('message', {user: user.name, text: message});

        callback();
    });
    socket.on('disconnected' , () => {
        const user = removeUser(socket.id);

        if(user)
        {
            io.to(user.room).emit('message',{ user:'admin', text:`${user.name} has left the room`} )
        }
    });
});



server.listen(PORT, () => console.log(`Server has started on ${PORT}`));