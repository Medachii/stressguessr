import React, { useEffect, useState } from "react";
import "../index.css";
import raw from "../data.txt";
import Word from "./Word";

const Game = () => {
  console.log("On crée un jeu !");

  const [chosenWord, setChosenWord] = useState("blablabla");
  //TODO

  const wordChoose = async () => {
    const response = await fetch(raw);
    const text = await response.text();
    const wordList = text.split("\n");
    const word = wordList[Math.floor(Math.random() * wordList.length)];
    console.log(wordList);
    console.log("Choosen Word : " + word);
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
