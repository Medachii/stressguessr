"use client";

import React, { useEffect, useRef, useState} from "react";
import Letter from "./Letter";
import { fetchEntry, fetchAudioUrl, playAudio } from "/app/api/dictionary.js";
import { SpeakerIcon } from "./ListeMots";
import { findStressIndex } from "/app/lib/stress.js";


const Word = ({ chosenWord, updatePoints, updateStress, playing }) => {

  const [finalStress, setFinalStress] = useState("");
  const [definition, setDefinition] = useState("");
  const [pronunciation, setPronunciation] = useState("");
  const [existingSound, setExistingSound] = useState(false);
  const [displayNoStress, setDisplayNoStress] = useState("transparent");
  const [displaySound, setDisplaySound] = useState("transparent");
  const currentWord = useRef(chosenWord);
  currentWord.current = chosenWord;



  async function getPhoneme(word, callback) {

    setPronunciation((pronunciation) => "");
    setExistingSound((existingSound) => false);
    setDefinition((definition) => "");

    if (!word) {
      return;
    }

    // Answers for a word that is no longer displayed are ignored
    const isCurrent = () => currentWord.current === word;

    try{
    const entry = await fetchEntry(word);
    if (!isCurrent()) {
      return;
    }
    setDefinition((definition) => entry.definition);

    fetchAudioUrl(word).then((url) => {
      if (isCurrent()) {
        setPronunciation((pronunciation) => url);
        setExistingSound((existingSound) => url !== "");
      }
    });

    callback(entry.phonetic);
    }
    catch(error){
      console.log(error);
    }
  }
  function findtheStress(word) {
    getPhoneme(word, (phoneme) => {
      const stress = findStressIndex(word, phoneme);
      setFinalStress((finalStress) => stress);
      updateStress(stress);
    });
  }


  useEffect(() => {
    if (finalStress < 0) {
      setDisplayNoStress((displayNoStress) => "block");
    }
    if (existingSound === true) {
      setDisplaySound((displaySound) => "block");
    }

  }, [playing]);




  useEffect(() => {
    findtheStress(chosenWord);
    setDisplayNoStress((displayNoStress) => "none");
    setDisplaySound((displaySound) => "none");
    //console.log("finalStress : " + finalStress);
  }, [chosenWord]);



  return (
    <div className="word">
      <p className="word-hint">Click on the letter that carries the stress</p>
      <div className="wordcontainer">
        {chosenWord.split("").map((letter, index) => (
          <Letter key={index} index={index} lettre={letter} stress={finalStress} updatePoints={updatePoints} playing={playing} chosenWord={chosenWord} />

        ))}
      </div>
      {definition && <p className="definition">{definition}</p>}

      <p className="nostress" style={{ display: displayNoStress }}>There is no stress in this word.</p>
      <div className="pronunciation" style={{ display: displaySound }}>
        <button type="button" className="phonetic-chip" onClick={() => playAudio(pronunciation)}>
          <SpeakerIcon /> Listen
        </button>
      </div>

    </div>
  );
};

export default Word;
