import React, { useEffect, useState } from "react";
import "../index.css";
import raw from "../data.txt";
import Word from "./Word";

const Game = () => {

  const [chosenWord, setChosenWord] = useState("");
  //TODO

  const wordChoose = async () => {
    const response = await fetch(raw);
    const text = await response.text();
    const wordList = text.split("\n");
    const word = wordList[Math.floor(Math.random() * wordList.length)];
    console.log("Chosen Word : " + word);
    setChosenWord((chosenWord) => word);
  };

  //Equivalent à componentDidMount
  useEffect(() => {
    //TODO
    wordChoose();
  }, []);




  return (
    <div className="game">
      <h1>stressguessr</h1>
      <Word chosenWord={chosenWord} />
    </div>
  );
};

export default Game;
