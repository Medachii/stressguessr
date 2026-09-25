"use client";
import Word from "/app/components/Word.js";
import { useState, useEffect } from "react";
import {Read} from "/app/api/readDataFile.js";
import Navbar from "/app/components/Navbar.js";



export default function Game() {

  const [chosenWord, setChosenWord] = useState("");
  const [gamePoints, setGamePoints] = useState(0);
  const [flag, setFlag] = useState(1);
  const [round, setRound] = useState(1);
  const [stress, setStress] = useState(0);
  const [playing, setPlaying] = useState(0);
  const [showNext, setShowNext] = useState(false);
  const [finalScore, setFinalScore] = useState(null);



  const wordChoose = async () => {
    const text = await Read();

    const wordList = text.split(/\r?\n/).filter((w) => w.trim() !== "");

    const word = wordList[Math.floor(Math.random() * wordList.length)].trim();

    setChosenWord((chosenWord) => word);
  };



  function addPoints(points) {
    if (flag === 1) {
      setPlaying((playing) => playing + 1);
      setGamePoints((gamePoints) => gamePoints + points);
      setShowNext(true);
      setFlag((flag) => 0);
    }
  }

  function newgame() {
    setGamePoints((gamePoints) => 0);
    wordChoose();
    setShowNext(false);
    setFlag((flag) => 1);
    setRound((round) => 1);
  }

  function next() {
    wordChoose();
    setShowNext(false);
    setFlag((flag) => 1);
    setRound((round) => round + 1);
    if (round === 10) {
      setFinalScore(gamePoints);
      newgame();
    }
  }

  function updateStress(stresss) {
    setStress((stress) => stresss);
  }

  function nostress() {
    if (flag === 1) {
      if (stress < 0) {
        addPoints(10);
      }
      else {
        addPoints(0);
      }
      setShowNext(true);
      setFlag((flag) => 0);
    }
  }
  //Equivalent à componentDidMount
  useEffect(() => {
    wordChoose();
  }, []);



  return (
    <main>
      <Navbar/>
      <div className="page game">
        <div className="game-hud">
          <div className="stat">
            <span className="stat-label">Round</span>
            <span className="stat-value">{round}/10</span>
          </div>
          <div className="progress">
            <div className="progress-bar" style={{ width: (round / 10) * 100 + "%" }} />
          </div>
          <div className="stat">
            <span className="stat-label">Points</span>
            <span className="stat-value gradient-text">{gamePoints}</span>
          </div>
        </div>

        <section className="card word-card">
          <Word chosenWord={chosenWord} updatePoints={addPoints} updateStress={updateStress} playing={playing}  />
        </section>

        <div className="game-actions">
          {showNext
            ? <button onClick={next} className="btn btn-primary">Next word →</button>
            : <button onClick={nostress} className="btn btn-primary">No stress</button>}
          <button onClick={newgame} className="btn btn-ghost">New game</button>
        </div>
      </div>

      {finalScore !== null && (
        <div className="modal-backdrop" onClick={() => setFinalScore(null)}>
          <div className="card modal" onClick={(e) => e.stopPropagation()}>
            <p>Game over! You got</p>
            <div className="modal-score gradient-text">{finalScore}</div>
            <p>points out of 100</p>
            <button className="btn btn-primary" onClick={() => setFinalScore(null)}>Play again</button>
          </div>
        </div>
      )}
    </main>
  );
};
