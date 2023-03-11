import React, { useEffect, useState } from "react";
import "../index.css";
import raw from "../data.txt";
import Word from "./Word";

const Game = () => {

  const [chosenWord, setChosenWord] = useState("");
  const [gamePoints, setGamePoints] = useState(0);
  const [flag, setFlag] = useState(1);
  const [round, setRound] = useState(1);
  const [stress, setStress] = useState(0);
  const [playing, setPlaying] = useState(0);


  //TODO

  const wordChoose = async () => {
    const response = await fetch(raw);
    const text = await response.text();
    const wordList = text.split("\n");
    const word = wordList[Math.floor(Math.random() * wordList.length)];
    //console.log("Chosen Word : " + word);
    setChosenWord((chosenWord) => word);
  };






  function addPoints(points) {
    if (flag === 1) {
      setPlaying((playing) => playing + 1);
      setGamePoints((gamePoints) => gamePoints + points);
      //console.log("gamePoints : " + gamePoints);
      //console.log("===============================================================================================");
      document.getElementById("#next").style.display = "block";




      setFlag((flag) => 0);
    }


  }

  function newgame() {
    setGamePoints((gamePoints) => 0);
    wordChoose();
    document.getElementById("#next").style.display = "none";
    setFlag((flag) => 1);
    setRound((round) => 1);
  }

  function next() {
    wordChoose();
    document.getElementById("#next").style.display = "none";
    setFlag((flag) => 1);
    setRound((round) => round + 1);
    if (round === 10) {
      alert("You got " + gamePoints + " points !");
      newgame();

    }

  }

  function updateStress(stresss) {
    setStress((stress) => stresss);

  }

  function nostress() {
    if (flag === 1) {
      //console.log("No stress !" + stress);
      if (stress < 0) {
        addPoints(10);
      }
      else {
        addPoints(0);
      }
      document.getElementById("#next").style.display = "block";
      setFlag((flag) => 0);
    }
  }
  //Equivalent à componentDidMount
  useEffect(() => {
    //TODO

    wordChoose();
  }, []);




  return (
    <div className="game">
      <h1 className="gameTitle">stressguessr</h1>


      <Word chosenWord={chosenWord} updatePoints={addPoints} updateStress={updateStress} playing={playing}  />
      <button onClick={nostress} className="nostressbutton">No Stress</button>
      <button onClick={newgame} className="newgamebutton">New Game</button>
      <a className="points">Points : {gamePoints}</a>
      <button className="nextbutton" id="#next" onClick={next} style={{ display: "none" }}>Next</button>
      <a className="round">Round : {round}/10</a>

    </div>
  );
};
//use addPoint to another file


export default Game;
