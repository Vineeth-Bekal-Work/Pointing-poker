import React, { useState } from 'react';
import { Link } from "react-router-dom";
// import './Join.css';

export default function SignIn() {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  return (
    <div class="wrap">
		<div class="h">
<header class="header">
	<h1>PLANNING POKER</h1>
</header>
</div>
<div class="f">
<form class="box" action="form.html" method="post">
	<h1>Login</h1>
	<input type="text" name="" placeholder="Username" onChange={(event) => setName(event.target.value)}/>
	<input type="text" name="" placeholder="Room ID" onChange={(event) => setRoom(event.target.value)}/> 
  <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/deck?name=${name}&room=${room}`}>
	<input type="submit" name="" value="Enter"/>
  </Link>
</form>
</div>
</div>
  );
}