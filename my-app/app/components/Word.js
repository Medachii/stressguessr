"use client";

import React, { useEffect, useRef, useState} from "react";
import Letter from "./Letter";
import { fetchEntry, fetchAudioUrl, playAudio } from "/app/api/dictionary.js";
import { SpeakerIcon } from "./ListeMots";


const Word = ({ chosenWord, updatePoints, updateStress, playing }) => {

  const [finalStress, setFinalStress] = useState("");
  const [definition, setDefinition] = useState("");
  const [pronunciation, setPronunciation] = useState("");
  const [existingSound, setExistingSound] = useState(false);
  const [displayNoStress, setDisplayNoStress] = useState("transparent");
  const [displaySound, setDisplaySound] = useState("transparent");
  const currentWord = useRef(chosenWord);
  currentWord.current = chosenWord;



  const phonemedictionnary = {
    '/': ['none'],
    'h': ['h'],
    'ə': ['e', 'u', 'a', 'ure', 'er', 'io', 'o', 're', 'ou','or', 'oo',''],
    'o': ['o'],
    'ʊ': ['u', 'oul', 'o', 'ugh',''],
    '.': [''],
    'ɪ': ['i', 'a', 'e', 'u', 'ye', 'y', ''],
    'l': ['l', 'le', 'll'],
    'i': ['i', 'e', 'ee', 'ea', 'y'],
    't': ['t', 'tt', 'te', ''],
    'ˈ': [''],
    'ˌ': [''],
    'b': ['b', 'bb'],
    'ɑ': ['a', 'o'],
    'a': ['a', 'o', ''],
    'æ': ['a'],
    'e': ['e', 'a'],
    'ɝ': ['ear', 'ur'],
    'ɒ': ['o', 'a'],
    'ʌ': ['u', 'o'],
    'ɔ:': ['o', 'a', 'ou'],
    'u': ['u', 'ou', 'oo', 'ue', 'ough'],
    'aɪ': ['ai', 'i', 'eye'],
    'aʊ': ['ow', 'ou'],
    'eɪ': ['ay', 'ey', 'ei'],
    'oʊ': ['o', 'ou', 'ow'],
    'ɔɪ': ['oi', 'oy', 'oye'],
    'ɛ': ['e', 'ea'],
    'ɜ': ['o', 'e', 'or', 'er'],
    'ɹ': ['r', 're', 'rar'],
    'd': ['d', '', 'g'],
    'f': ['f', 'ph', 'ff'],
    'g': ['g'],
    'j': ['y', 'j','i', ''],
    'k': ['k', 'c', 'ck', 'x', 'ch', 'q', 'xh', 'ke'],
    'm': ['m', 'mm'],
    'n': ['n','nn'],
    'ŋ': ['ng', 'n'],
    'p': ['p', 'pp'],
    'r': ['r', 'rr'],
    's': ['s', 'ss', 'ce', 'se','ps','sc', ''],
    'ʃ': ['sh', 'ch', 'ss', 't', 'tio', ''],
    'tʃ': ['ch', 'tch'],
    'θ': ['th'],
    'ð': ['th'],
    'v': ['v', 've'],
    'w': ['w', 'u'],
    'z': ['z', 'x', 's', 'si', 'se'],
    'ʒ': ['zh', 'j', 's', ''],
    'd͡': ['j', 'g', 'ge', 'dge','gg'],
    'ː': [''],
    'ɡ': ['g', 'gg', ''],
    '(': [''],
    ')': [''],
    'ɔ': ['o', 'a', 'ou'],
    'ɚ': ['ar', 'er'],
    'ɘ': ['e', 'a', 'o'],
    'ɵ': ['ir'],
    't͡': ['t', 'tur','ce',''],
    'l̩': ['l', 'le','ll'],
    'ä' : ['a'],
    'ʰ': [''],
    '[': [''],
    ']': [''],
    'ɨ' : ['i'],
    'n̩' : ['n','en'],
  }
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
  let stress = -2;
  let wordFinished = false;
  

  function findtheStress(word) {
    //console.log("findtheStress");
    //console.log("word : " + word);

    const phoneme = getPhoneme(word, (phoneme) => {
      //console.log("pho " + phoneme);
      let index = 1;
      let finalWord = "";

      function findRecursiveStress(phoneme, index, wordToFind, finalWord) {

        if (wordFinished === true) {
          return;
        }

        //console.log("----------------------------------------------------");
        //console.log("findRecursiveStress");
        //console.log("phoneme[index] : " + phoneme[index]);
        //console.log("finalWord : " + finalWord);
        //console.log("stress : " + stress);
        //console.log("wordFinished : " + wordFinished);
        //console.log("---------------------");
        if (phoneme[index] === "/" || phoneme[index] === "]") {

          if (stress === -2) {
            stress = -1;
          }
          wordFinished = true;
          //console.log("stress non trouvé " + stress);
          return;
        }
        if (phoneme[index] === "ˈ") {
          //console.log("stress trouvé");
          //console.log("index : " + index);
          //console.log("finalWord" + finalWord);
          if (finalWord.length > stress) {
            stress = finalWord.length;
          }
        }

        // Unknown symbols are treated as silent instead of crashing the search
        const graphemes = phonemedictionnary[phoneme[index]] || [''];
        for (let i = 0; i < graphemes.length; i++) {
          if (wordFinished === true) {
            break;
          }
          //console.log("boucle, index : " + index + ", phoneme : " + phoneme[index] + " traduction du phoeneme : " + phonemedictionnary[phoneme[index]][i]);
          let previousfinalWord = finalWord;
          finalWord = finalWord + graphemes[i]
          //console.log("finalWord : " + finalWord);

          //if finalWord is not the same as beginning of wordToFind then don't recall the function
          if (wordToFind.startsWith(finalWord)) {
            //console.log("Ca commence bien ");
            findRecursiveStress(phoneme, index + 1, wordToFind, finalWord);
          }
          finalWord = previousfinalWord;


        }

      }

      if (phoneme.includes("ˈ")) {
        //console.log("wordToFind : " + word);
        findRecursiveStress(phoneme, index, word, finalWord);
      }


      //console.log("-----------------------------------------------------------------------");
      //console.log("final stress : " + (stress));
      setFinalStress((finalStress) => stress);
      updateStress(stress);
      return;
      //callback(); //TODO ?
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
