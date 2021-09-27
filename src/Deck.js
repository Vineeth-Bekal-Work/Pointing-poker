import React, { useEffect, useState } from "react";
import Card from "./Card";
import Table from "./Table";
import io from 'socket.io-client';
const socket = io.connect("http://localhost:3001");
var chooseTime=0;
const cardValues = [
  "0",
  "0.5",
  "1",
  "2",
  "3",
  "5",
  "8",
  "13",
  "20",
  "40",
  "100",
  "?",
].reverse();

const Deck = () => {
  // Cards currently in the hand
  const [hand, setHand] = useState([]);
  const [placed,setPlaced]= useState([]);
  const [prevlist,setPrevlist]=useState([]);
  const [numberofuser,setNumberofuser]=useState(null);
  useEffect(() => {
    addCards();
    chooseTime=0;
  }, []);
  useEffect(()=>{
    socket.on("selected",(data)=>{
        setPrevlist((values)=>[...values,data]);
        console.log(prevlist)
    })
    socket.on("playerdet",(data)=>{
      setNumberofuser(data);
      console.log(numberofuser);
  })
  },[socket])

  const addCards = () => {
    let count = cardValues.length;
    setHand([cardValues[count - 1]]);

    const interval = setInterval(() => {
      --count;
      if (count === 0) return clearInterval(interval);
      setHand((prevValues) => [...prevValues, cardValues[count - 1]]);
    }, 100);
  };

  const removeCard = (value) => {
    setHand((prevValues) => prevValues.filter((e) => e !== value));
    setPlaced(value);
    chooseTime=1;
  };

  const getCardStyle = (index) => {
    const count = hand.length;
    const windowWidth = window.innerWidth;
    const handWidth = windowWidth * 0.6;
    const cardWidth = 200;
    let totalWidth = (count + 1) * (cardWidth / 2);

    let left = (cardWidth * index) / 2;

    if (totalWidth > handWidth) {
      //shift the cards to fit with minimal margin leftover
      const overflow = totalWidth - handWidth;
      const shift = overflow / (count - 1);
      left -= shift * index;
      totalWidth = handWidth;
    }

    const leftdif = (handWidth - totalWidth) / 2;
    left += leftdif;

    const center = left + cardWidth / 2;
    const xpos = (center / handWidth) * 10;
    const ypos = getypos(xpos);
    const rot = getrotation(xpos);

    let bottom = (ypos / k) * 100;

    return {
      left: left,
      bottom: bottom,
      transform: `rotate(${rot}deg)`,
    };
  };

  let a = -0.02;
  let h = 5;
  let k = 0.5;

  let diff = 0.1;
  let multi = 1.6;
  const getrotation = (xpos) => {
    let ypos = getypos(xpos);
    if (xpos < h) {
      //left of the vertex
      let newx = xpos + diff;
      let newy = getypos(newx);

      let adjacent = newx - xpos;
      let opposite = newy - ypos;
      let angle = Math.atan(opposite / adjacent);
      angle *= 180;
      angle /= Math.PI;
      angle = 0 - angle;
      return angle * multi;
    } else if (xpos > h) {
      //right of the vertex
      let newx = xpos - diff;
      let newy = getypos(newx);

      let adjacent = newx - xpos;
      let opposite = newy - ypos;
      let angle = Math.atan(opposite / adjacent);
      angle *= 180;
      angle /= Math.PI;
      angle = 0 - angle;
      return angle * multi;
    } else {
      //on the vertex
      return 0;
    }
  };

  const getypos = (xpos) => {
    let ypos = a * Math.pow(xpos - h, 2) + k;
    return ypos;
  };

  return (
    <div className="deck">
      <div id="hand">
        <p>{numberofuser}</p>
        <p>{placed}</p>
        {chooseTime !== 1 ? (
          hand.map((value, index) => (
            <Card
              key={value}
              cardStyle={getCardStyle(index)}
              value={value}
              onClick={() => removeCard(value)}
            />
          ))
        ) : (
          <Table
          value={placed}
          socket={socket}
          prevlist={prevlist}
          usersnum={numberofuser}
          />
        )}
      </div>
    </div>
  );
};

export default Deck;
