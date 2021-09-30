var users = [];

const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingUser = users.find((user) => user.room === room && user.name === name);

  if(!name || !room) return { error: 'Username and room are required.' };
  if(existingUser) return { error: 'Username is taken.' };

  const user = { id, name, room, worth:'waiting'};

  users.push(user);

  return { user };
}

const removeUser = (id) => {
    users= users.filter((e)=> e.id!==id);
    console.log(users)
}
const addWorth = (id,value) =>{
    const index = users.findIndex((user) => user.id === id);
    users[index].worth = value;
    console.log(users);
}
const reset = (room) =>{
    users.forEach((e)=>{
        if(e.room == room){
            e.worth = "waiting"}
        });
}
const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom, addWorth, reset };