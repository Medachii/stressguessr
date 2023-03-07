import React, { useEffect, useState } from "react";
import "../index.css";
import raw from "../data.txt";
import Word from "./Word";
import styled from "styled-components";

const Game = () => {

  const [chosenWord, setChosenWord] = useState("");
  const [gamePoints, setGamePoints] = useState(0);
  const [flag, setFlag] = useState(1);
  const [round, setRound] = useState(1);


  //TODO

  const wordChoose = async () => {
    const response = await fetch(raw);
    const text = await response.text();
    const wordList = text.split("\n");
    const word = wordList[Math.floor(Math.random() * wordList.length)];
    console.log("Chosen Word : " + word);
    setChosenWord((chosenWord) => word);
  };






  function addPoints(points) {
    if (flag == 1) {
      setGamePoints((gamePoints) => gamePoints + points);
      console.log("gamePoints : " + gamePoints);
      console.log("===============================================================================================");
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
    if (round == 10) {
      alert("You got " + gamePoints + " points !");
      newgame();
      setRound((round) => 1);
    }

  }

  //Equivalent à componentDidMount
  useEffect(() => {
    //TODO

    wordChoose();
  }, []);




  return (
    <div className="game">
      <h1>stressguessr</h1>
      <h2>Points : {gamePoints}</h2>
      <h2>Round : {round}/10</h2>
      <Word chosenWord={chosenWord} updatePoints={addPoints} />
      <button onClick={newgame}>New Game</button>
      <button id="#next" onClick={next} style={{ display: "none" }}>Next</button>
    </div>
  );
};

export default Game;

