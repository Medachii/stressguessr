"use client";
import "/public/index.css";
import Word from "/app/components/Word.js";
import { useState, useEffect } from "react";
import path from 'path';
import {Read} from "/app/api/readDataFile.js";
import Navbar from "/app/components/NavBar.js";



export default function Game() {

  const [chosenWord, setChosenWord] = useState("");
  const [gamePoints, setGamePoints] = useState(0);
  const [flag, setFlag] = useState(1);
  const [round, setRound] = useState(1);
  const [stress, setStress] = useState(0);
  const [playing, setPlaying] = useState(0);
  const [displayNoStress, setDisplayNoStress] = useState("block");

  const [fileContent, setFileContent] = useState("");





  //TODO

  const wordChoose = async () => {

  
    const text = await Read();

    const wordList = text.split("\n");

    const word = wordList[Math.floor(Math.random() * wordList.length)];

    setChosenWord((chosenWord) => word);
  };


  



  function addPoints(points) {
    if (flag === 1) {
      setPlaying((playing) => playing + 1);
      setGamePoints((gamePoints) => gamePoints + points);
      //console.log("gamePoints : " + gamePoints);
      //console.log("===============================================================================================");
      document.getElementById("#next").style.display = "block";
      setDisplayNoStress((displayNoStress) => "none");



      setFlag((flag) => 0);
    }


  }

  function newgame() {
    setGamePoints((gamePoints) => 0);
    wordChoose();
    document.getElementById("#next").style.display = "none";
    setFlag((flag) => 1);
    setRound((round) => 1);
    setDisplayNoStress((displayNoStress) => "block");
  }

  function next() {
    wordChoose();
    document.getElementById("#next").style.display = "none";
    setFlag((flag) => 1);
    setRound((round) => round + 1);
    setDisplayNoStress((displayNoStress) => "block");
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
  
    wordChoose();
  }, []);




  return (
    <main className="window">
      <Navbar/>
      <div className="game">
        <h1 className="gameTitle">stressguessr</h1>
        <Word chosenWord={chosenWord} updatePoints={addPoints} updateStress={updateStress} playing={playing}  />
        <button onClick={nostress} style={{display : displayNoStress}} className="nostressbutton">No Stress</button>
        <button onClick={newgame} className="newgamebutton">New Game</button>
        <a className="points">Points : {gamePoints}</a>
        <button className="nextbutton" id="#next" onClick={next} style={{ display: "none" }}>Next</button>
        <a className="round">Round : {round}/10</a>

      </div>
    </main>
  );
};
//use addPoint to another file

