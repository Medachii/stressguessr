"use client";

import React, { useEffect, useState} from "react";
import Letter from "./Letter";
import "/public/index.css";


const Word = ({ chosenWord, updatePoints, updateStress, playing }) => {

  const [finalStress, setFinalStress] = useState("");
  const [definition, setDefinition] = useState("");
  const [pronunciation, setPronunciation] = useState("");
  const [existingSound, setExistingSound] = useState(false);
  const [displayNoStress, setDisplayNoStress] = useState("transparent");
  const [displaySound, setDisplaySound] = useState("transparent");



  const phonemedictionnary = {
    '/': ['none'],
    'h': ['h'],
    'ə': ['e', 'u', 'a', 'ure', 'er', 'io', 'o', 're', 'ou','or', ''],
    'o': ['o'],
    'ʊ': ['u', 'oul', 'o', 'ugh',''],
    '.': [''],
    'ɪ': ['i', 'a', 'e', 'u', 'ye', 'y', ''],
    'l': ['l', 'le', 'll'],
    'i': ['i', 'ee', 'ea', 'y', 'e'],
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
    'm': ['m'],
    'n': ['n'],
    'ŋ': ['ng', 'n'],
    'p': ['p', 'pp'],
    'r': ['r', 'rr'],
    's': ['s', 'ss', 'ce', 'se','ps', ''],
    'ʃ': ['sh', 'ch', 'ss', 't', ''],
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
    't͡': ['t', 'tur'],
    'l̩': ['l', 'le'],
    'ä' : ['a'],
    'ʰ': [''],
    '[': [''],
    ']': [''],
  }
  function extractPhoneme(data) {
    //console.log("===================================================");
    
    let a = 0;
    let phoneme = data[0].phonetics[0].text;
    var phonemeAudio = data[0].phonetics[0].audio;
    
    //tant que le phoneme est null
    let i = 1;
    while (phonemeAudio === "") {

      
      if (data[0].phonetics[i] === undefined) {
        //console.log("Audio non trouvé");
        a += 1;
        break;
      }

      if (data[0].phonetics[i].audio === undefined) {
        phonemeAudio = "";
      }
      else {
        phonemeAudio = data[0].phonetics[i].audio;
      }
      //console.log("phonemeAudio : " + phonemeAudio + " i : " + i);
      //break if data[0].phoenetics[i] is undefined
      if (phonemeAudio !== "" && data[0].phonetics[i].text === undefined) {
        phonemeAudio = "";
      }
      /* else {
        console.log("Break du au trouvage de l'audio");
        break;
      } */
      i++;

    }



    if (a === 0) {
      //console.log(i-1);
      phoneme = data[0].phonetics[i-1].text;
    
      setPronunciation((pronunciation) => data[0].phonetics[i-1].audio);
      setExistingSound((existingSound) => true);
      //console.log("audio trouvé : " + i-1);
    }
    else {
      let k = 0;
      phoneme = data[0].phonetics[0].text;
      //tant que le phoneme est null

      while (phoneme == null) {
        k++;
        phoneme = data[0].phonetics[k].text;

      }

      setExistingSound((existingSound) => false);
      setPronunciation((pronunciation) => "");
      //console.log("audio non trouvé, phoneme : " + k);
    }

    return phoneme;

  }

  function extractDefinition(data) {
    let definition = data[0].meanings[0].definitions[0].definition;
    //console.log("definition : " + definition);
    return definition;
  }




  async function getPhoneme(word, callback) {

    try{

    
    const response = await fetch("https://api.dictionaryapi.dev/api/v2/entries/en/{}".replace('{}', word),{method : 'GET'});
    const data = await response.json();
    let extractedPhonemee = extractPhoneme(data);
    console.log("bonjour : " + extractedPhonemee);
    console.log("bonjour : " + data);

    let extractedPhoneme = extractPhoneme(data);
    let extractedDefinition = extractDefinition(data);
    //let extractedPronunciation = extractPronunciation(data);
    setDefinition((definition) => extractedDefinition);

        //console.log("extracted : " + extractedPhoneme);
    callback(extractedPhoneme);
    }
    catch(error){
      console.log(error);
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

        for (let i = 0; i < phonemedictionnary[phoneme[index]].length; i++) {
          if (wordFinished === true) {
            break;
          }
          //console.log("boucle, index : " + index + ", phoneme : " + phoneme[index] + " traduction du phoeneme : " + phonemedictionnary[phoneme[index]][i]);
          let previousfinalWord = finalWord;
          finalWord = finalWord + phonemedictionnary[phoneme[index]][i]
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

      <div className="wordcontainer">
        {chosenWord.split("").map((letter, index) => (
          <Letter key={index} index={index} lettre={letter} stress={finalStress} updatePoints={updatePoints} playing={playing} chosenWord={chosenWord} />

        ))}
      </div>
      <p className="definition">{definition}</p>
      
      <p className="nostress" style={{ display: displayNoStress }}>There is no stress in this word.</p>
      <p className="pronunciation" style={{ display: displaySound }}><audio controls src={pronunciation} /></p>

    </div>
  );
};

export default Word;
